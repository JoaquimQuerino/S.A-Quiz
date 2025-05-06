const gabarito = {
    matematica: ["a", "a", "c", "d", "c", "d", "c", "b"],
    ciencias: ["a", "b", "c", "d", "a", "b", "c", "d"],
    historia: ["c", "c", "d", "d", "a", "b", "b", "a"],
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
    respostas = {}; // Resetar respostas ao mudar de matéria
    
    // Atualiza o título da prova
    provaTitulo.textContent = `Prova de ${titulo}`;
    
    // Atualiza o total de questões
    totalQuestoes.textContent = questoesAtuais.length;
    totalQuestoesResultado.textContent = questoesAtuais.length;
    
    // Esconde a tela de resultados se estiver visível
    resultadoContainer.style.display = "none";
    questaoContainer.style.display = "block";
    navegacao.style.display = "flex";
    
    // Exibe a primeira questão
    mostrarQuestao();
    
    // Mostra a tela da prova
    provaContainer.style.display = "block";
    
    // Desativa o scroll do body
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
      const letra = String.fromCharCode(97 + index); // a, b, c, d
      const selecionada = respostas[indiceQuestao] === letra ? 'selecionada' : '';
      
      alternativasHTML += `
        <div class="alternativa ${selecionada}" onclick="selecionarAlternativa('${letra}')">
          <div class="alternativa-letra">${letra})</div>
          <div class="alternativa-texto">${alternativa}</div>
        </div>
      `;
    });
    
    questaoAtual.innerHTML = `
      <h3>Questão ${indiceQuestao + 1}</h3>
      <p>${questao.pergunta}</p>
      <div class="alternativas">
        ${alternativasHTML}
      </div>
    `;
    
    // Atualiza o indicador de progresso
    questaoAtualNum.textContent = indiceQuestao + 1;
    
    // Habilita/desabilita os botões de navegação
    btnAnterior.disabled = indiceQuestao === 0;
    
    // Se for a última questão, mostra o botão finalizar em vez do próxima
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
    
    // Atualiza visualmente a alternativa selecionada
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
    // Esconde a tela de questões
    questaoContainer.style.display = "none";
    navegacao.style.display = "none";
    
    // Calcula resultados
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
    
    // Atualiza os dados na tela de resultados
    acertosTotal.textContent = acertos;
    resultadoDetalhes.innerHTML = detalhesHTML;
    
    // Mostra a tela de resultados
    resultadoContainer.style.display = "block";
  }
  
  function tentarNovamente() {
    // Reinicia o quiz com a mesma matéria
    respostas = {};
    indiceQuestao = 0;
    
    // Esconde a tela de resultados
    resultadoContainer.style.display = "none";
    
    // Mostra a tela de questões novamente
    questaoContainer.style.display = "block";
    navegacao.style.display = "flex";
    
    // Exibe a primeira questão
    mostrarQuestao();
  }
  function gerarQuestoes(materia) {
if (materia === "Matemática") {
  return [
    {
      pergunta: `Dois triângulos são semelhantes. O menor triângulo tem lados de 3 cm, 4 cm e 5 cm.
O maior triângulo é uma ampliação com razão 2. Quais são os lados do triângulo maior?`,
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
    }
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
      pergunta: `O que foi um dos motivos que causou a Primeira Guerra Mundial?`,
      alternativas: [
        "A criação de alianças entre países",
        "O crescimento dos países europeus",
        "O assassinato do arquiduque austríaco",
        "A construção do Muro de Berlim"
      ]
    },
    {
      pergunta: `O que deu início à Segunda Guerra Mundial?`,
      alternativas: [
        "A criação da ONU",
        "A independência dos EUA",
        "A invasão da Polônia pela Alemanha",
        "A construção do Muro de Berlim"
      ]
    },
    {
      pergunta: `Qual dos acontecimentos seguintes não teve relação com a Guerra Fria?`,
      alternativas: [
        "Guerra Civil Espanhola",
        "Guerra da Coreia",
        "Revolução Cubana",
        "Guerra do Afeganistão"
      ]
    },
    {
      pergunta: `Durante a Guerra Fria, qual país recebeu intervenção dos EUA que NÃO resultou em violência?`,
      alternativas: [
        "Afeganistão",
        "Coreia do Sul",
        "Vietnã",
        "Alemanha Ocidental"
      ]
    } 
    {   
      pergunta: `Selecione a alternativa que apresenta uma fase da Primeira Guerra Mundial.`, // falta foto 1a guerra
        alternativas: [
          "Guerra de Trincheiras",
          "Corrida Nuclear",
          "Guerra-relâmpago",
          "Derrota do Eixo"
        ]
      },
      {
        pergunta: `O ataque a ______ ocorreu em 7 de dezembro de 1941, quando o Japão bombardeou uma base naval dos ___  no Havaí. O ataque surpresa matou cerca de 2.400 pessoas e destruiu navios e aviões americanos. Como consequência, os EUA entraram na ________
complete com as palavras faltando`, //falta foto pearf harbor
        alternativas: [
          "Berlin, Alemanha, Guerra Fria",
          "Pearl Harbor, EUA, Segunda Guerra Mundial",
          "A invasão da Polônia pela AlemanhaPearl Harbor, alemães, Segunda Guerra Mundial",
          "America, EUA, Primeira Guerra Mundial"
        ]
      },
      {
        pergunta: `Dentre os conflitos que ocorreram por conta da disputa ideológica durante a Guerra Fria podemos citar:`, // falta foto charge
        alternativas: [
          "Revolução Francesa",
          "Revolução Cubana",
          "Guerra Russo-Japonesa",
          "Guerra Hispano-Americana"
        ]
      },
      {
        pergunta: ` leia o excerto abaixo e assinale a alternativa que preencha corretamente a lacuna.
Um exemplo de bloco econômico é o _________________________, criado a partir do Tratado de Assunção e assinado em 1991 entre Paraguai, Argentina, Uruguai e Brasil. O tratado estabeleceu a livre circulação de bens, serviços e fatores produtivos entre os países, através da eliminação das barreiras tarifárias e não tarifárias, e do estabelecimento de uma tarifa comum em relação aos países fora do bloco.`,
        alternativas: [
          "Mercado Comum do Sul (Mercosul)",
          "Mercado Comum da América Latina (Mercoal)",
          "Acordo de Livre Comércio da América do Norte (Nafta)",
          "Organização das Nações Unidas (ONU)"
        ]
      }
  ];
} else {
  // Genérico para outras matérias
  return Array.from({ length: 4 }, (_, index) => ({
    pergunta: `${materia} - Pergunta ${index + 1}: Esta é uma pergunta exemplo de ${materia.toLowerCase()}.`,
    alternativas: [
      `Alternativa A para ${materia}`,
      `Alternativa B para ${materia}`,
      `Alternativa C para ${materia}`,
      `Alternativa D para ${materia}`
    ]
  }));
}
  }