const display = document.querySelector(".display"); //seleciona os mesmos seletores do css

const teclasNumeros = document.querySelectorAll("[id*=tecla]"); // o * anterior seleciona todas as divs que contem o termo TECLA

const operadores = document.querySelectorAll("[id*=operador]");

const historico = document.querySelector(".historico");


let novoNumero = true;
let operador;
let numeroAnterior;
let calculoHistorico;



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
    calculoHistorico = display.textContent + operador;
    numeroAnterior = display.textContent.replace(",", ".");
};

operadores.forEach((operador) =>{
    operador.addEventListener("click", selecionarOperador);
});

const calcular = () => {    // verificamos se há um número em memória
    if(operador !== undefined){        //pega o número do display e coloca em numeroAtual
        calculoHistorico += display.textContent;
        const numeroAtual = display.textContent.replace(",", ".");        //seta novoNumero como verdadeiro para que possamos atualizar o display com o resultado
        novoNumero = true;        //calculamos o resultado com a função eval o eval interpreta uma expresssão, executa e retorna o resultado
        let resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
        if(resultado.toString().includes(".")) {
            resultado = resultado.toFixed(2);       //atualizamos o display com o resultado calculado
        }

        calculoHistorico += "=" + resultado.toString().replace(",", ".");

        atualizarDisplay(resultado.toString().replace(",", "."));        //resetamos o operador como indefinido (estado inicial) Vou alterado para String pq o eval não aceita o replace
        operador = undefined;

        incluirHistorico();
    }  
    
};

const incluirHistorico = () => {
    const novoHistorico = document.createElement("p");
    novoHistorico.textContent = calculoHistorico;

    historico.appendChild(novoHistorico);

    novoHistorico = undefined;
}

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

const voltarNumero = () => {

    display.textContent = display.textContent.slice(0, -1);
  
  };
  document.querySelector("#backspace").addEventListener("click", voltarNumero);

  //invertendo o sinal do número
  const inverterSinal = () => {
   display.textContent = display.textContent * -1;
  };
  document.querySelector("#inverter").addEventListener("click", inverterSinal);

// vírgula e os números decimais

const inserirDecimal = () => {
    if(!display.textContent.includes(",")){
        if(display.textContent.length > 0){
            atualizarDisplay(",");
        }else{
            atualizarDisplay("0,")
        }
    }
};
document.querySelector("#decimal").addEventListener("click", inserirDecimal);

