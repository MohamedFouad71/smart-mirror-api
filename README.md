# Smart Mirror API – SCU

Backend service for the **Smart Mirror System – SCU**, providing secure authentication, workout session management, analytics processing, and cloud-ready RESTful APIs.

---

## Overview

The **Smart Mirror API** is a Node.js/Express backend designed to support an AI-powered smart fitness mirror.  
It handles:

- User authentication with JWT
    
- Workout session storage
    
- Real-time analytics aggregation
    
- Secure REST API communication with AI and Dashboard services
    
- Cloud-ready deployment (Render / AWS / Docker)
    

This backend represents the **core data and logic layer** of the full Smart Mirror ecosystem.

---

## Architecture Role


    AI / Computer Vision  →  Smart Mirror API  →  MongoDB

                                    ↓

                               Web Dashboard


---

## Tech Stack

- **Node.js + Express**
    
- **MongoDB + Mongoose**
    
- **JWT Authentication**
    
- **RESTful API Design**
    
- **MVC Architecture**
    
- **Cloud Deployment Ready (Render / AWS / Docker)**
    

---


## Environment Variables

Create a `.env` file in the root:
```
PORT=3000 
MONGO_URI=your_mongodb_connection_string 
JWT_SECRET=your_super_secret_key 
JWT_EXPIRES=7d
```

---

## Installation & Local Run

```
git clone https://github.com/MohamedFouad71/smart-mirror-api.git
cd smart-mirror-api 
npm install
npm run dev
```

---

## Core Features

### Authentication

- Register new users
    
- Secure login with JWT
    
- Protected routes using auth middleware
    

### Workout Sessions

- Create workout session from AI mirror
    
- Retrieve latest session
    
- Store repetitions, form score, and mistakes
    

### Analytics

- Total sessions & repetitions
    
- Average form score
    
- Most frequent mistakes
    
- Time-range based summary
    

---

## Main API Endpoints

### Auth

`POST /api/auth/register`

`POST /api/auth/login`

---

### Sessions

`POST /api/sessions GET  /api/sessions/latest`

---

### Analytics

`GET /api/analytics/summary?range=7d`

Response example:

```json
{
  "ok": true,
  "range": "7d",
  "totalSessions": 1,
  "totalReps": 18,
  "avgFormScore": 82,
  "topMistakes": [
    { "type": "knees_in", "count": 3 }
  ]
}
```

---

## Deployment

### AWS

- Dockerized Node.js service on **EC2**
    
- MongoDB Atlas database
    
- CI/CD via **GitHub Actions**
    

---

## Integration with AI Mirror

The AI application sends a **POST request** after workout completion:

`POST /api/sessions`

`Authorization: Bearer <token>`

```json
{
  "exerciseType": "squat",
  "reps": 18,
  "formScore": 82,
  "mistakes": [{ "type": "knees_in", "count": 3 }],
  "ts": "2026-02-10T18:00:00Z"
}
```

---

## Development Notes

- `.env` is excluded via `.gitignore`
    
- Uses **MVC pattern** for scalability
    
- Designed for **cloud-native deployment**
    
- Built as part of **SCU Graduation Project**
    

---

## Team – SCU Smart Mirror

- **Backend Engineering**
    
- **AI & Computer Vision**
    
- **Frontend Dashboard**
    
- **Embedded Systems**
    
- **DevOps & Cloud**
    

---

## License

Educational project – SCU Graduation Project.