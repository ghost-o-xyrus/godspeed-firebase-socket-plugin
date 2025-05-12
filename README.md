# Godspeed Firebase-Socket Plugin Demo

## What I Built

This project demonstrates a custom Godspeed datasource plugin that integrates Firebase Realtime Database with Socket.IO for real-time event broadcasting.

The plugin enables workflows in a Godspeed project to:
- **Receive user data** via an HTTP POST endpoint.
- **Write that data to Firebase** under a unique user path.
- **Emit real-time updates** to all connected Socket.IO clients whenever the user’s data changes in Firebase.

This setup is ideal for applications that require both persistent storage and instant notifications to clients, such as collaborative apps, dashboards, or chat systems.

---

## How to Run It

### 1. Clone the Repository

```sh
git clone https://github.com/ghost-o-xyrus/godspeed-firebase-socket-plugin
cd godspeed-firebase-socket-plugin
```
Please remember to input a Firebase-Realtime Database URL in Firebase-Socket-as-database/src/index
### 2. Install Dependencies
Install dependencies for both the main Godspeed project and the plugin:
```sh
npm install
cd Firebase-Socket-as-datasource
npm install
cd ..
```
### 3. Build the Plugin
```sh
cd Firebase-Socket-as-datasource
npm run build
cd ..
```
### 4. Link the Plugin to the Main Project
If your main project uses a local file reference for the plugin in package.json, run:
```sh
npm install
```
in the main project directory to ensure the built plugin is linked.


### 5. Start the Godspeed Server
```sh
npm run dev
```
The server will start (by default) on port 3003.

### 6. Test the Endpoint
Use curl to send a POST request to the workflow endpoint:
```sh
curl -X POST http://localhost:3003/firebase-socket-demo -H "Content-Type: application/json" -d "{\"userId\":\"456\",\"username\":\"jane_doe\",\"email\":\"jane@example.com\"}"
```
This will trigger the workflow, write the user data to Firebase, and (optionally) emit a real-time event via Socket.IO.

## Special Notes & Limitations
### Firebase Configuration:
The Firebase Realtime Database URL is just a sample. Update it in Firebase-Socket-as-datasource/src/index.ts to match your Firebase project.
### Socket.IO Server:
The plugin connects as a client to a Socket.IO server running on localhost:3000. Make sure this server is running if you want to see real-time events.
### Case Sensitivity:
Ensure that the JSON keys in your POST requests (userId, username, email) match exactly with what the plugin expects. JavaScript is case-sensitive.
### Workflow Input:
The workflow passes an empty args object to the plugin. The plugin reads the POST body directly from the Godspeed context.
### No Frontend Included:
This project does not include a frontend UI. All testing is done via curl and the Node.js Socket.IO client.

## Project Structure
```
Godspeed plugin assigment/
├── my-godspeed-project/
│   ├── src/
│   │   ├── functions/
│   │   │   └── firebase-socket-demo.yaml         # Workflow definition
│   │   ├── events/
│   │   │   └── firebase-socket-demo.yaml         # Event mapping
│   │   └── datasources/
│   │       └── types/
│   │           └── firebase-socket-datasource.ts # Loader file
│   ├── docs/
│   ├── config/
│   ├── helm-chart/
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── tsconfig.json
│   └── ... (other project files)
│
├── Firebase-Socket-as-datasource/
│   ├── src/
│   │   └── index.ts                             # Plugin main logic
│   ├── .gitignore
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── socket-client.js                             # Node.js Socket.IO test client (if not inside either project)
└── ... (any other files at the parent level)
```
