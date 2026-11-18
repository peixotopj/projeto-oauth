import { auth } from "./firebase-config.js";
import { supabase } from "./supabase-config.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// Identifica a plataforma utilizada
const params = new URLSearchParams(location.search);
const servico = params.get("auth");

// Elementos da página
const conteudo = document.getElementById("conteudo");
const mensagem = document.getElementById("mensagem");
const btnSair = document.getElementById("btnSair");
const linkInicio = document.getElementById("linkInicio");

// Exibe os dados do usuário
function mostrarUsuario(nome, email, origem) {
  document.getElementById("nome").textContent =
    "Nome: " + (nome || "Não informado");

  document.getElementById("email").textContent =
    "E-mail: " + (email || "Não informado");

  document.getElementById("servico").textContent =
    "Autenticado via: " + origem;

  mensagem.hidden = true;
  conteudo.hidden = false;
}

// Retorna para a página inicial
function voltarInicio() {
  location.replace("index.html");
}

// Exibe uma mensagem de erro
function mostrarErro(erro) {
  conteudo.hidden = true;
  mensagem.hidden = false;
  mensagem.textContent = "Erro: " + erro.message;
  linkInicio.hidden = false;
  console.error(erro);
}

// AUTENTICAÇÃO FIREBASE
if (servico === "firebase") {

  onAuthStateChanged(auth, (usuario) => {
    if (!usuario) {
      location.replace("login-firebase.html");
      return;
    }

    mostrarUsuario(
      usuario.displayName,
      usuario.email,
      "Firebase"
    );

  }, mostrarErro);

  btnSair.addEventListener("click", async () => {
    try {
      conteudo.hidden = true;
      mensagem.hidden = false;
      mensagem.textContent = "Encerrando sessão...";

      await signOut(auth);
      voltarInicio();

    } catch (erro) {
      mostrarErro(erro);
    }
  });

// AUTENTICAÇÃO SUPABASE
} else if (servico === "supabase") {

  async function verificarSupabase() {
    try {
      // Recupera a sessão após o retorno OAuth
      const { data: { session }, error } =
        await supabase.auth.getSession();

      if (error) throw error;

      if (!session) {
        location.replace("login-supabase.html");
        return;
      }

      // Confirma os dados do usuário
      const { data: { user }, error: userError } =
        await supabase.auth.getUser();

      if (userError) throw userError;

      if (!user) {
        location.replace("login-supabase.html");
        return;
      }

      mostrarUsuario(
        user.user_metadata.full_name,
        user.email,
        "Supabase"
      );

    } catch (erro) {
      mostrarErro(erro);
    }
  }

  await verificarSupabase();

  btnSair.addEventListener("click", async () => {
    try {
      conteudo.hidden = true;
      mensagem.hidden = false;
      mensagem.textContent = "Encerrando sessão...";

      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      voltarInicio();

    } catch (erro) {
      mostrarErro(erro);
    }
  });

} else {
  mensagem.textContent =
    "Plataforma de autenticação não identificada.";

  linkInicio.hidden = false;
}
