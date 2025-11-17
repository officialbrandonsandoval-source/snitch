# Snitch

## Overview
Snitch is a mobile and backend platform for secure evidence collection, reporting, and user management. The project is built with Expo/React Native for the mobile app and FastAPI for the backend.

## Features
- Mobile app (Expo/React Native)
  - Home and History screens
  - Secure authentication
  - Geo-location and media capture
  - Firebase integration
  - Custom UI components
- Backend (FastAPI)
  - Modular API endpoints (auth, evidence, police, rewards, subscriptions, uploads, users)
  - Models, schemas, services, workers
  - Dockerfile and requirements.txt for deployment
  - End-to-end and unit tests

## Automation & DevOps
- GitHub Actions for CI/CD (testing, builds, deployment)
- Dependabot for automated dependency updates
- Sentry workflow for error monitoring
- Privacy policy and terms of service included

## Testing
- End-to-end tests for mobile (Detox) and backend (pytest)
- Automated workflows run tests on every push/PR

## Deployment
- Expo web build deploys to GitHub Pages
- Backend deployment template included

## App Store Readiness
- All assets and permissions are ready for App Store review
- Privacy policy and terms of service provided

## How to Run
- Mobile: `npx expo start`
- Backend: `cd snitch-backend && uvicorn app.main:app --reload`

## Contributing
Pull requests and issues are welcome!

## License
See `terms-of-service.md` and `privacy-policy.md` for legal details.