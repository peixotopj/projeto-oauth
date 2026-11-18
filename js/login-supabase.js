import { supabase } from "./supabase-config.js";

const mensagem = document.getElementById("mensagem");
const botao = document.getElementById("btnLogin");

// Verifica se já existe uma sessão
const { data: { session }, error: erroSessao } =
  await supabase.auth.getSession();

if (erroSessao) {
  mensagem.textContent = "Erro: " + erroSessao.message;
}

if (session) {
  location.replace("home.html?auth=supabase");
}

// Realiza o login com Google
botao.addEventListener("click", async () => {
  try {
    mensagem.textContent = "Redirecionando para o Google...";

    const destino = new URL("home.html", location.href);
    destino.searchParams.set("auth", "supabase");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: destino.href
      }
    });

    if (error) {
      throw error;
    }

  } catch (erro) {
    mensagem.textContent = "Erro: " + erro.message;
    console.error(erro);
  }
});
