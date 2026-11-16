# Sample Full-Stack Application Source

Repo 1 contains application code and tests only. Repo 2 owns Jenkinsfiles, Dockerfiles, Helm, environment values, and Argo CD resources.

## Components
- Backend: Node.js + Express, port 8080, health endpoint `/health`, API endpoint `/api/message`
- Frontend: React + Vite, build output `dist/`, proxies `/api` to backend during local development

## Local run
```bash
npm run install:all
npm run test:all
npm run dev
```
Open `http://localhost:5173`.

## Production flow
A push to `main` triggers Jenkins. Jenkins checks out this repo and Repo 2, tests and scans the changed component, builds with the Dockerfile from Repo 2, pushes to ECR, and updates the immutable image tag in Repo 2. Argo CD then syncs EKS.

## Management topology
- EC2: Jenkins controller and Docker-based ephemeral Jenkins agents
- EKS management namespace: Argo CD and External Secrets Operator
- EKS application namespaces: backend and frontend workloads

Argo CD and External Secrets Operator are Kubernetes controllers. They should run in EKS, not as native EC2 services. The EC2 host manages CI and can access EKS through IAM and network rules.
