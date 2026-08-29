// Lista de Palavras

const listaPalavras = [ "Amor", "Fé", "Graça", "Paz", "Esperança", "Salvação", "Perdão", "Misericórdia",
  "Justiça", "Verdade", "Sabedoria", "Oração", "Jejuar", "Adoração", "Louvor",
  "Igreja", "Profeta", "Apóstolo", "Discípulo", "Messias", "Cristo", "Jesus",
  "Deus", "Senhor", "Criador", "Espírito", "Santo", "Evangelho", "Escritura",
  "Bíblia", "Aliança", "Promessa", "Mandamento", "Milagre", "Parábola", "Benção",
  "Sacrifício", "Redenção", "Ressurreição", "Gênesis", "Apocalipse", "Salmo",
  "Provérbio", "Anjo", "Querubim", "Serafim", "Éden", "Jerusalém", "Templo", "Fidelidade"];

let palavraEscolhida;
let exibicaoPalavra;
let letrasChutadas;
let tentativasRestantes;
let numeroErros;

//==== Função Para Iniciar o Jogo===
function iniciarJogo(){
    //===ESCOLHER UMA PALAVRA ALEATORIA DA LISTA===
    palavraEscolhida = listaPalavras[Math.floor(Math.random()*listaPalavras.length)];
console.log(palavraEscolhida)
    //==INICIALIZAR A EXIBIÇÃO COM UNDERSCORES "_" ===
    exibicaoPalavra = Array(palavraEscolhida.length).fill("_");
    console.log(exibicaoPalavra);

    //INICIALIZAR A LISTA DE PALAVRAS CHUTADAS==
    letrasChutadas = [];

    //DEFINIR O NUMERO MAXIMO DE TENTATIVAS ===
    tentativasRestantes = 7;

    //INICIALIZA O NUMERO DE ERROS==
    numeroErros = 0;

    //HABILITAR O CAMPO DE ENTRADA==
    document.getElementById('entrada-letra').disabled = false;
    document.getElementById('entrada-letra').value = '';

    //LIMPAR MENSAGEM E BOTÃO==
    document.getElementById('mensagem').classList.remove('mostrar');
    document.getElementById('botao-reiniciar').classList.remove('mostrar');

    atualizarExibicao();

    }

    function atualizarExibicao(){

        document.getElementById("exibicao-palavra").innerText = exibicaoPalavra.join(' ');
        document.getElementById("letras-chutadas").innerText = `${letrasChutadas.join(', ')}`;

        document.getElementById("imagem").src = `assets/forca${numeroErros}.png`;
        
        //VERIFICAR SE O JOGO TERMINOU==
        if(tentativasRestantes ===0){
            encerrarJogo('VOCÊ MORREU!');
        }else if(!exibicaoPalavra.includes('_')){
            encerrarJogo('Parabéns! Você VENCEU!');
        }
    }

    function chutarLetra(){

        const entradaLetra = document.getElementById('entrada-letra');
        const letra = entradaLetra.value.toLowerCase();

        if(!letra.match(/[a-zà-ùç]/i)){
            alert('Por Favor,insira uma letra Válida.');
            return;
        }

        if(letrasChutadas.includes(letra)){
            alert('Voçê Já tentou está letra. Tente outra.');
            return;
        }

        letrasChutadas.push(letra);

        if(palavraEscolhida.includes(letra)){
           for(let i=0; i< palavraEscolhida.length; i++){
               if(palavraEscolhida[i] === letra){
                   exibicaoPalavra[i] = letra;
               }
           }

        }else{
            tentativasRestantes--;
            numeroErros++;
        }

        entradaLetra.value = '';

        atualizarExibicao();

    }  

    function encerrarJogo(mensagem) {
        //DESABILITAR O CAMPO DE DIGITAÇÃO==
        document.getElementById('entrada-letra').disabled = true;

        //EXIBIR A MENSAGEM==
        const msgElement = document.getElementById('mensagem');
        msgElement.innerText = mensagem;
        msgElement.classList.add('mostrar');

        //EXIBIR O BOTÃO REINICIAR==
        document.getElementById('botao-reiniciar').classList.add('mostrar');
    }

    window.onload = iniciarJogo;