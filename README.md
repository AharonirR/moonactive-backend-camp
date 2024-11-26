# MoonActive Backend Camp

A backend application for scheduling and processing messages using Node.js, TypeScript, Express.js, and Redis.

---

## **Features**
1. **Schedule Messages**: Schedule a message to be printed at a specific time.
2. **Message Processing**: Automatically processes and prints scheduled messages at their due time.
3. **Health Check**: A simple endpoint to check the server's health.

---

## **Requirements**
- **Node.js** (version 14 or later)
- **Redis** (version 6 or later)
- **npm** (comes with Node.js)

---

## **Setup and Run**


Set Environment Variables
Create a file named .env in the root of the project with the following content:

PORT=3000
REDIS_URL=redis://localhost:6379

Run the Application
For development (with hot-reloading):

npm run dev

For production:
npm start
How to Use
Endpoints
1. Schedule a Message
Endpoint: POST /echoAtTime
Request Body:
json
{
  "time": "2024-12-01T15:00:00.000Z",
  "message": "Hello, world!"
}

Response:
json
{
  "status": "Message successfully scheduled."
}

2. Health Check
Endpoint: GET /health

Response:
Status: 200 OK

Response Body:
text
Copy code
Server is healthy.

File Structure :

moonactive-backend-camp/
│
├── src/
│   ├── app.ts            # Main application entry point
│   ├── constants.ts      # Configuration constants
│   ├── redisClient.ts    # Redis connection initialization
│   ├── routes.ts         # API route definitions
│   ├── scheduler.ts      # Message scheduling and processing logic
│
├── .env                  # Environment variables
├── package.json          # Project metadata and scripts
├── tsconfig.json         # TypeScript compiler configuration
├── README.md             # Project documentation (this file)


### **1. Install Dependencies**
Run the following command to install all required packages:
```bash
npm install

