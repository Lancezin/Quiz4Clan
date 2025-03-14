// Obter o container principal
const quizContainer = document.getElementById("quiz-container");

// Estado do quiz
let quizState = {
  currentQuestion: 0,
  scores: {
    '@': 0, // Clã Natsuzumi
    '¥': 0, // Clã Reinhard
    '£': 0, // Clã Gooba
    '€': 0, // Clã Yateratsu
    '$': 0, // Clã Sereni
    'π': 0  // Clã Zenpak
  }
};

// Dados dos clãs com nome e URL do brasão
const clans = {
  '@': { name: "Natsuzumi", badge: "https://cdn.discordapp.com/attachments/1015790172966748203/1349563927729803344/58_Sem_Titulo_20250312230445.png?ex=67d4379a&is=67d2e61a&hm=d30515febf6dc6b8ea0da38324e0e6411fb74a5f17cd64d5fc5c453366cc31aa" },
  '¥': { name: "Reinhard", badge: "https://cdn.discordapp.com/attachments/1015790172966748203/1349576396527374366/61_Sem_Titulo_20250312235433.png?ex=67d44336&is=67d2f1b6&hm=697f3525ec5925a6eaf9ec909a369cedd75e62d277b043642221f4de662bc394" },
  '£': { name: "Gooba", badge: "https://cdn.discordapp.com/attachments/1015790172966748203/1349848086473740368/62_Sem_Titulo_20250313175239.png?ex=67d4977e&is=67d345fe&hm=ba72eca2687db2e12bce46550d98df61a4533075ef917801554b5ca444ea8a6f" },
  '€': { name: "Yateratsu", badge: "https://cdn.discordapp.com/attachments/1015790172966748203/1349856748978307102/63_Sem_Titulo_20250313182548.png?ex=67d49f90&is=67d34e10&hm=5d2e6b86c66e981b1173a65e122a67a9899069f3dc2a9e3f5cebcee00d430a8d" },
  '$': { name: "Sereni", badge: "https://cdn.discordapp.com/attachments/1015790172966748203/1349570968204611604/59_Sem_Titulo_20250312233124.png?ex=67d43e28&is=67d2eca8&hm=0ba37fd64e04fef10eb1064b652d51db93e8ea2b69e18b5031d20ddbc316aaeb" },
  'π': { name: "Zenpak", badge: "https://cdn.discordapp.com/attachments/1015790172966748203/1349874521255186472/64_Sem_Titulo_20250313193853.png?ex=67d4b01d&is=67d35e9d&hm=b476033fd4bcfee92c0d9cbc3c1c53735cdf4c2b8392bc76c6b87a553536f5f5" }
};

// Lista completa das 15 perguntas e respostas
const questions = [
  {
    question: "Durante um confronto, você avista um aliado caído no campo de batalha. Qual a sua reação?",
    answers: [
      { text: "Pauso para avaliar o risco e decidir a melhor estratégia.", clan: '$' },
      { text: "Ergo-o com cuidado e levo-o para abrigo.", clan: '@' },
      { text: "Permaneço inerte, sem demonstrar qualquer interesse.", clan: 'π' },
      { text: "Corro para longe, priorizando minha própria segurança.", clan: '£' },
      { text: "Volto com fúria para eliminar os inimigos que o cercam.", clan: '€' },
      { text: "Não me detenho – sigo a missão sem olhar para trás.", clan: '¥' }
    ]
  },
  {
    question: "Em meio a um tiroteio, você nota um companheiro gravemente ferido. O que faz?",
    answers: [
      { text: "Simplesmente não intervengo e sigo meu caminho.", clan: 'π' },
      { text: "Ignoro o ferido e continuo a avançar sem piedade.", clan: '¥' },
      { text: "Analiso a situação e organizo um resgate estratégico.", clan: '$' },
      { text: "Ofereço socorro imediato, mesmo sob fogo.", clan: '@' },
      { text: "Investo com violência contra os responsáveis pelo ataque.", clan: '€' },
      { text: "Abandono a área o mais rápido possível para salvar a minha vida.", clan: '£' }
    ]
  },
  {
    question: "Durante um cerco, um amigo é surpreendido por um grupo hostil. Como age?",
    answers: [
      { text: "Deixo-o para trás, pois fraquezas atrasam o progresso.", clan: '¥' },
      { text: "Lanço-me contra os inimigos com uma ira implacável.", clan: '€' },
      { text: "Observo a cena sem me envolver, sem alterar meu rumo.", clan: 'π' },
      { text: "Reviso rapidamente o cenário para encontrar uma solução segura.", clan: '$' },
      { text: "Corro para resgatá-lo, honrando nossa aliança.", clan: '@' },
      { text: "Fugir é minha única opção para não me arriscar.", clan: '£' }
    ]
  },
  {
    question: "Enquanto a batalha ruge, você ouve um grito de socorro vindo de um aliado em perigo. Qual é sua atitude?",
    answers: [
      { text: "Confronto com brutalidade os agressores, buscando vingança.", clan: '€' },
      { text: "Procuro a rota de fuga, evitando qualquer contato.", clan: '£' },
      { text: "Penso nas consequências e planejo uma intervenção tática.", clan: '$' },
      { text: "Deixo o clamor passar, sem demonstrar empatia.", clan: 'π' },
      { text: "Mantenho o foco no objetivo, dispensando pedidos de ajuda.", clan: '¥' },
      { text: "Atendo prontamente, oferecendo auxílio sem questionar.", clan: '@' }
    ]
  },
  {
    question: "Durante uma emboscada noturna, você vê um camarada isolado e vulnerável. O que faz?",
    answers: [
      { text: "Retiro-me imediatamente, não correndo riscos.", clan: '£' },
      { text: "Mantenho distância e não me incomodo com a fragilidade alheia.", clan: 'π' },
      { text: "Ignoro a situação e priorizo a execução da missão.", clan: '¥' },
      { text: "Rápido, corro ao seu lado para protegê-lo.", clan: '@' },
      { text: "Investo com extrema violência para virar o jogo a nosso favor.", clan: '€' },
      { text: "Avalio a situação para decidir se vale a pena o resgate.", clan: '$' }
    ]
  },
  {
    question: "No meio de um avanço arriscado, um aliado tropeça e cai. Qual será sua decisão?",
    answers: [
      { text: "Pauso para reavaliar e traçar um plano seguro de resgate.", clan: '$' },
      { text: "Revidar contra os inimigos se torna imperativo para mostrar força.", clan: '€' },
      { text: "Não me envolvo; cada um deve lidar com seu próprio destino.", clan: 'π' },
      { text: "Estendo a mão com compaixão e ajudo-o a levantar.", clan: '@' },
      { text: "Sigo adiante; comprometer a missão é inaceitável.", clan: '¥' },
      { text: "Não arrisco: fujo antes que a situação piore.", clan: '£' }
    ]
  },
  {
    question: "Em uma investida, você percebe que um companheiro foi alvejado por um tiro errado. Como reage?",
    answers: [
      { text: "Corro para socorrê-lo, colocando a vida em primeiro lugar.", clan: '@' },
      { text: "Fico impassível e sigo, sem que emoções me desviem.", clan: 'π' },
      { text: "Escapo sem olhar para trás, temendo por mim mesmo.", clan: '£' },
      { text: "Reviso rapidamente os riscos e determino a ação mais eficaz.", clan: '$' },
      { text: "Agarro a chance de revidar e desencadear minha fúria.", clan: '€' },
      { text: "Deixo-o para trás, pois distrações comprometem a vitória.", clan: '¥' }
    ]
  },
  {
    question: "Durante uma rota de fuga, você observa um aliado encurralado. Qual a sua escolha?",
    answers: [
      { text: "Mantenho-me distante, pois cada um deve cuidar de si.", clan: '¥' },
      { text: "Calculo a melhor manobra antes de tomar qualquer ação.", clan: '$' },
      { text: "Permito que o ocorrido siga seu curso sem minha intervenção.", clan: 'π' },
      { text: "Volto imediatamente para salvá-lo, demonstrando lealdade.", clan: '@' },
      { text: "Investo com extrema violência para virar o jogo a nosso favor.", clan: '€' },
      { text: "Corro para um refúgio seguro, sem me arriscar no resgate.", clan: '£' }
    ]
  },
  {
    question: "Em meio a um conflito, um companheiro é subitamente atacado por inimigos ocultos. Como age?",
    answers: [
      { text: "Lanço-me contra os inimigos com uma ira implacável.", clan: '€' },
      { text: "Assisto à cena com desinteresse, mantendo minha neutralidade.", clan: 'π' },
      { text: "Interviro de imediato, guiado pela honra e compaixão.", clan: '@' },
      { text: "Fugir é minha reação natural para preservar minha integridade.", clan: '£' },
      { text: "Paro para observar e arquitetar uma resposta eficaz.", clan: '$' },
      { text: "Avanço sem parar, considerando o sacrifício um peso desnecessário.", clan: '¥' }
    ]
  },
  {
    question: "Durante um confronto intenso, você nota que um aliado foi surpreendido por um golpe traiçoeiro. Qual é sua resposta?",
    answers: [
      { text: "Saio correndo, evitando ser pego na confusão.", clan: '£' },
      { text: "Analiso o campo de batalha e ajusto o plano conforme necessário.", clan: '$' },
      { text: "Sigo adiante sem hesitar, pois não posso me atrasar.", clan: '¥' },
      { text: "Não reajo, permanecendo indiferente ao drama alheio.", clan: 'π' },
      { text: "Desencadeio um ataque brutal contra os responsáveis.", clan: '€' },
      { text: "Volto imediatamente para ampará-lo com dedicação.", clan: '@' }
    ]
  },
  {
    question: "Enquanto lidera seu grupo, você presencia um aliado ser alvejado por um disparo traiçoeiro. O que decide?",
    answers: [
      { text: "Interviro para curar e proteger, sem medir riscos.", clan: 'π' },
      { text: "Reviso os fatos e calculo a melhor ação de resgate.", clan: '$' },
      { text: "Deixo o incidente para trás, mantendo o foco na estratégia.", clan: '¥' },
      { text: "Simplesmente não intervini – o risco já estava feito.", clan: '@' },
      { text: "Evito o confronto e procuro escapar rapidamente.", clan: '£' },
      { text: "Transformo a situação em um pretexto para punir com violência.", clan: '€' }
    ]
  },
  {
    question: "Durante um ataque relâmpago, um amigo clama por socorro, mas a situação é caótica. Qual sua atitude?",
    answers: [
      { text: "Recuso-me a ser atrasado; a missão não pode esperar.", clan: '¥' },
      { text: "Fico alheio à confusão, sem qualquer intenção de intervir.", clan: 'π' },
      { text: "Acredito na honra e corro para oferecer ajuda, custe o que custar.", clan: '@' },
      { text: "Meu instinto é fugir, evitando o risco de ser envolvido.", clan: '£' },
      { text: "Refleto rapidamente e decido a melhor forma de agir sem comprometer a tática.", clan: '$' },
      { text: "Vejo nisso uma oportunidade para desferir meu castigo contra os inimigos.", clan: '€' }
    ]
  },
  {
    question: "Em meio ao tumulto de uma batalha campal, você nota um aliado sendo cercado por inimigos. Como reage?",
    answers: [
      { text: "Procuro me afastar do perigo, sem olhar para trás.", clan: '£' },
      { text: "Ajo com coragem e resgato-o, reafirmando nossa aliança.", clan: '@' },
      { text: "Observando atentamente, traço um plano para uma intervenção segura.", clan: '$' },
      { text: "Permano inerte, sem me envolver em dramas alheios.", clan: 'π' },
      { text: "Considero o resgate secundário e avanço com frieza calculada.", clan: '¥' },
      { text: "Desencadeio um contra-ataque feroz para dispersar os agressores.", clan: '€' }
    ]
  },
  {
    question: "Enquanto atravessa uma zona de conflito, você vê um aliado ser surpreendido por uma emboscada. Qual a sua decisão?",
    answers: [
      { text: "Lanço-me com fúria para desbaratar a emboscada inimiga.", clan: '€' },
      { text: "Mantenho o foco na missão e deixo-o para resolver seu próprio destino.", clan: '¥' },
      { text: "Ignoro o incidente, permanecendo distante e desapegado.", clan: 'π' },
      { text: "Recuo para evitar ser capturado na mesma cilada.", clan: '£' },
      { text: "Dou prioridade à vida do amigo, resgatando-o com afeto.", clan: '@' },
      { text: "Pauso para estudar o cenário e definir a melhor estratégia de resgate.", clan: '$' }
    ]
  },
  {
    question: "Durante uma investida arriscada, um aliado é surpreendido e fica desorientado. Como você reage?",
    answers: [
      { text: "Reavalio o terreno e aplico uma solução tática para contornar a crise.", clan: '$' },
      { text: "Fugi para garantir minha própria sobrevivência, sem olhar para trás.", clan: '£' },
      { text: "Sigo sem hesitar, pois atrasos podem custar a vitória.", clan: '¥' },
      { text: "Mantenho minha postura fria, sem qualquer intenção de me envolver.", clan: 'π' },
      { text: "Rápido, volto para auxiliá-lo, honrando nosso compromisso.", clan: '@' },
      { text: "Transformo o caos em oportunidade para revidar com brutalidade.", clan: '€' }
    ]
  }
];

// Função para exibir a tela de abertura
function showStartScreen() {
  quizContainer.innerHTML = `
    <h1>Iniciação para o clã</h1>
    <p>Estas perguntas são para definir qual clã você se encontra. Suas opiniões devem ser 100% sinceras. Basta responder qual das respostas mais te representam, simples.</p>
    <button id="start-btn">Iniciar</button>
  `;
  document.getElementById("start-btn").addEventListener("click", startQuiz);
}

// Inicia o quiz
function startQuiz() {
  quizState.currentQuestion = 0;
  // Zera os pontos
  for (let key in quizState.scores) {
    quizState.scores[key] = 0;
  }
  showQuestion();
}

// Exibe a pergunta atual e as respostas como botões
function showQuestion() {
  if (quizState.currentQuestion < questions.length) {
    const current = questions[quizState.currentQuestion];
    let answersHTML = "";
    current.answers.forEach(ans => {
      answersHTML += `<button class="answer-btn" data-clan="${ans.clan}">${ans.text}</button>`;
    });
    quizContainer.innerHTML = `
      <h2>Pergunta ${quizState.currentQuestion + 1} de ${questions.length}</h2>
      <p>${current.question}</p>
      <div id="answers">${answersHTML}</div>
    `;
    // Adiciona evento de clique em cada resposta
    document.querySelectorAll(".answer-btn").forEach(btn => {
      btn.addEventListener("click", function() {
        handleAnswer(this.getAttribute("data-clan"));
      });
    });
  } else {
    showResult();
  }
}

// Incrementa a pontuação do clã selecionado e avança para a próxima pergunta
function handleAnswer(clan) {
  quizState.scores[clan]++;
  quizState.currentQuestion++;
  showQuestion();
}

// Determina o clã com maior pontuação e exibe o resultado
function showResult() {
  let maxPoints = -1;
  let clanWinner = "";
  for (let key in quizState.scores) {
    if (quizState.scores[key] > maxPoints) {
      maxPoints = quizState.scores[key];
      clanWinner = key;
    }
  }
  const winnerData = clans[clanWinner];
  
  quizContainer.innerHTML = `
    <h2>Seu clã é: ${winnerData.name}</h2>
    <img src="${winnerData.badge}" alt="Brasão do clã ${winnerData.name}" width="150">
    <br><br>
    <input type="text" id="warrior-name" placeholder="Qual o nome do guerreiro/a?">
    <br>
    <button id="create-frame">Criar moldura</button>
    <div id="frame-container"></div>
  `;
  
  document.getElementById("create-frame").addEventListener("click", function() {
    createMoldura(winnerData);
  });
}

// Cria a moldura com fundo cinza, exibindo o nome, o brasão e o nome do clã.
// Adiciona também o botão "Baixar moldura" abaixo.
function createMoldura(winnerData) {
  const name = document.getElementById("warrior-name").value || "Guerreiro/a";
  const frameContainer = document.getElementById("frame-container");
  frameContainer.innerHTML = `
    <div class="moldura" id="moldura">
      <h3>${name}</h3>
      <img src="${winnerData.badge}" alt="Brasão do clã ${winnerData.name}" width="150" crossOrigin="anonymous">
      <p>${winnerData.name}</p>
    </div>
    <br>
    <button id="download-frame">Baixar moldura</button>
  `;
  
  document.getElementById("download-frame").addEventListener("click", downloadMoldura);
}

// Usa html2canvas para capturar a moldura e gerar o download da imagem
function downloadMoldura() {
  const molduraElem = document.getElementById("moldura");
  html2canvas(molduraElem).then(canvas => {
    // Cria o link para download
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "moldura.png";
    link.click();
  });
}

// Inicia o app exibindo a tela de abertura
showStartScreen();
