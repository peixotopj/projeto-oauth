import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// Substitua pelos dados do seu projeto
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
