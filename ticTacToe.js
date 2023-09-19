function winConditionFactory(combination, symbol){
    return {combination, symbol};
}

const condicoes = [
    // Linhas
    winConditionFactory([1, 2, 3], '-'),
    winConditionFactory([4, 5, 6], '-'),
    winConditionFactory([7, 8, 9], '-'),
    // Colunas
    winConditionFactory([1, 4, 7], ' |'),
    winConditionFactory([2, 5, 8], ' |'),
    winConditionFactory([3, 6, 9], ' |'),
    // Diagonais
    winConditionFactory([1, 5, 9], '\\'),
    winConditionFactory([3, 5, 7], '/')
];

const valores = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
let i = 1;
let jogadas = [];
let jogador1 = [];
let jogador2 = [];
let acabou = false;

function main(){
    if(jogadas.length == 0){
        limparTabuleiro();
    }
    // Se ja tiver acabado
    if(acabou){
        return;
    }
    const jogada = parseInt(document.getElementById("jogada").value);
    if(!jogada){
        return;
    }
    // Limpar o input
    document.getElementById("jogada").value = '';
    // Se a jogada não estiver entre 1 e 9
    if(jogada < 1 || jogada > 9){
        document.getElementById("texto").innerText = "Jogada inválida! Repete Jogador " + i;
    }
    else {
        // Se ainda n tiver sido jogada
        if(jogadas.indexOf(jogada) == -1){
            jogadas.push(jogada);
            // Se for o jogador 1
            if(i === 1){
                jogar(valores[jogada - 1 ], 'X');
                jogador1.push(jogada);
                if(verificarSeGanhou(jogador1)){
                    document.getElementById("texto").innerText = "O jogador 1 ganhou!";
                    return;
                }
                i++;
            } 
            // Se for o jogador 2
            else {
                jogar(valores[jogada - 1], 'O'); 
                jogador2.push(jogada);
                if(verificarSeGanhou(jogador2)){
                    document.getElementById("texto").innerText = "O jogador 2 ganhou!";
                    return;
                }
                i--;
            }
            // Se o jogo tiver acabado num empate
            if(jogadas.length === 9){
                acabou = true;
                document.getElementById("texto").innerText = "Ficou empatado";
                return;
            }
            // Atualizar o texto
            if(i === 1){
                document.getElementById("texto").innerText = "Jogador 1 - X";
            }
            else{
                document.getElementById("texto").innerText = "Jogador 2 - O";
            }
        }
        // Se ja tiver sido jogada
        else {
            document.getElementById("texto").innerText = "Jogada inválida! Repete Jogador " + i; 
        }
    } 
}

function limparTabuleiro(){
    for(j in valores){
        document.getElementById(valores[j]).innerText = " ";
    }
}

function jogar(pos, simbolo){
    document.getElementById(pos).innerHTML = simbolo;
}

function verificarSeGanhou(jogador){
    // Se ainda não houveram 3 jogadas
    if(jogador.length < 3){
        return false;
    }
    // Verificar se ganhou
    for(c in condicoes){
        let array = condicoes[c]['combination'];
        if(jogador.includes(array[0]) && jogador.includes(array[1]) && jogador.includes(array[2])){
            verCondicaoVencedora(condicoes[c]);
            acabou = true;
            return true;
        }
    }
    return false;
}

// Desenhar o padrão vencedor
function verCondicaoVencedora(condition){
    document.getElementById(valores[condition.combination[0] - 1]).innerText = condition.symbol;
    document.getElementById(valores[condition.combination[1] - 1]).innerText = condition.symbol;
    document.getElementById(valores[condition.combination[2] - 1]).innerText = condition.symbol;
}


function keyPress(){
    document.addEventListener ('keypress', (event) => {
        const keyName = event.key;
        if(keyName === 'Enter'){
            main();
        }
      });
}

function reset(){
    i = 1;
    jogadas = [];
    jogador1 = [];   
    jogador2 = [];
    acabou = false;   
    document.getElementById("texto").innerText = "Começa Jogador 1";
    limparTabuleiro();
}