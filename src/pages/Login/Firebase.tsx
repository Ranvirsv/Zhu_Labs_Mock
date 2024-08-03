// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFtWezqMHn9zGtJnTH2q9wcKh1wLODbhE",
  projectId: "zhu-application",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
