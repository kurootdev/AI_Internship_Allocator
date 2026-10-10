# AI Internship Allocator

AI Internship Allocator is a full-stack web application that helps connect candidates with internship opportunities using intelligent matching and allocation logic. The platform includes:
- Candidate registration and profile management
- Employer internship posting
- AI-powered internship recommendations
- Allocation and candidate tracking
- Role-based dashboard experience for candidates and employers

This project is built as a monorepo with:
- Frontend: React + Vite
- Backend: Node.js + Express + MongoDB
- AI Recommendation Service: Flask + Python

---

## Features

### Candidate Features
- Candidate signup/signin
- Profile creation and updates
- Skills, degree, CGPA, location, and category details
- Internship browsing
- AI-driven recommendation engine
- Internship application flow
- Result and allocation tracking

### Employer Features
- Employer signup/signin
- Internship posting
- Candidate view for each internship
- Allocation results
- Posted internship management

### AI Matching
- Uses candidate attributes such as skills, degree, major, social category, location, and rural status
- Recommends internships based on similarity and suitability
- Uses a dedicated Flask microservice for scoring and matching

---

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Redux/Zustand state management
- Tailwind CSS
- Firebase
- Framer Motion
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookie-based auth
- CORS

### AI Microservice
- Python
- Flask
- Flask-CORS
- Recommendation and allocation logic

---

## Project Structure

```bash
AI_Internship_Allocator/
├── backend/
│   ├── src/
│   │   ├── DB/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── index.js
│   │   └── ...
│   ├── package.json
│   ├── package-lock.json
│   └── .env
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── Flask_microservice/
│   ├── main.py
│   ├── allocate.py
│   ├── model_utils.py
│   ├── related_skills.py
│   ├── requirements.txt
│   └── ...
├── .gitignore
└── README.md
Prerequisites
Make sure you have the following installed:

Node.js (v18+ recommended)
npm
Python 3.10+
MongoDB (local instance or MongoDB Atlas)
Git
Backend Setup
Open a terminal and go to the backend folder:
bash
cd backend
Install dependencies:
bash
npm install
Create a .env file in the backend folder:
env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret_key
ACCESS_TOKEN_EXPIRY=7d
NODE_ENV=development
Start the backend server:
bash
npm run dev
The backend runs on:

bash
http://localhost:5000
Frontend Setup
Open a new terminal and go to the frontend folder:
bash
cd frontend
Install dependencies:
bash
npm install
Start the frontend development server:
bash
npm run dev
The frontend runs on:

bash
http://localhost:5173
Flask AI Microservice Setup
Open a new terminal and go to the Flask microservice folder:
bash
cd Flask_microservice
Create a virtual environment:
bash
python -m venv venv
Activate the virtual environment:
On Windows:

bash
venv\Scripts\activate
On macOS/Linux:

bash
source venv/bin/activate
Install Python dependencies:
bash
pip install -r requirements.txt
Start the AI microservice:
bash
python main.py
The Flask API runs on:

bash
http://127.0.0.1:5000
Note: The Flask app is configured to run on port 5000 in the current project. If you run it while the backend is also using port 5000, you may need to adjust the port to avoid conflicts.

API Overview
Candidate Routes
Base path:

bash
/api/user
POST /api/user/signup
POST /api/user/signin
POST /api/user/update-profile
POST /api/user/logout
GET /api/user/get
POST /api/user/apply-internship/:internshipId
GET /api/user/recommend
GET /api/user/get-all-internships
GET /api/user/get-user-applied-internship
GET /api/user/get-all-candidates
Employer Routes
Base path:

bash
/api/employee
POST /api/employee/signup
POST /api/employee/signin
POST /api/employee/logout
GET /api/employee/get
POST /api/employee/post-internship
GET /api/employee/get-candidates/:internshipId
GET /api/employee/get-posted-internship
GET /api/employee/view-allocation/:internshipId
GET /api/employee/get-all-employee
Flask AI Routes
GET / → health check
POST /recommend → returns top internship recommendations for a candidate
POST /allocate → allocates candidates to internship slots
Example AI Request Format
Recommendation payload
JSON
{
  "candidate": {
    "candidateId": "PMI00001",
    "skills": ["JavaScript", "React", "Node.js"],
    "degree": "Bachelor's",
    "major": "Computer Science",
    "preferredLocations": ["Bengaluru", "Pune"],
    "pastParticipationCount": 1,
    "socialCategory": "GENERAL",
    "isRural": false
  },
  "internships": [
    {
      "internshipId": "INT001",
      "requiredSkills": ["JavaScript", "React"],
      "sector": "Web Development",
      "locationDistrict": "Bengaluru",
      "minDegree": "Bachelor's",
      "capacity": 20,
      "quotas": {
        "GENERAL": 10,
        "OBC": 5,
        "EWS": 3,
        "SC": 2
      }
    }
  ]
}
Environment Notes
Backend uses MONGODB_URI for database connectivity
JWT auth is handled using ACCESS_TOKEN_SECRET
Frontend includes Firebase configuration inside frontend/src/firebase.js
If Firebase is not needed for your local testing, it can be removed or replaced
Running the Full Project
To run the entire application locally:

Start MongoDB
Start the backend:
bash
cd backend && npm run dev
Start the AI Flask service:
bash
cd Flask_microservice && python main.py
Start the frontend:
bash
cd frontend && npm run dev
Then access:

Frontend: http://localhost:5173
Backend API: http://localhost:5000
AI API: http://127.0.0.1:5000
Project Purpose
This application is designed to streamline the internship allocation process by combining:

candidate profile management
employer internship posting
AI-based recommendation logic
transparent allocation and evaluation
It is especially useful for systems that need to match candidates with internships based on merit, eligibility, and preference constraints.

License
This project is currently unlicensed unless you add a license file.

Contributing
Pull requests and improvements are welcome. If you want to contribute:

Fork the repository
Create a feature branch
Commit your changes
Open a pull request
Contact
For support or collaboration, contact the repository owner or maintainers through GitHub.

Summary
AI Internship Allocator is a modern, full-stack internship management platform built to automate candidate matching and internship allocation with AI-powered recommendation logic. It combines a React frontend, Express backend, MongoDB database, and a Python Flask AI engine to create a complete internship allocation workflow.

