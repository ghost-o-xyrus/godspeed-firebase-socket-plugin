import { GSContext,  GSDataSource, GSStatus, PlainObject,} from "@godspeedsystems/core";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, Database } from "firebase/database";
import { io, Socket } from "socket.io-client";

const firebaseConfig = {
  databaseURL:  process.env.FIREBASE_DATABASE_URL // set here for node env. in render.com
  //databaseURL: "https://your-project-id.firebaseio.com" // Replace with with your project firebase realtime DB url  
};

const app = initializeApp(firebaseConfig);
const database: Database = getDatabase(app);

// Initialize Socket.IO Client
const socket: Socket = io(process.env.SOCKET_URL || "http://localhost:3000");


export default class DataSource extends GSDataSource {
protected async initClient(): Promise<{ database: Database; socket: Socket }> {
     // initialize your client
     return { database, socket };
}

async execute(ctx: GSContext, args: PlainObject): Promise<any> {
  // access POST body directly 
  const {userID, username, email } = ctx.inputs.data.body;

  console.log("ARGS Received:",{userID, username, email});
  // check if args are valid
  const { database, socket } = await this.initClient();
    try {
      // execute methods: write data to Firebase
      await set(ref(database, 'users/' + userID ), {
        username,
        email
      });
      // remove previous listeners if needed(not shown here)
      
      //real-time listener for data changes in firebase 
      onValue(ref(database, 'users/' + userID), (snapshot) => {
        const data = snapshot.val();
        console.log("Emitting dataUpdated:", data);
        socket.emit('dataUpdated', data); // Emit real-time updates to Socket.IO clients
      });

      return {status: "Data written to Firebase and real-time updates set up!"};
      
    } catch (error) {
      // throw error handling 
      throw new Error(`Failed to execute FirebaseSocketDataSource: ${error}`);
    }
}
}
const SourceType = 'DS';
const Type = "firebase-socket-datasource"; // this is the loader file of the plugin, So the final loader file will be `types/${Type.js}`
const CONFIG_FILE_NAME = "firebase-socket-datasource"; // in case of event source, this also works as event identifier, and in case of datasource works as datasource name
const DEFAULT_CONFIG = {};

export {
  DataSource,
  SourceType,
  Type,
  CONFIG_FILE_NAME,
  DEFAULT_CONFIG
}
