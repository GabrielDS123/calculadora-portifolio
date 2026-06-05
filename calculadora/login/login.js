// ============================================================
// LOGIN.JS — JavaScript da página de login
// ============================================================
 
// -------------------------------------------------------
// 1. USUÁRIO E SENHA FIXOS (hardcoded)
//    Para portfólio, guardamos direto no código mesmo.
//    Em projetos reais, isso ficaria em um servidor/banco de dados.
// -------------------------------------------------------
const USUARIO_CORRETO = "admin@calc.com";
const SENHA_CORRETA = "1234";
 
 
// -------------------------------------------------------
// 2. PEGANDO ELEMENTOS DO HTML
//    document.getElementById() busca um elemento pelo id.
//    Guardamos em variáveis para usar depois.
// -------------------------------------------------------
const form = document.getElementById("login-form");
const inputEmail = document.getElementById("input-email");
const inputSenha = document.getElementById("senha");
const btnEntrar = document.getElementById("entrar");
 
 
// -------------------------------------------------------
// 3. CRIANDO MENSAGEM DE ERRO DINAMICAMENTE
//    Criamos um <p> no JavaScript e adicionamos ao HTML.
//    Isso evita ter que colocar no HTML de antemão.
// -------------------------------------------------------
const mensagemErro = document.createElement("p");
mensagemErro.style.color = "rgb(255, 88, 147)";
mensagemErro.style.fontSize = "13px";
mensagemErro.style.marginTop = "5px";
mensagemErro.style.display = "none"; // começa escondido
btnEntrar.before(mensagemErro); // insere antes do botão "Entrar"
 
 
// -------------------------------------------------------
// 4. EVENTO DE SUBMIT
//    addEventListener() "escuta" um evento (como um clique
//    ou envio de formulário) e executa uma função quando ele acontece.
//
//    "submit" dispara quando o formulário é enviado.
//    e.preventDefault() impede o comportamento padrão do formulário
//    (que seria recarregar a página).
// -------------------------------------------------------
form.addEventListener("submit", function(e) {
  e.preventDefault(); // Impede o recarregamento da página
 
  // .value pega o texto digitado dentro do input
  const emailDigitado = inputEmail.value;
  const senhaDigitada = inputSenha.value;
 
 
  // -------------------------------------------------------
  // 5. VALIDAÇÃO — Verificando se os campos estão vazios
  //    .trim() remove espaços em branco do início e fim.
  //    === compara valor E tipo (mais seguro que ==).
  // -------------------------------------------------------
  if (emailDigitado.trim() === "" || senhaDigitada.trim() === "") {
    mostrarErro("Preencha todos os campos.");
    return; // "return" para a função aqui, sem continuar
  }
 
 
  // -------------------------------------------------------
  // 6. VERIFICANDO SE USUÁRIO E SENHA ESTÃO CORRETOS
  // -------------------------------------------------------
  if (emailDigitado === USUARIO_CORRETO && senhaDigitada === SENHA_CORRETA) {
 
    // -------------------------------------------------------
    // 7. SALVANDO O LOGIN COM sessionStorage
    //    sessionStorage guarda dados enquanto a aba estiver aberta.
    //    Quando o usuário fecha o navegador, os dados somem.
    //    (localStorage seria permanente — fica mesmo após fechar)
    //
    //    Usamos isso para a calculadora saber que o usuário logou.
    // -------------------------------------------------------
    sessionStorage.setItem("logado", "true");
 
    // Feedback visual antes de redirecionar
    btnEntrar.textContent = "Entrando...";
    btnEntrar.disabled = true;
 
    // -------------------------------------------------------
    // 8. REDIRECIONANDO PARA A CALCULADORA
    //    setTimeout() espera X milissegundos antes de executar.
    //    window.location.href muda a página atual.
    //    Ajuste o caminho abaixo conforme sua estrutura de pastas!
    // -------------------------------------------------------
    setTimeout(function() {
      window.location.href = "../login/calculadora/calculete.html";
      // Se os arquivos estiverem na mesma pasta: "./index.html"
    }, 800);
 
  } else {
    // Credenciais erradas
    mostrarErro("E-mail ou senha incorretos.");
 
    // Animação de "tremer" no formulário para feedback visual
    form.style.animation = "shake 0.4s ease";
    setTimeout(() => form.style.animation = "", 400);
  }
});
 
 
// -------------------------------------------------------
// 9. FUNÇÃO AUXILIAR — mostrarErro()
//    Funções evitam repetição de código (princípio DRY).
//    Aqui centralizamos a lógica de exibir mensagens de erro.
// -------------------------------------------------------
function mostrarErro(mensagem) {
  mensagemErro.textContent = mensagem;
  mensagemErro.style.display = "block";
 
  // Esconde a mensagem após 3 segundos
  setTimeout(function() {
    mensagemErro.style.display = "none";
  }, 3000);
}
 
 
// -------------------------------------------------------
// 10. ANIMAÇÃO DE SHAKE (tremida) via CSS injetado no JS
//     Poderia estar no CSS, mas aqui fica junto para aprendizado.
// -------------------------------------------------------
const style = document.createElement("style");
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-8px); }
    40%       { transform: translateX(8px); }
    60%       { transform: translateX(-5px); }
    80%       { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);