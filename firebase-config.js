// Firebase settings for public Community maps.
//
// Leave this as null and the game works normally; the Community tab just shows a
// "not set up yet" message. To turn Community maps on, follow the steps in
// README.md ("Turning on Community maps") and paste your web app config below.
//
// These values are safe to publish on GitHub: a Firebase web config only says
// which project to talk to. Access is controlled by firestore.rules.

const firebaseConfig = {
  apiKey: "AIzaSyC-bVB6DvjKbJ2R5eiauXscIwiOniJFR4M",
  authDomain: "minigolfgame-e7ea1.firebaseapp.com",
  projectId: "minigolfgame-e7ea1",
  storageBucket: "minigolfgame-e7ea1.firebasestorage.app",
  messagingSenderId: "1083025541017",
  appId: "1:1083025541017:web:ea6fc3c6b16494e1d9b508",
  measurementId: "G-8N387BM15E"
};

/* Example. Replace null above with your own values:

window.FIREBASE_CONFIG = {
  apiKey: "AIzaSy...",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.firebasestorage.app",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456",
};

*/
