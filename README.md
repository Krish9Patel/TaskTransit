#TaskTransit 

TaskTransit is a simple and intuitive task management application designed to help you visualize your workflow on an interactive timeline. It's built with a focus on simplicity and ease of use, allowing you to manage your projects at a glance.

#Features

✅ Interactive Gantt Chart: Visualize your tasks and their durations on a dynamic timeline powered by D3.js.
✅ CRUD Functionality: Easily create, read, update, and delete tasks directly from the UI.
✅ Modal-Based Editing: Click on any task or its name on the axis to open a modal for quick edits or to view descriptions.
✅ Dark/Light Theme: Toggle between a light and dark theme to suit your preference.

#Tech Stack

Frontend: HTML, CSS, Vanilla JavaScript, D3.js

Backend: Node.js, Express

Database: MongoDB with Mongoose

#Getting Started

Follow these instructions to get the project running on your local machine.

1. Clone the repository
'''
git clone [https://github.com/your-username/TaskTransit.git](https://github.com/your-username/TaskTransit.git)
cd TaskTransit
'''

2. Install dependencies

Navigate to the server directory and install the required npm packages.
'''
cd server
npm install
'''

3. Set up environment variables

Create a .env file in the server directory. This is where you'll store your database connection string.
'''
# In the /server directory
touch .env
'''

Add your MongoDB connection URI to the .env file. Replace the placeholder with your actual connection string.

For MongoDB Atlas:
'''
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
'''

For a local MongoDB instance:
'''
MONGO_URI=mongodb://localhost:27017/tasktransit
'''

4. Run the development server

Once your .env file is configured, you can start the server.
'''
npm start
'''

The application will be running at http://localhost:8080.

#📁 Project Structure

The project structure has been simplified to a single server directory which contains both the frontend and backend files.
'''
tasktransit/
│
├── server/
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── models/
│   │   └── Task.js
│   ├── app.js         # Frontend JavaScript
│   ├── index.js       # Express Server
│   ├── index.html     # Frontend HTML
│   ├── styles.css     # Frontend CSS
│   ├── package.json
│   └── .env           # Your environment variables
│
└── README.md
'''
#Future Plans

User Authentication: Secure your tasks with user accounts.

Task Filtering: Add options to filter tasks by name, date, or status.

Drag-and-Drop: Allow users to reschedule tasks by dragging them on the timeli
