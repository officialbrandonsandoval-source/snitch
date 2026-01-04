#!/bin/bash
set -e

AWS_REGION="us-east-1"
ACCOUNT_ID="093711202474"
ECR_REPO="snitch-backend"
ECS_CLUSTER="snitch-cluster"
ECS_SERVICE="snitch-service"
TASK_ROLE_ARN="arn:aws:iam::093711202474:role/snitch-ecs-task-role"
SUBNETS="subnet-034e6e5a29eff9794,subnet-0b9e4960c44538e91,subnet-023bd3aa06b175399,subnet-0c5b821529afe0ba3,subnet-0bb1a5d031bf55494,subnet-0a8d9efae9aafd640"
SECURITY_GROUP="sg-09704b97992823fa5"
ENV_FILE=".env"

IMAGE_URI="$ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO:latest"

echo "=== 1. BUILD AMD64 DOCKER IMAGE ==="
docker buildx build --platform linux/amd64 -t $ECR_REPO:latest .

echo "=== 2. TAG & PUSH TO ECR ==="
docker tag $ECR_REPO:latest $IMAGE_URI

aws ecr get-login-password --region $AWS_REGION | \
  docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

docker push $IMAGE_URI

echo "=== 3. CREATE LOG GROUP (if missing) ==="
aws logs create-log-group \
  --log-group-name "/ecs/snitch-backend" \
  --region $AWS_REGION || true

echo "=== 4. GENERATE TASK DEFINITION WITH LOGGING ==="
cat > task-def.json <<EOF
{
  "family": "snitch-task",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "$TASK_ROLE_ARN",
  "taskRoleArn": "$TASK_ROLE_ARN",
  "containerDefinitions": [
    {
      "name": "backend",
      "image": "$IMAGE_URI",
      "essential": true,
      "portMappings": [
        { "containerPort": 8000, "hostPort": 8000 }
      ],
      "environment": [
        $(awk -F= '{print "{\"name\": \""$1"\", \"value\": \""$2"\"},"}' $ENV_FILE | sed '$ s/,$//')
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/snitch-backend",
          "awslogs-region": "$AWS_REGION",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
EOF

echo "=== 5. REGISTER NEW TASK DEFINITION REVISION ==="
aws ecs register-task-definition \
  --cli-input-json file://task-def.json \
  --region $AWS_REGION

echo "=== 6. FORCE ECS SERVICE TO REDEPLOY ==="
aws ecs update-service \
  --cluster $ECS_CLUSTER \
  --service-name $ECS_SERVICE \
  --task-definition snitch-task \
  --force-new-deployment \
  --region $AWS_REGION

echo "=== DONE. WATCH ECS TASKS START WITH LOGS ENABLED ==="
