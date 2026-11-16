# EC2 management design

Recommended starting point: one private Ubuntu 24.04 or Amazon Linux 2023 EC2 instance, `t3.large` minimum for a POC and `m7i.large` or larger for concurrent builds. Attach a 100 GiB gp3 EBS volume because Docker layers and Jenkins workspaces grow quickly.

Run the Jenkins controller as a container or systemd service. Run ephemeral Jenkins agents as Docker containers on that EC2 host, or migrate agents to EKS later. Do not run builds on the controller executor.

Argo CD and External Secrets Operator must run as Kubernetes controllers inside EKS. Manage them from EC2 using Helm and kubectl. Give Jenkins an EC2 instance profile for ECR access. Give External Secrets Operator its own IAM role through EKS Pod Identity or IRSA for AWS Secrets Manager.

Security groups:
- SSH 22 only through SSM Session Manager where possible
- Jenkins 8080 only from VPN, ALB, or approved office CIDRs
- Outbound HTTPS 443 to GitHub, ECR, AWS APIs, SonarQube, and EKS endpoint
- Prefer a private EKS API endpoint reachable from the EC2 VPC
