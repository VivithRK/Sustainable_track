# Green Steps - Quick Start Guide

This guide will help you run the application on your local computer.

## Prerequisites

Make sure you have installed:
- Python (3.8 or higher)
- Node.js (14 or higher)
- Git

## Running the Application

### Step 0: Get the Code

1. Open a terminal/command prompt
2. Navigate to where you want to store the project
3. Run this command:
```powershell
git clone https://github.com/VivithRK/Sustainable_track.git
cd Sustainable_track
```

### Step 1: Start the Backend Server

1. Open a new terminal/command prompt
2. Navigate to the project folder
3. Run these commands:
```powershell
# Create and activate virtual environment
python -m venv venv
.\venv\Scripts\activate

# Install dependencies and start server
cd sustainability_backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The backend server will start at http://localhost:8000

### Step 2: Start the Frontend Server

1. Open another terminal/command prompt
2. Navigate to the project folder
3. Run these commands:
```powershell
cd sustainability-frontend
npm install
npm start
```

The application will open automatically in your browser at http://localhost:3000

## Using the Application

1. The homepage will show you an overview of sustainable actions
2. Click "Dashboard" to view and manage your actions
3. Use the "Add Action" button to record new sustainable activities
4. View your total impact points at the top of the dashboard

## Stopping the Application

To stop the application:
1. Press Ctrl+C in both terminal windows
2. Close the browser window

## Need Help?

If you encounter any issues:
1. Make sure both terminal windows show the servers are running
2. Check that you can access both URLs in your browser
3. Try refreshing the page
4. Restart both servers if needed 