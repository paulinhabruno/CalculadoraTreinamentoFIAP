const display = document.querySelector(".display"); //seleciona os mesmos seletores do css

const teclasNumeros = document.querySelectorAll("[id*=tecla]"); // o * anterior seleciona todas as divs que contem o termo TECLA

const operadores = document.querySelectorAll("[id*=operador]");



let novoNumero = true;
let operador;
let numeroAnterior;

function atualizarDisplay(texto) {
    if(novoNumero === true){
        display.textContent = texto;
        novoNumero = false;
    }else{
        display.textContent += texto;
    }
};

const inserirNumero = (event) => atualizarDisplay(event.target.textContent);

teclasNumeros.forEach(function(tecla){
    tecla.addEventListener("click", inserirNumero);
}); // o forEach é um laço para executar uma função para o evento/elemento entre parênteses

const selecionarOperador =(event) => {
    novoNumero = true;
    operador = event.target.textContent;
    numeroAnterior = display.textContent;
};

operadores.forEach((operador) =>{
    operador.addEventListener("click", selecionarOperador);
});

const calcular = () => {
    // verificamos se há um número em memória
    if(operador !== undefined){
        //pega o número do display e coloca em numeroAtual
        const numeroAtual = display.textContent;
        //seta novoNumero como verdadeiro para que possamos atualizar o display com o resultado
        novoNumero = true;
        //calculamos o resultado com a função eval
        //o eval interpreta uma expresssão, executa e retorna o resultado
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
        //atualizamos o display com o resultado calculado
        atualizarDisplay(resultado);
        //resetamos o operador como indefinido (estado inicial)
        operador = undefined;
  }
};

const ativarIgual = () => calcular();

document.querySelector("#igual").addEventListener("click", ativarIgual);

const limparDisplay = () => (display.textContent = "");

document.querySelector("#limparDisplay").addEventListener("click", limparDisplay);

const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}

document.querySelector("#limparCalculo").addEventListener("click", limparCalculo);

// desafio: implementar o backspace, a vírgula e os números decimais