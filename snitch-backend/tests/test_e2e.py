# Example end-to-end test for FastAPI backend
import requests

def test_health_endpoint():
    response = requests.get('http://localhost:8000/api/v1/health/')
    assert response.status_code == 200
