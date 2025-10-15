// lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// PRIMARY Firebase config (provided)
const primaryConfig = {
  apiKey: "AIzaSyCl_7afAdceTVjvppXbBfF_Qqy8QDqrd6Y",
  authDomain: "tutorproject-65798.firebaseapp.com",
  projectId: "tutorproject-65798",
  storageBucket: "tutorproject-65798.firebasestorage.app",
  messagingSenderId: "96542132249",
  appId: "1:96542132249:web:6da17155f7e069279c8288",
  measurementId: "G-WJ6HMLSK0E",
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
