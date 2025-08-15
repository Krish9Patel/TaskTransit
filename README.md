# TaskTransit 🚀
A collaborative project management and task-tracking platform designed for individuals and teams to streamline their workflow, visualize progress, and stay organized in real-time. 

# 🧩 Features
✅ Create, assign, and manage tasks with due dates and priorities

📅 Project timeline view with Gantt chart integration

💬 Real-time updates and activity tracking

📊 Dashboard with progress analytics

# 🛠️ Tech Stack
Frontend: React, TailwindCSS

Backend: Node.js, Express

Database: PostgreSQL

# 🚀 Getting Started
1. Clone the repository
```bash
git clone https://github.com/yourusername/tasktransit.git
cd tasktransit
```
2. Install dependencies
```bash
npm install
# or for backend and frontend folders separately
cd backend && npm install
cd ../frontend && npm install
```
3. Set up environment variables
Create a .env file in the root of the backend directory with the following variables:
```init
DATABASE_URL=your_postgres_connection
JWT_SECRET=your_jwt_secret
```
4. Run the development server
```bash
# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm run dev
```
Visit http://localhost:3000 to access TaskTransit locally.

# 📁 Project Structure
```bash
tasktransit/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── server.js
│
├── frontend/
│   ├── components/
│   ├── pages/
│   └── App.jsx
│
├── README.md
└── .env
```
# 🧪 Future Features (Planned)
📲 Mobile responsive dashboard

📝 Task comments and file uploads

🔔 Email and in-app notifications

🔄 Project import/export and backups

🔍 Search and filter functionality
