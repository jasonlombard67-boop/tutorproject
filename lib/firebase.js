// lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// PRIMARY Firebase config (provided)

const primaryConfig = {
  apiKey: "AIzaSyB6qZ3sMjMLX_S-XSy87xUO7fB2knJ84ik",
  authDomain: "tutorial-a93df.firebaseapp.com",
  projectId: "tutorial-a93df",
  storageBucket: "tutorial-a93df.firebasestorage.app",
  messagingSenderId: "651060438422",
  appId: "1:651060438422:web:af3fd7cbccae0aac6b69b7",
  measurementId: "G-GF3E6BXRKZ",
};

// SECONDARY Firebase config - REPLACE with your real config
const secondaryConfig = {
  apiKey: "AIzaSyASwlgLqcAWpMhA50tASuOZIBocoqL_liM",
  authDomain: "tutorproject-8c337.firebaseapp.com",
  projectId: "tutorproject-8c337",
  storageBucket: "tutorproject-8c337.firebasestorage.app",
  messagingSenderId: "1035424626823",
  appId: "1:1035424626823:web:c76bcb9495ede95870a022",
  measurementId: "G-HQX8DW697D",
};

const apps = getApps();
let appPrimary, appSecondary;
if (!apps.length) {
  appPrimary = initializeApp(primaryConfig, "primary");
  appSecondary = initializeApp(secondaryConfig, "secondary");
} else {
  appPrimary = apps.find((a) => a.name === "primary") || apps[0];
  appSecondary =
    apps.find((a) => a.name === "secondary") ||
    (apps[0].name === "primary" ? null : apps[0]);
  if (!appSecondary) {
    appSecondary = initializeApp(secondaryConfig, "secondary");
  }
}

export const dbPrimary = getFirestore(appPrimary);
export const dbSecondary = getFirestore(appSecondary);
