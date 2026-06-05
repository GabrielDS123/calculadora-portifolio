let expressao = "";

function insertToDisplay(valor) {
    expressao += valor;
    document.getElementById('display').value = expressao;
}

function clean() {
    expressao = "";
    document.getElementById('display').value = "";
}

function apagar() {
    expressao = expressao.slice(0, -1);
    document.getElementById('display').value = expressao;
}

function calcular() {
    try {
        // Substitui 'x' por '*' para o JavaScript entender
        expressao = expressao.replace(/x/g, '*');
        let resultado = eval(expressao);
        document.getElementById('display').value = resultado;
        expressao = resultado.toString();
    } catch (erro) {
        document.getElementById('display').value = "Erro";
        expressao = "";
    }
}