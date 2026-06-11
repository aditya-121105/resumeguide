# ResumeGuide 🚀

**AI-Powered Career Intelligence Platform**

ResumeGuide helps job seekers analyze resumes, compare them against job descriptions, identify skill gaps, improve ATS performance, and receive personalized career recommendations.

The project is built as a cloud-native full-stack application using FastAPI, Next.js, PostgreSQL, Docker, AWS ECS, ECR, Auto Scaling Groups, and GitHub Actions CI/CD.

---

# ✨ Features

## Authentication & Security

* User Registration
* Email OTP Verification
* Login & Logout
* JWT Authentication
* Password Reset via OTP
* Google OAuth Login (works in local development; deployment requires a valid public domain for Google OAuth redirect configuration)

## Resume Management

* Upload PDF Resumes
* Store Files in Amazon S3
* View Resume History
* Manage Multiple Resumes
* Resume Metadata Tracking

## ATS Analysis

* Resume Parsing
* ATS Score Generation
* Strength Analysis
* Weakness Detection
* Resume Improvement Suggestions

## Career Intelligence

* Job Description Matching
* Skill Gap Identification
* Career Recommendations
* Personalized Insights

## Dashboard

* Resume Management
* Analysis History
* 

---

# 🏗️ Architecture

Frontend (Next.js)

↓

Nginx Reverse Proxy

↓

Backend API (FastAPI)

↓

PostgreSQL Database

↓

Amazon S3

---

# 🛠️ Tech Stack

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Axios

## Backend

* FastAPI
* Python
* SQLAlchemy
* JWT Authentication
* Google OAuth Integration
* SMTP Email Service

## Database

* PostgreSQL

## Cloud & DevOps

* AWS ECS (EC2 Launch Type)
* Amazon ECR
* Amazon S3
* EC2
* Auto Scaling Group
* IAM Roles
* Security Groups
* Nginx Reverse Proxy
* GitHub Actions CI/CD

---

# ☁️ AWS Infrastructure

## Compute

* ECS Cluster
* ECS Services
* ECS Task Definitions
* EC2 Container Instances
* Auto Scaling Group

## Storage

* Amazon S3 for Resume Storage

## Database

* PostgreSQL hosted on EC2

## Networking

* VPC
* Public Subnet
* Security Groups
* Nginx Reverse Proxy

## CI/CD

GitHub Actions automatically:

1. Builds Docker Images
2. Pushes Images to Amazon ECR
3. Deploys Updated Containers to ECS

---

# 🔄 CI/CD Pipeline

Developer Push

↓

GitHub Actions

↓

Build Docker Images

↓

Push to Amazon ECR

↓

Force ECS Deployment

↓

Updated Application

---

# 🔐 Security Features

* JWT Authentication
* Password Hashing
* Environment Variable Based Configuration
* IAM Roles
* Security Groups
* Email OTP Verification
* Protected API Routes

---

# 📂 Project Structure

```text
resumeguide/
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
└── README.md
```

---

# 🚀 Local Development Setup

## Clone Repository

```bash
git clone <repository-url>

cd resumeguide
```

---

## Backend Setup

```bash
cd backend

python -m venv .venv

source .venv/bin/activate

pip install -r requirements.txt
```

Create a local environment file:

```bash
cp .env.example .env
```

Update `.env` with your values.

Start backend:

```bash
uvicorn app.main:app --reload
```

---

## Frontend Setup

```bash
cd frontend

npm install
```

Create environment file:

```bash
cp .env.example .env.local
```

Start frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

Backend runs on:

```text
http://localhost:8000
```

---

# ⚙️ Required Environment Variables

The repository includes:

```text
backend/.env.example
frontend/.env.example
```

Configure:

* PostgreSQL Database
* Google OAuth Credentials
* SMTP Credentials
* AWS Credentials
* JWT Secret Key
* S3 Configuration

before running the application.

---

# 🧩 Deployment Challenges Solved

This project involved solving several real-world cloud deployment problems:

* ECS Task Networking Configuration
* ECS EC2 Launch Type Management
* Auto Scaling Group Integration
* Nginx Reverse Proxy Configuration
* SMTP Connectivity Troubleshooting
* ECS Service Deployment Failures
* Docker Image Management with ECR
* CI/CD Automation using GitHub Actions
* Dynamic Infrastructure Handling using Relative API Routing

These experiences provided hands-on exposure to cloud-native deployment and production troubleshooting.

---

# 📸 Screenshots

Add screenshots here:

* Landing Page
* Login Page
* Dashboard
* Resume Upload
* ATS Analysis Results
* AWS Architecture Diagram

---

# 🔮 Future Improvements

* Custom Domain & HTTPS
* AWS SES Production Email Service
* Infrastructure as Code (Terraform/CDK)
* Redis Caching
* Multi-Region Deployment

---

# 👨‍💻 Author

Aditya Kumarkhaniya

Software Engineering • Cloud • DevOps • AI/ML

GitHub: [Add GitHub Link]

LinkedIn: [Add LinkedIn Link]

---

# ⭐ Acknowledgements

This project was developed as part of a hands-on journey to learn:

* Full Stack Development
* Cloud Computing
* AWS Infrastructure
* Containerization
* CI/CD Automation
* Production Deployment Practices
