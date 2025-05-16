const gabarito = {
    matematica: ["a", "a", "c", "d", "c", "d", "c", "b"],
    ciencias: ["a", "b", "c", "d", "a", "b", "c", "d"],
    historia: ["b", "c", "d", "a", "c", "d", "b", "a"],
    portugues: ["c", "d", "a", "b", "c", "d", "a", "b"]
};

const materias = {
    matematica: gerarQuestoes("Matemática"),
    ciencias: gerarQuestoes("Ciências da Natureza"),
    historia: gerarQuestoes("Ciências Humanas"),
    portugues: gerarQuestoes("Linguagens")
};

const provaContainer = document.getElementById("provaContainer");
const questaoAtual = document.getElementById("questaoAtual");
const provaTitulo = document.getElementById("provaTitulo");
const btnAnterior = document.getElementById("btnAnterior");
const btnProxima = document.getElementById("btnProxima");
const btnFinalizar = document.getElementById("btnFinalizar");
const questaoAtualNum = document.getElementById("questaoAtualNum");
const totalQuestoes = document.getElementById("totalQuestoes");
const resultadoContainer = document.getElementById("resultadoContainer");
const questaoContainer = document.querySelector(".questao-container");
const navegacao = document.querySelector(".navegacao");
const acertosTotal = document.getElementById("acertosTotal");
const totalQuestoesResultado = document.getElementById("totalQuestoesResultado");
const resultadoDetalhes = document.getElementById("resultadoDetalhes");

let questoesAtuais = [];
let indiceQuestao = 0;
let materiaAtual = '';
let respostas = {};

function selecionarMateria(materia, titulo) {
    materiaAtual = materia;
    questoesAtuais = materias[materia];
    indiceQuestao = 0;
    respostas = {};
    
    provaTitulo.textContent = `Prova de ${titulo}`;
    totalQuestoes.textContent = questoesAtuais.length;
    totalQuestoesResultado.textContent = questoesAtuais.length;
    
    resultadoContainer.style.display = "none";
    questaoContainer.style.display = "block";
    navegacao.style.display = "flex";
    
    mostrarQuestao();
    provaContainer.style.display = "block";
    document.body.style.overflow = "hidden";
}

function fecharProva() {
    provaContainer.style.display = "none";
    document.body.style.overflow = "auto";
}

function mostrarQuestao() {
    const questao = questoesAtuais[indiceQuestao];
    let alternativasHTML = '';
    
    questao.alternativas.forEach((alternativa, index) => {
        const letra = String.fromCharCode(97 + index);
        const selecionada = respostas[indiceQuestao] === letra ? 'selecionada' : '';
        
        alternativasHTML += `
            <div class="alternativa ${selecionada}" onclick="selecionarAlternativa('${letra}')">
                <div class="alternativa-letra">${letra})</div>
                <div class="alternativa-texto">${alternativa}</div>
            </div>
        `;
    });
    
    const imagemHTML = questao.imagem 
        ? `<div class="questao-imagem-container"><img src="${questao.imagem}" alt="Imagem da questão" class="questao-imagem"></div>`
        : '';
    
    questaoAtual.innerHTML = `
        <h3>Questão ${indiceQuestao + 1}</h3>
        ${imagemHTML}
        <p>${questao.pergunta}</p>
        <div class="alternativas">
            ${alternativasHTML}
        </div>
    `;
    
    questaoAtualNum.textContent = indiceQuestao + 1;
    btnAnterior.disabled = indiceQuestao === 0;
    
    if (indiceQuestao === questoesAtuais.length - 1) {
        btnProxima.style.display = "none";
        btnFinalizar.style.display = "block";
    } else {
        btnProxima.style.display = "block";
        btnFinalizar.style.display = "none";
    }
}

function selecionarAlternativa(letra) {
    respostas[indiceQuestao] = letra;
    
    const alternativas = document.querySelectorAll('.alternativa');
    alternativas.forEach(alt => {
        alt.classList.remove('selecionada');
        if (alt.querySelector('.alternativa-letra').textContent.startsWith(letra)) {
            alt.classList.add('selecionada');
        }
    });
}

btnAnterior.addEventListener("click", () => {
    if (indiceQuestao > 0) {
        indiceQuestao--;
        mostrarQuestao();
    }
});

btnProxima.addEventListener("click", () => {
    if (indiceQuestao < questoesAtuais.length - 1) {
        indiceQuestao++;
        mostrarQuestao();
    }
});

btnFinalizar.addEventListener("click", () => {
    mostrarResultados();
});

function mostrarResultados() {
    questaoContainer.style.display = "none";
    navegacao.style.display = "none";
    
    const respostasMaterias = gabarito[materiaAtual];
    let acertos = 0;
    let detalhesHTML = '';
    
    for (let i = 0; i < questoesAtuais.length; i++) {
        const respostaUsuario = respostas[i] || "-";
        const respostaCorreta = respostasMaterias[i];
        const correto = respostaUsuario === respostaCorreta;
        
        if (correto) acertos++;
        
        detalhesHTML += `
            <div class="resultado-item">
                <div>Questão ${i + 1}:</div>
                <div class="resultado-resposta ${correto ? 'correto' : 'incorreto'}">
                    Sua resposta: ${respostaUsuario.toUpperCase() || "-"} | 
                    Correta: ${respostaCorreta.toUpperCase()} | 
                    ${correto ? 'ACERTO' : 'ERRO'}
                </div>
            </div>
        `;
    }
    
    acertosTotal.textContent = acertos;
    resultadoDetalhes.innerHTML = detalhesHTML;
    resultadoContainer.style.display = "block";
}

function tentarNovamente() {
    respostas = {};
    indiceQuestao = 0;
    resultadoContainer.style.display = "none";
    questaoContainer.style.display = "block";
    navegacao.style.display = "flex";
    mostrarQuestao();
}
  function gerarQuestoes(materia) {
if (materia === "Matemática") {
  return [
    {
      pergunta: `Dois triângulos são semelhantes. O menor triângulo tem lados de 3 cm, 4 cm e 5 cm.
O maior triângulo é uma ampliação com razão 2. Quais são os lados do triângulo maior?`,
imagem: "/fotosS.A/semelhanca-triangulos-sem.png",
      alternativas: [
        "6 cm, 8 cm e 10 cm", 
        "225 cm, 6 cm e 8 cm", 
        "9 cm, 12 cm e 15 cm", 
        "2 cm, 4 cm e 6 cm"
      ]
    },
    {
      pergunta: `Uma sacola tem 3 bolas vermelhas e 2 bolas azuis. Qual a probabilidade de tirar uma bola vermelha?`,
      alternativas: ["3/5", "1/3", "2/3", "4/5"]
    },
    {
      pergunta: `Qual a raiz quadrada de 9?`,
      alternativas: ["90", "81", "3", "1"]
    },
    {
      pergunta: `Quanto é 11 elevado ao quadrado?`,
      alternativas: ["110", "91", "100", "121"]
    },
    {
        pergunta: `Se um triângulo menor tem lados 3 cm, 4 cm e 5 cm, e outro triângulo semelhante tem lado maior de 15 cm, qual é a razão de semelhança?`,
        alternativas: [
          "1", 
          "4", 
          "3", 
          "2"
        ]
      },
      {
        pergunta: `Em um pote tem 5 bolachas de chocolate, 3 bolachas de leite e 2 bolachas de morango, Qual a chance de pegar uma bolacha que não é de morango?`,
        alternativas: ["5/10", "2/10", "6/10", "8/10"]
      },
      {
        pergunta: `Descubra o Valor de X em: x + 4 = 7`,
        alternativas: ["1", "4", "3", "7"]
      },
      {
        pergunta: `Se X=3, Descubra o resultado da equação: 2x + 10 = ?`,
        alternativas: ["14", "16", "12", "121"]
      }
  ];
} else if (materia === "Ciências Humanas") {
  return [
    {
      pergunta: `A Lei Áurea citada acima fala sobre:`,
      imagem: "/fotosS.A/LeiAurea.png",
      alternativas: [
        "Aumento dos impostos no Brasil",
        "Abolição da escravatura",
        "Declaração da independência do Brasil",
        "Morte de Dom Pedro II"
      ]
    },
    {
      pergunta: `______  foi o segundo e último imperador do Brasil, governando de 1831 a 1889. assumiu o trono ainda criança após a abdicação do pai, sendo declarado maior de idade aos 15 anos para iniciar seu reinado. Durante seu governo, melhorou a educação, ciência e infraestrutura, além de acabar escravidão com a Lei Áurea. mas acabou deposto em 1889 com a Proclamação da República, passando o restante da vida na Europa.
Complete com o nome desta figura histórica.`,
imagem: "/fotosS.A/DomPedro2", 
      alternativas: [
        "Napoleão Bonaparte",
        "Albert Einstein",
        "Dom Pedro II",
        "Pedro Alvares Cabral"
      ]
    },
    {
      pergunta: `Na América Latina, existem diferentes formas de liderança política. O patrimonialismo acontece quando um governante usa o dinheiro público como se fosse dele.\n
Qual dessas situações é um exemplo de patrimonialismo?`,
      alternativas: [
        "Um presidente que faz discursos para ouvir o povo.",
        "Um líder que decide tudo sozinho.",
        "Um grupo que luta por direitos no trabalho.",
        "Um governante que usa dinheiro público para ajudar amigos e familiares."
      ]
    },
    {
      pergunta: `John Locke foi um filósofo do século XVII, defensor do empirismo e do liberalismo político. Acreditava que o governo deve existir para garantir que os cidadãos possuam direitos a vida, liberdade e propriedade. Suas ideias influenciaram a democracia moderna.
Qual é a principal função do Estado, segundo John Locke?`,
imagem: "/fotosS.A/JohnLocke.png",
      alternativas: [
        "Garantir a liberdade e o direito à propriedade com base nas leis.",
        "Exercer controle absoluto sobre a sociedade para evitar conflitos.",
        "Eliminar completamente o egoísmo humano por meio da educação.",
        "Substituir a propriedade privada pela propriedade coletiva."
      ]
    }, 
    {   
      pergunta: ` A Revolução Industrial teve início na Inglaterra, no final do século XVIII, e marcou uma grande transformação na forma de produção, trocando o trabalho manual pelo uso de máquinas. Esse processo trouxe grandes mudanças sociais, econômicas e tecnológicas, como a chegada das fábricas, o crescimento das cidades e o aumento da produção em escala.
Qual foi uma das principais consequências da Revolução Industrial?`,
      imagem: "/fotosS.A/RevolucaoIndustrial.png",
        alternativas: [
          "Parou o comércio entre países",
          "A volta do trabalho artesanal",
          "O crescimento da produção e o surgimento de indústrias",
          "A diminuição no uso de máquinas na indústria"
        ]
      },
      {
        pergunta: ` Linha do Tempo - Qual das alternativas passa a ordem dos acontecimentos do Séc XX de forma correta`,
        imagem:  "/fotosS.A/LinhaDoTempo.png",
        alternativas: [
          "Primeira Guerra Mundial - Guerra Fria - Revolução Russa - Segunda Guerra Mundial",
          "Guerra Fria - Revolução Russa - Segunda Guerra Mundial - Primeira Guerra Mundial",
          "Revolução Russa - Primeira Guerra Mundial - Segunda Guerra Mundial - Guerra Fria",
          "Primeira Guerra Mundial - Revolução Russa - Segunda Guerra Mundial - Guerra Fria"
        ]
      },
      {
        pergunta: `Imagine que alguns países são como times de futebol. Sozinhos, é mais difícil competir com os times mais fortes. Então, eles se juntam para formar uma equipe mais forte. Isso acontece com os países em grupos chamados blocos econômicos. Assim, eles conseguem trocar produtos, viajar e crescer juntos de forma mais facil.\n
        O que é um bloco econômico?`,
        alternativas: [
          "Um grupo de países que não se relacionam.",
          "Um grupo de países que se unem para facilitar o comércio e se desenvolverem .",
          "Um país sozinho que quer dominar os outros.",
          " Um aglomerado de países que não se ajudam."
        ]
      },
      {
        pergunta: `Hoje em dia, é comum usar roupas feitas em outros países, comer comidas de fora e assistir filmes de várias partes do mundo. Isso acontece por causa da globalização, que é quando os países ficam mais conectados e trocam produtos, ideias e culturas com mais facilidade.\n
        De acordo com o texto, o que é globalização?`,
        imagem:  "/fotosS.A/MundoGlobalizado.png",
        alternativas: [
          "Quando os países se juntam para trocarem produtos, informações e culturas.",
          "Quando os países ficam mais fechados e não trocam nada.",
          "Quando as pessoas viajam apenas dentro do seu próprio país.",
          "Quando todos os países falam a mesma língua."
        ]
      }
  ];
} else if (materia === "Linguagens") {
  return [
    {
      pergunta: `O verbo é uma classe de palavras que ditam ações, com base nisso, leia a frase: \n
      Ana pinta um desenho.\n
      Qual é o verbo da frase?`,
      alternativas: [
        "Ana",
        "Desenho",
        "Pinta",
        "Um"
      ]
    },
    {
      pergunta: `O verbo é uma classe de palavras que ditam ações, com base nisso, leia a frase: \n
      Lucas chutou uma bola ontem. \n
      Qual palavra mostra a ação?`,
      alternativas: [
        "Lucas",
        "Bola",
        "A",
        "Chutou"
      ]
    },
    {
      pergunta: ` O sujeito é quem faz uma ação, e o adjetivo é uma palavra que descreve o sujeito, com base nisso, leia a frase:\n
O cachorro pequeno corre no quintal.\n
Qual o sujeito e o adjetivo da frase? `,
      alternativas: [
        "Cachorro e Pequeno",
        "Cachorro e Quintal",
        "Pequeno e Quintal",
        "Quintal e Pequeno"
      ]
    },
    {
      pergunta: `O sujeito é quem faz uma ação, e o adjetivo é uma palavra que descreve o sujeito, com base nisso, leia a frase:\n
A menina alegre canta uma música.\n
Qual o sujeito e o adjetivo da frase?`,
      alternativas: [
        "Música e Alegre",
        "Menina e Alegre",
        "Menina e Música",
        "Alegre e Menina"
      ]
    }, 
    {   
      pergunta: `Leia o exemplo com atenção:\n
      O cachorro está debaixo da cadeira.\n
      A palavra "debaixo" mostra a posição do cachorro.\n
      Essa palavra é chamada de preposição.\n
      Agora complete a frase:\n
      O caderno está ______ mochila.`,
        alternativas: [
          "Para",
          "Com",
          "Na",
          "De"
        ]
      },
      {
        pergunta: `I. Ele é especialista _____ comunicação e marketing.\n
        II. Comprei a passagem de ônibus _____ 20 reais.\n
        III. Estamos _____ 5 km de Manaus.\n
        As preposições que preenchem corretamente as lacunas são:`, 
        alternativas: [
          "em, por, a",
          "de, por, há",
          "de, a, em",
          "em, a, desde"
        ]
      },
      {
        pergunta: `Lucas queria brincar, mas começou a chover.\n
        A palavra "mas" junta duas ideias diferentes:\n
        Essa palavrinha é chamada de conjunção.\n
        Agora complete a frase:\n
        Ana estava com sono, ______ continuou estudando.`,
        alternativas: [
          "E",
          "Porém",
          "Porque",
          "Ou"
        ]
      },
      {
        pergunta: `Pedro precisa escolher um lápis ou uma borracha.
        A palavra "uma" junta duas coisas parecidas.
        Essa palavrinha é uma conjunção.
        Agora complete a frase:
        Joana gosta de maçã ______ banana.`,
        alternativas: [
          "Também",
          "Mas",
          "Porque",
          "E"
        ]
      }
  ];
 } else  {
  return [
    {
      pergunta: `Pense em um campo com grama, gafanhotos e sapos. A grama serve de alimento para o gafanhoto, e o gafanhoto serve de alimento para o sapo. Isso é uma cadeia alimentar: uma sequência de quem caça quem na natureza.\n
Na cadeia alimentar, o que acontece com a energia?`,
      alternativas: [
        "Ela é passada de um ser vivo para outro.",
        "Ela desaparece no ar.",
        "Ela só existe nas plantas.",
        "Ela só aparece durante a noite."
      ]
    },
    {
      pergunta: ` Imagine um rio limpo onde vivem peixes, plantas aquáticas e outros animais. Um dia, lixo é jogado no rio e a água fica suja. Os peixes começam a morrer e o ambiente muda.\n
 O que pode acontecer quando o ser humano joga lixo na natureza?`,
      alternativas: [
        "As plantas comem o lixo e ficam mais fortes.",
        "O ambiente fica poluído e os seres vivos podem ser prejudicados.",
        "Nada, pois não afeta os animais.",
        "A água fica colorida e bonita."
      ]
    },
    {
      pergunta: `Observe a imagem do ecossistema da lagoa. Ela mostra animais como peixes, patos, sapos, insetos, plantas aquáticas e outros seres vivos que vivem juntos e interagem na água e ao redor dela.
 Com base na imagem, o que podemos dizer sobre o ecossistema da lagoa?`,
 imagem:  "/fotosS.A/EcoSistema.png",
      alternativas: [
        "É formado apenas por animais que não precisam um do outro.",
        "É um lugar com os mesmos animais que se ajudam.",
        "É um lugar onde vivem diferentes seres vivos que dependem uns dos outros.",
        "É um espaço com pouca biodiversidade."
      ]
    },
    {
      pergunta: ` A química orgânica é a parte da química que estuda os compostos que contêm carbono. Esses compostos estão presentes em alimentos, combustíveis, plásticos e até no nosso corpo.\n
O átomo de carbono é especial pois pode se ligar com vários átomos, formando cadeias e moléculas variadas.\n
O que caracteriza os compostos estudados na química orgânica?`,
      alternativas: [
        "São todos formados apenas por metais e gases nobres.",
        "São moléculas simples encontradas apenas em laboratórios.",
        "São compostos que não se relacionam com seres vivos nem com o meio ambiente.",
        "São formados principalmente por átomos de carbono e costumam formar cadeias com outros elementos",
      ]
    }, 
    {   
      pergunta: `Observe a imagem acima e a classifique como:\n
Simples (sem ramificações) ou Ramificada (com um pedaço saindo para o lado),\n
Aberta (como uma linha) ou Fechada (como um anel ou círculo).\n
Essa cadeia carbônica é:`,
      imagem:  "/fotosS.A/CadeiaCarbonica.png",
        alternativas: [
          "Aberta, Simples",
          "Aberta, ramificada",
          "Fechada, ramificada",
          "Fechada, Simples"
        ]
      },
      {
        pergunta: `Observe a imagem acima e a classifique como:\n
Aberta (como uma linha) ou Fechada (como um anel ou círculo).\n
Saturada (com ligações simples) ou Insaturada (com ligações duplas ou triplas).\n
Essa cadeia carbônica é:`,
        imagem:  "/fotosS.A/CadeiaCarbonicafechada.png",
        alternativas: [
          "Aberta, Saturada",
          "Fechada, Insaturada",
          "Aberta, Insaturada",
          "Fechada, Saturada"
        ]
      },
      {
        pergunta: `Os principais fenômenos de ondas são:\n
Reflexão: a onda bate e volta (como o eco).\n
Refração: a onda muda de direção e velocidade.\n
Difração: a onda contorna obstáculos.\n
Interferência: duas ondas se encontram.\n
O que acontece com uma onda quando ela muda de meio e muda sua velocidade?`, 
        alternativas: [
          "Reflexão",
          "Difração",
          "Refração",
          "Interferência"
        ]
      },
      {
        pergunta: `As ondas podem se mover de diferentes formas. Algumas precisam de um meio (como água ou ar), outras não.\n
Ondas mecânicas: precisam de um meio (como o som).\n
Ondas eletromagnéticas: não precisam de um meio (como luz, raio-X).\n
Qual das alternativas está correta sobre as ondas?`,
        alternativas: [
          "O som é uma onda que pode viajar no vácuo",
          "A luz precisa de um meio material para se propagar.",
          "As ondas na água não se propagam.",
          "O som é uma onda mecânica e não se propaga no vácuo."
        ]
      }
  ];
}
  }