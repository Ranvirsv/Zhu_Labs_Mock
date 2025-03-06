/**
 * + Firebase.ts:
 *
 * This file is for initializing the Firebase app and then creating the service objects
 * that are associated with our app. Then we can just export/expose the services, whilst
 * keeping the app private.
 */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFtWezqMHn9zGtJnTH2q9wcKh1wLODbhE",
  projectId: "zhu-application",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
