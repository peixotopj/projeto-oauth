import { auth, provider } from "./firebase-config.js";

import {
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const mensagem = document.getElementById("mensagem");
const botao = document.getElementById("btnLogin");

// Verifica se já existe uma sessão autenticada
onAuthStateChanged(auth, (usuario) => {
  if (usuario) {
    location.replace("home.html?auth=firebase");
  }
});

// Realiza o login com Google
botao.addEventListener("click", async () => {
  try {
    mensagem.textContent = "Autenticando...";

    await signInWithPopup(auth, provider);

    location.replace("home.html?auth=firebase");

  } catch (erro) {
    mensagem.textContent = "Erro: " + erro.message;
    console.error(erro);
  }
});
