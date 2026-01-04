#!/bin/bash
set -e

AWS_REGION="us-east-1"
ECR_REPO="snitch-backend"
ECS_CLUSTER="snitch-cluster"
ECS_SERVICE="snitch-service"
RDS_DB="snitch"
RDS_USER="snitch"
RDS_PASS="snitchpass"
RDS_INSTANCE="db.t3.micro"
REDIS_CLUSTER_ID="snitch-redis"
REDIS_NODE_TYPE="cache.t3.micro"
TASK_ROLE_ARN="arn:aws:iam::093711202474:role/snitch-ecs-task-role"
SUBNETS="subnet-034e6e5a29eff9794,subnet-0b9e4960c44538e91,subnet-023bd3aa06b175399,subnet-0c5b821529afe0ba3,subnet-0bb1a5d031bf55494,subnet-0a8d9efae9aafd640"
SECURITY_GROUP="sg-09704b97992823fa5"
ENV_FILE=".env"

# 1. Create ECR repo
aws ecr create-repository --repository-name $ECR_REPO --region $AWS_REGION || true

# 2. Build and push Docker image
ACCOUNT_ID=$(aws sts get-caller-identity --query 'Account' --output text)
IMAGE_URI="$ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO:latest"
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
docker build -t $ECR_REPO .
docker tag $ECR_REPO:latest $IMAGE_URI
docker push $IMAGE_URI

# 3. Create RDS PostgreSQL
aws rds create-db-instance \
  --db-instance-identifier $RDS_DB \
  --db-instance-class $RDS_INSTANCE \
  --engine postgres \
  --master-username $RDS_USER \
  --master-user-password $RDS_PASS \
  --allocated-storage 20 \
  --backup-retention-period 1 \
  --publicly-accessible \
  --region $AWS_REGION

# 4. Create Elasticache Redis
aws elasticache create-cache-cluster \
  --cache-cluster-id $REDIS_CLUSTER_ID \
  --engine redis \
  --cache-node-type $REDIS_NODE_TYPE \
  --num-cache-nodes 1 \
  --region $AWS_REGION

# 5. Create ECS Cluster
aws ecs create-cluster --cluster-name $ECS_CLUSTER --region $AWS_REGION || true

# 6. Register ECS Task Definition
cat > task-def.json <<EOF
{
  "family": "snitch-task",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "$TASK_ROLE_ARN",
  "containerDefinitions": [
    {
      "name": "backend",
      "image": "$IMAGE_URI",
      "essential": true,
      "portMappings": [{ "containerPort": 8000, "hostPort": 8000 }],
      "environment": [
        $(awk -F= '{print "{\"name\": \""$1"\", \"value\": \""$2"\"},"}' $ENV_FILE | sed '$ s/,$//')
      ]
    }
  ]
}
EOF
aws ecs register-task-definition --cli-input-json file://task-def.json --region $AWS_REGION

# 7. Create ECS Service
aws ecs create-service \
  --cluster $ECS_CLUSTER \
  --service-name $ECS_SERVICE \
  --task-definition snitch-task \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[$SUBNETS],securityGroups=[$SECURITY_GROUP],assignPublicIp=ENABLED}" \
  --region $AWS_REGION

echo "Deployment started! Check AWS Console for status."
