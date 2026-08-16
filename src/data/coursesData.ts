import { CourseTrack, Achievement, ShopItem, DailyQuest, LeaderboardUser } from '../types';

export const COURSES: CourseTrack[] = [
  {
    id: 'logica',
    name: 'Lógica & Algoritmos',
    slug: 'logica-programacao',
    tagline: 'O Despertar do Pensamento Computacional',
    description: 'Aprenda os pilares de como computadores pensam: variáveis, decisões lógicas, repetições e algoritmos sem medo de sintaxe.',
    icon: 'Brain',
    color: 'amber',
    accentBg: 'from-amber-500/20 to-orange-500/10',
    level: 'Iniciante',
    estimatedHours: 6,
    modules: [
      {
        id: 'mod-log-1',
        title: 'Módulo 1: O Cofre das Variáveis',
        theme: 'Fundamentos & Memória',
        description: 'Descubra como guardar informações na memória como números, textos e valores verdadeiros.',
        icon: 'Box',
        badgeName: 'Mestre da Memória',
        lessons: [
          {
            id: 'les-log-1',
            title: '1. O que é uma Variável?',
            shortDescription: 'Uma caixinha com etiqueta para guardar valores.',
            icon: 'Sparkles',
            xpReward: 25,
            coinReward: 10,
            exercises: [
              {
                id: 'ex-log-1-1',
                type: 'multiple_choice',
                question: 'Imagine que uma variável é uma gaveta com uma etiqueta. Se colocamos o número 10 na gaveta "pontos", o que acontece quando pedimos o valor de "pontos"?',
                options: [
                  { id: 'a', text: 'A gaveta explode', isCorrect: false },
                  { id: 'b', text: 'Recebemos o número 10', isCorrect: true, explanation: 'Correto! A variável guarda o valor atribuído até que alguém o altere.' },
                  { id: 'c', text: 'Recebemos 0', isCorrect: false },
                  { id: 'd', text: 'O computador desliga', isCorrect: false }
                ],
                explanation: 'Variáveis são identificadores que guardam dados na memória do computador para usarmos depois.',
                tip: 'Pense nelas como caixas etiquetadas onde você guarda seus itens de jogo.',
                xpReward: 10
              },
              {
                id: 'ex-log-1-2',
                type: 'fill_blank',
                question: 'Complete a declaração da variável para guardar a idade do herói:',
                instruction: 'Clique nas opções para preencher o espaço em branco.',
                templateCode: 'idade = ____',
                blankTokens: ['18', 'if', 'while', 'somar'],
                correctTokens: ['18'],
                explanation: 'Muito bem! "idade = 18" atribui o valor numérico 18 à variável idade.',
                xpReward: 15
              },
              {
                id: 'ex-log-1-3',
                type: 'multiple_choice',
                question: 'Qual desses tipos de dados representa um texto (conhecido como String)?',
                codeSnippet: 'item1 = 42\nitem2 = "Espada de Fogo"\nitem3 = True',
                options: [
                  { id: 'a', text: 'item1 (número)', isCorrect: false },
                  { id: 'b', text: 'item2 ("Espada de Fogo")', isCorrect: true, explanation: 'Textos em programação são delimitados por aspas (" ") e chamados de Strings!' },
                  { id: 'c', text: 'item3 (booleano)', isCorrect: false }
                ],
                explanation: 'Qualquer texto entre aspas simples ou duplas é uma String.',
                xpReward: 15
              }
            ]
          },
          {
            id: 'les-log-2',
            title: '2. Operações e Cálculos',
            shortDescription: 'Somando, subtraindo e multiplicando valores.',
            icon: 'Calculator',
            xpReward: 30,
            coinReward: 12,
            exercises: [
              {
                id: 'ex-log-2-1',
                type: 'order_blocks',
                question: 'Ordene as instruções para calcular o dano total do ataque:',
                instruction: 'Clique ou arraste os blocos na ordem lógica correta:',
                shuffledBlocks: [
                  { id: 'b2', code: 'dano_base = 50' },
                  { id: 'b1', code: 'bonus_espada = 20' },
                  { id: 'b3', code: 'dano_total = dano_base + bonus_espada' },
                  { id: 'b4', code: 'mostrar(dano_total)' }
                ],
                correctOrder: ['b2', 'b1', 'b3', 'b4'],
                explanation: 'Excelente! Primeiro declaramos os valores iniciais, depois calculamos a soma e por fim exibimos o resultado!',
                xpReward: 20
              },
              {
                id: 'ex-log-2-2',
                type: 'code_runner',
                question: 'Calcule a vida restante do jogador:',
                instruction: 'Crie uma variável vida_restante que seja vida_inicial (100) menos o dano_recebido (35), e exiba o resultado.',
                language: 'javascript',
                initialCode: 'let vida_inicial = 100;\nlet dano_recebido = 35;\n\n// Calcule vida_restante subtraindo o dano:\nlet vida_restante = vida_inicial - dano_recebido;\nconsole.log(vida_restante);',
                expectedOutput: '65',
                explanation: 'Perfeito! 100 - 35 = 65 pontos de vida restantes.',
                xpReward: 25
              }
            ]
          }
        ]
      },
      {
        id: 'mod-log-2',
        title: 'Módulo 2: A Encruzilhada das Decisões (IF / ELSE)',
        theme: 'Condicionais & Fluxo',
        description: 'Ensine o computador a tomar decisões com base em condições verdadeiras ou falsas.',
        icon: 'GitFork',
        badgeName: 'Guardião das Escolhas',
        lessons: [
          {
            id: 'les-log-3',
            title: '1. O Poder do IF (Se)',
            shortDescription: 'Executando código apenas quando uma condição for atendida.',
            icon: 'ShieldQuestion',
            xpReward: 35,
            coinReward: 15,
            exercises: [
              {
                id: 'ex-log-3-1',
                type: 'multiple_choice',
                question: 'Se a variável "tem_chave" for falsa (False), o bloco dentro do "se tem_chave" será executado?',
                codeSnippet: 'se tem_chave:\n    abrir_porta_do_castelo()',
                options: [
                  { id: 'a', text: 'Sim, sempre executa', isCorrect: false },
                  { id: 'b', text: 'Não, o código dentro do IF é pulado', isCorrect: true, explanation: 'Exatamente! O bloco IF só roda quando a condição é Verdadeira (True).' },
                  { id: 'c', text: 'O jogo trava', isCorrect: false }
                ],
                explanation: 'A estrutura condicional SE (IF) avalia se algo é verdadeiro antes de agir.',
                xpReward: 15
              },
              {
                id: 'ex-log-3-2',
                type: 'fill_blank',
                question: 'Complete a condição para verificar se os pontos são maiores ou iguais a 100:',
                templateCode: 'if pontos ____ 100:\n    print("Subiu de Nível!")',
                blankTokens: ['>=', '<', '== 0', 'not'],
                correctTokens: ['>='],
                explanation: '">=" significa "maior ou igual a". Se pontos for 100 ou mais, a mensagem de nível será exibida!',
                xpReward: 20
              }
            ]
          },
          {
            id: 'les-log-boss',
            title: '2. Desafio do Guardião dos Portões (Boss)',
            shortDescription: 'Combine variáveis e decisões para destrancar a fortaleza.',
            icon: 'Swords',
            xpReward: 60,
            coinReward: 30,
            isBoss: true,
            exercises: [
              {
                id: 'ex-log-boss-1',
                type: 'boss_fight',
                question: 'O Guardião dos Bugs bloqueia seu caminho com 3 enigmas! Resolva todos para derrotá-lo.',
                instruction: 'Analise o código e selecione a resposta certa para causar dano ao Chefe:',
                codeSnippet: 'nivel = 5\ntem_escudo = True\n\nse nivel >= 5 e tem_escudo:\n    acao = "Ataque Especial"\nsenao:\n    acao = "Fuga"',
                options: [
                  { id: 'a', text: 'acao será "Ataque Especial"', isCorrect: true, explanation: 'Acerto crítico! O nível é 5 (>=5) E tem_escudo é True, logo a condição SE é verdadeira!' },
                  { id: 'b', text: 'acao será "Fuga"', isCorrect: false },
                  { id: 'c', text: 'Nenhuma ação', isCorrect: false }
                ],
                explanation: 'O operador "E" exige que ambos os lados sejam verdadeiros!',
                xpReward: 30
              },
              {
                id: 'ex-log-boss-2',
                type: 'code_runner',
                question: 'Golpe final! Escreva a verificação para derrotar o boss se a energia dele for menor ou igual a 0:',
                instruction: 'Se a vida_boss <= 0, exiba "Boss derrotado!".',
                language: 'javascript',
                initialCode: 'let vida_boss = 0;\n\nif (vida_boss <= 0) {\n  console.log("Boss derrotado!");\n}',
                expectedOutput: 'Boss derrotado!',
                explanation: 'Vitória épica! Você concluiu a trilha fundamental de lógica de programação!',
                xpReward: 30
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'python',
    name: 'Python para Iniciantes',
    slug: 'python-iniciantes',
    tagline: 'A Magia da Linguagem Mais Amigável do Mundo',
    description: 'Domine a sintaxe limpa de Python. Crie scripts, manipule listas, trabalhe com funções e resolva desafios práticos.',
    icon: 'Terminal',
    color: 'sky',
    accentBg: 'from-sky-500/20 to-blue-500/10',
    level: 'Iniciante',
    estimatedHours: 8,
    modules: [
      {
        id: 'mod-py-1',
        title: 'Módulo 1: Primeiros Passos com Python',
        theme: 'Sintaxe & Saídas',
        description: 'Imprima mensagens na tela, entenda indentação e crie suas primeiras variáveis.',
        icon: 'PlayCircle',
        badgeName: 'Iniciado em Python',
        lessons: [
          {
            id: 'les-py-1',
            title: '1. O Famoso print()',
            shortDescription: 'Como fazer o computador conversar com você.',
            icon: 'MessageSquareCode',
            xpReward: 25,
            coinReward: 10,
            exercises: [
              {
                id: 'ex-py-1-1',
                type: 'multiple_choice',
                question: 'Qual é a função correta em Python para exibir uma mensagem na tela do terminal?',
                options: [
                  { id: 'a', text: 'echo "Olá"', isCorrect: false },
                  { id: 'b', text: 'print("Olá")', isCorrect: true, explanation: 'print() é a função nativa do Python para exibir saídas no terminal!' },
                  { id: 'c', text: 'escrever.tela("Olá")', isCorrect: false },
                  { id: 'd', text: 'System.out.println("Olá")', isCorrect: false }
                ],
                explanation: 'Em Python, usamos a função print() com o texto entre aspas.',
                xpReward: 10
              },
              {
                id: 'ex-py-1-2',
                type: 'code_runner',
                question: 'Faça seu primeiro "Hello, World!" em Python:',
                instruction: 'Use a função print para exibir exatamente o texto: "Olá, Dev!"',
                language: 'python',
                initialCode: '# Escreva sua linha abaixo:\nprint("Olá, Dev!")',
                expectedOutput: 'Olá, Dev!',
                explanation: 'Sensacional! Você acabou de rodar seu primeiro código Python com sucesso.',
                xpReward: 20
              }
            ]
          },
          {
            id: 'les-py-2',
            title: '2. Listas no Python',
            shortDescription: 'Guardando múltiplos tesouros em uma só variável.',
            icon: 'ListOrdered',
            xpReward: 30,
            coinReward: 15,
            exercises: [
              {
                id: 'ex-py-2-1',
                type: 'multiple_choice',
                question: 'Em Python, os índices de uma lista começam em qual número?',
                codeSnippet: 'frutas = ["Maçã", "Banana", "Laranja"]\n# Qual fruta é frutas[0]?',
                options: [
                  { id: 'a', text: 'Começa em 1 (Banana)', isCorrect: false },
                  { id: 'b', text: 'Começa em 0 (Maçã)', isCorrect: true, explanation: 'Correto! Em quase todas as linguagens modernas, o primeiro elemento tem índice 0 (zero-based index)!' },
                  { id: 'c', text: 'Começa em -1', isCorrect: false }
                ],
                explanation: 'frutas[0] retorna o primeiro item, "Maçã".',
                xpReward: 15
              },
              {
                id: 'ex-py-2-2',
                type: 'fill_blank',
                question: 'Como adicionamos um novo item ao final de uma lista em Python?',
                templateCode: 'itens.____("Escudo de Ouro")',
                blankTokens: ['append', 'push', 'add', 'insert_end'],
                correctTokens: ['append'],
                explanation: 'O método .append() é usado em Python para inserir elementos no fim da lista.',
                xpReward: 20
              }
            ]
          }
        ]
      },
      {
        id: 'mod-py-2',
        title: 'Módulo 2: Loops e Funções (def)',
        theme: 'Estruturas Avançadas',
        description: 'Automatize tarefas com loops for e crie blocos reutilizáveis com def.',
        icon: 'Repeat',
        badgeName: 'Encantador de Serpentes',
        lessons: [
          {
            id: 'les-py-3',
            title: '1. Repetições com o loop For',
            shortDescription: 'Percorrendo coleções e repetindo ações.',
            icon: 'RotateCw',
            xpReward: 35,
            coinReward: 15,
            exercises: [
              {
                id: 'ex-py-3-1',
                type: 'order_blocks',
                question: 'Organize o código Python para dar boas-vindas a cada jogador da lista:',
                shuffledBlocks: [
                  { id: 'p2', code: 'jogadores = ["Ana", "Beto", "Carlos"]' },
                  { id: 'p1', code: 'for jogador in jogadores:' },
                  { id: 'p3', code: '    print(f"Bem-vindo, {jogador}!")' }
                ],
                correctOrder: ['p2', 'p1', 'p3'],
                explanation: 'Excelente! A estrutura "for item in lista:" itera perfeitamente sobre cada elemento.',
                xpReward: 20
              },
              {
                id: 'ex-py-3-2',
                type: 'find_bug',
                question: 'Encontre o erro de sintaxe no código Python abaixo:',
                codeSnippet: 'def somar(a, b)\n    return a + b',
                options: [
                  { id: 'a', text: 'Falta dois-pontos (:) no final da linha "def somar(a, b)"', isCorrect: true, explanation: 'Exato! Em Python, cabeçalhos de funções, ifs e loops sempre terminam com dois-pontos (:).' },
                  { id: 'b', text: 'Não pode usar a palavra return', isCorrect: false },
                  { id: 'c', text: 'Deveria usar function em vez de def', isCorrect: false }
                ],
                explanation: 'Em Python: def nome_da_funcao(parametros):',
                xpReward: 20
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'javascript',
    name: 'JavaScript Interativo',
    slug: 'javascript-web',
    tagline: 'A Alma Interativa da Web Moderna',
    description: 'Crie comportamentos dinâmicos, manipule arrays com map/filter e domine as bases do desenvolvimento frontend e fullstack.',
    icon: 'Zap',
    color: 'emerald',
    accentBg: 'from-emerald-500/20 to-teal-500/10',
    level: 'Iniciante',
    estimatedHours: 8,
    modules: [
      {
        id: 'mod-js-1',
        title: 'Módulo 1: Variáveis & Tipos no JS',
        theme: 'Const, Let e Tipos',
        description: 'Aprenda a diferença entre const e let e descubra o poder das funções no ecossistema JavaScript.',
        icon: 'Code',
        badgeName: 'Ninja do JS',
        lessons: [
          {
            id: 'les-js-1',
            title: '1. let vs const',
            shortDescription: 'Quando podemos alterar um valor e quando ele é constante.',
            icon: 'Key',
            xpReward: 25,
            coinReward: 10,
            exercises: [
              {
                id: 'ex-js-1-1',
                type: 'multiple_choice',
                question: 'Qual palavra-chave usamos para declarar uma variável que NUNCA deve mudar de valor?',
                options: [
                  { id: 'a', text: 'let', isCorrect: false },
                  { id: 'b', text: 'const', isCorrect: true, explanation: 'const cria uma referência constante de valor imutável no JavaScript moderno.' },
                  { id: 'c', text: 'var (obsoleta)', isCorrect: false },
                  { id: 'd', text: 'fixo', isCorrect: false }
                ],
                explanation: 'Use const por padrão e let apenas se o valor precisar ser reatribuído.',
                xpReward: 10
              },
              {
                id: 'ex-js-1-2',
                type: 'code_runner',
                question: 'Crie uma Arrow Function que dobre um número:',
                instruction: 'Crie a função dobrar que recebe n e retorna n * 2. Em seguida execute com o valor 7.',
                language: 'javascript',
                initialCode: 'const dobrar = (n) => n * 2;\n\nconsole.log(dobrar(7));',
                expectedOutput: '14',
                explanation: 'Perfeito! As Arrow Functions (=>) tornam o código conciso e elegante.',
                xpReward: 25
              }
            ]
          },
          {
            id: 'les-js-2',
            title: '2. Arrays e Objetos',
            shortDescription: 'Estruturando dados complexos com chave e valor.',
            icon: 'Layers',
            xpReward: 30,
            coinReward: 12,
            exercises: [
              {
                id: 'ex-js-2-1',
                type: 'multiple_choice',
                question: 'Como acessamos a propriedade "nome" do objeto heroi?',
                codeSnippet: 'const heroi = {\n  nome: "Arthur",\n  classe: "Guerreiro"\n};',
                options: [
                  { id: 'a', text: 'heroi.nome', isCorrect: true, explanation: 'Correto! A notação de ponto (objeto.propriedade) é a mais comum para acessar valores!' },
                  { id: 'b', text: 'heroi->nome', isCorrect: false },
                  { id: 'c', text: 'nome(heroi)', isCorrect: false }
                ],
                explanation: 'Você pode acessar propriedades de objetos usando heroi.nome ou heroi["nome"].',
                xpReward: 15
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'htmlcss',
    name: 'HTML & CSS Visual',
    slug: 'html-css-design',
    tagline: 'Construa a Estrutura e Estilo da Internet',
    description: 'Transforme telas em branco em páginas visuais incríveis com tags HTML semânticas, cores e layouts modernos com CSS.',
    icon: 'Palette',
    color: 'purple',
    accentBg: 'from-purple-500/20 to-pink-500/10',
    level: 'Iniciante',
    estimatedHours: 5,
    modules: [
      {
        id: 'mod-html-1',
        title: 'Módulo 1: O Esqueleto da Web (HTML)',
        theme: 'Tags Semânticas',
        description: 'Títulos, parágrafos, botões e imagens organizados.',
        icon: 'Layout',
        badgeName: 'Arquiteto Web',
        lessons: [
          {
            id: 'les-html-1',
            title: '1. Tags de Texto e Títulos',
            shortDescription: 'h1, p e a estrutura de documentos.',
            icon: 'FileText',
            xpReward: 25,
            coinReward: 10,
            exercises: [
              {
                id: 'ex-html-1-1',
                type: 'multiple_choice',
                question: 'Qual tag representa o título principal mais importante de uma página web?',
                options: [
                  { id: 'a', text: '<p>', isCorrect: false },
                  { id: 'b', text: '<h1>', isCorrect: true, explanation: '<h1> (Heading 1) é o título de nível 1, o mais importante para estrutura e SEO!' },
                  { id: 'c', text: '<title-main>', isCorrect: false },
                  { id: 'd', text: '<head>', isCorrect: false }
                ],
                explanation: 'As tags de cabeçalho vão de <h1> até <h6>.',
                xpReward: 10
              },
              {
                id: 'ex-html-1-2',
                type: 'fill_blank',
                question: 'Complete a tag de link para direcionar para outra página:',
                templateCode: '<a ____="https://exemplo.com">Visitar Site</a>',
                blankTokens: ['href', 'src', 'link', 'to'],
                correctTokens: ['href'],
                explanation: 'O atributo "href" (Hypertext Reference) indica o destino do link na web.',
                xpReward: 15
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'sql',
    name: 'SQL & Banco de Dados',
    slug: 'sql-dados',
    tagline: 'O Poder das Consultas em Bases de Dados',
    description: 'Descubra como pesquisar, filtrar, ordenar e extrair insights valiosos de tabelas com a linguagem dos dados.',
    icon: 'Database',
    color: 'indigo',
    accentBg: 'from-indigo-500/20 to-blue-500/10',
    level: 'Iniciante',
    estimatedHours: 5,
    modules: [
      {
        id: 'mod-sql-1',
        title: 'Módulo 1: O Feitiço do SELECT',
        theme: 'Consultas Básicas',
        description: 'Selecione colunas e descubra registros com SELECT e WHERE.',
        icon: 'Search',
        badgeName: 'Explorador de Dados',
        lessons: [
          {
            id: 'les-sql-1',
            title: '1. O Comando SELECT',
            shortDescription: 'Como pedir dados para uma tabela.',
            icon: 'Table',
            xpReward: 25,
            coinReward: 10,
            exercises: [
              {
                id: 'ex-sql-1-1',
                type: 'multiple_choice',
                question: 'Qual símbolo usamos no SQL para selecionar TODAS as colunas de uma tabela?',
                codeSnippet: 'SELECT ___ FROM usuarios;',
                options: [
                  { id: 'a', text: '*', isCorrect: true, explanation: 'O asterisco (*) é o caractere curinga que significa "todas as colunas"!' },
                  { id: 'b', text: '%', isCorrect: false },
                  { id: 'c', text: 'ALL', isCorrect: false },
                  { id: 'd', text: '#', isCorrect: false }
                ],
                explanation: 'SELECT * FROM tabela retorna todas as colunas de cada linha encontrada.',
                xpReward: 10
              },
              {
                id: 'ex-sql-1-2',
                type: 'fill_blank',
                question: 'Complete a consulta para filtrar apenas usuários com idade maior que 18:',
                templateCode: 'SELECT nome FROM usuarios ____ idade > 18;',
                blankTokens: ['WHERE', 'IF', 'HAVING', 'FILTER'],
                correctTokens: ['WHERE'],
                explanation: 'A cláusula WHERE define condições para filtrar registros na tabela!',
                xpReward: 20
              }
            ]
          }
        ]
      }
    ]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-first-step',
    title: 'Primeiro Hello World',
    description: 'Complete sua primeiríssima lição interativa.',
    icon: 'Sparkles',
    category: 'progress',
    targetCount: 1,
    xpReward: 50
  },
  {
    id: 'ach-streak-3',
    title: 'Na Fogueira Dev',
    description: 'Mantenha um streak de 3 dias consecutivos.',
    icon: 'Flame',
    category: 'streak',
    targetCount: 3,
    xpReward: 100
  },
  {
    id: 'ach-flawless',
    title: 'Mente Brilhante',
    description: 'Complete uma lição sem perder nenhum coração.',
    icon: 'Target',
    category: 'perfection',
    targetCount: 1,
    xpReward: 75
  },
  {
    id: 'ach-boss-slayer',
    title: 'Caçador de Bugs',
    description: 'Derrote seu primeiro Chefe de Módulo (Boss Fight).',
    icon: 'ShieldCheck',
    category: 'special',
    targetCount: 1,
    xpReward: 150
  },
  {
    id: 'ach-collector',
    title: 'Tesouro de Bits',
    description: 'Acumule mais de 100 DevCoins na sua carteira.',
    icon: 'Coins',
    category: 'progress',
    targetCount: 100,
    xpReward: 80
  },
  {
    id: 'ach-polyglot',
    title: 'Poliglota do Terminal',
    description: 'Complete ao menos uma lição em 3 trilhas diferentes.',
    icon: 'Globe2',
    category: 'progress',
    targetCount: 3,
    xpReward: 200
  }
];

export const SHOP_ITEMS: ShopItem[] = [
  // Avatares
  {
    id: 'av-wizard',
    name: 'Mago do Algoritmo',
    description: 'Avatar lendário com chapéu estelar e cajado de silício.',
    price: 60,
    category: 'avatar',
    icon: 'Wand2',
    value: '🧙‍♂️'
  },
  {
    id: 'av-cyborg',
    name: 'Cyborg 2077',
    description: 'Visor cibernético com leitura de código em tempo real.',
    price: 80,
    category: 'avatar',
    icon: 'Bot',
    value: '🤖'
  },
  {
    id: 'av-hacker-cat',
    name: 'Gato Hacker',
    description: 'Felino com capuz e teclado mecânico iluminado.',
    price: 100,
    category: 'avatar',
    icon: 'Cat',
    value: '🐱‍💻'
  },
  {
    id: 'av-dragon',
    name: 'Dragão de Bits',
    description: 'Guardião místico dos servidores quânticos.',
    price: 150,
    category: 'avatar',
    icon: 'Flame',
    value: '🐉'
  },
  // Power-ups
  {
    id: 'pw-heart-refill',
    name: 'Poção de Vida Completa',
    description: 'Restaura todos os 5 corações instantaneamente.',
    price: 35,
    category: 'powerup',
    icon: 'Heart',
    value: 'refill_hearts'
  },
  {
    id: 'pw-streak-freeze',
    name: 'Gelo Protetor de Fogo',
    description: 'Protege seu streak por 1 dia se você esquecer de praticar.',
    price: 50,
    category: 'powerup',
    icon: 'Shield',
    value: 'streak_freeze'
  },
  {
    id: 'pw-xp-potion',
    name: 'Elixir de XP Dobrado',
    description: 'Garante o dobro de XP nas próximas 3 lições.',
    price: 70,
    category: 'powerup',
    icon: 'Zap',
    value: 'double_xp'
  },
  // Títulos
  {
    id: 'tt-senior',
    name: 'Título: "Arquiteto Lendário"',
    description: 'Exiba este título glamoroso no ranking e no perfil.',
    price: 90,
    category: 'title',
    icon: 'Crown',
    value: 'Arquiteto Lendário'
  },
  {
    id: 'tt-bug-hunter',
    name: 'Título: "Exterminador de Bugs"',
    description: 'Mostre a todos que nenhum erro escapa dos seus olhos.',
    price: 80,
    category: 'title',
    icon: 'Bug',
    value: 'Exterminador de Bugs'
  }
];

export const INITIAL_DAILY_QUESTS: DailyQuest[] = [
  {
    id: 'dq-1',
    title: 'Mente Ativa',
    description: 'Complete 2 lições em qualquer trilha hoje.',
    target: 2,
    current: 0,
    xpReward: 40,
    coinReward: 15,
    completed: false,
    claimed: false
  },
  {
    id: 'dq-2',
    title: 'Precisão Cirúrgica',
    description: 'Acerte 5 exercícios na primeira tentativa.',
    target: 5,
    current: 0,
    xpReward: 35,
    coinReward: 10,
    completed: false,
    claimed: false
  },
  {
    id: 'dq-3',
    title: 'Explorador do Laboratório',
    description: 'Execute pelo menos 1 código no Laboratório Sandbox.',
    target: 1,
    current: 0,
    xpReward: 25,
    coinReward: 10,
    completed: false,
    claimed: false
  }
];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  { id: 'lb-1', name: 'Lucas "CyberDev"', avatar: '🐱‍💻', title: 'Mestre do Algoritmo', xp: 1420, rankChange: 'same', streak: 12 },
  { id: 'lb-2', name: 'Mariana Silva', avatar: '🧙‍♂️', title: 'Feiticeira do Python', xp: 1280, rankChange: 'up', streak: 9 },
  { id: 'lb-3', name: 'Gabriel Torres', avatar: '🤖', title: 'Arquiteto Frontend', xp: 1150, rankChange: 'down', streak: 7 },
  { id: 'lb-4', name: 'Você (Aprendiz)', avatar: '🧑‍💻', title: 'Novato Curioso', xp: 120, isCurrentUser: true, rankChange: 'up', streak: 1 },
  { id: 'lb-5', name: 'Beatriz Costa', avatar: '🦊', title: 'Exploradora de Dados', xp: 890, rankChange: 'down', streak: 4 },
  { id: 'lb-6', name: 'Rodrigo Lima', avatar: '🚀', title: 'Ninja do JavaScript', xp: 760, rankChange: 'up', streak: 3 },
  { id: 'lb-7', name: 'Fernanda Alves', avatar: '⚡', title: 'Caçadora de Bugs', xp: 620, rankChange: 'same', streak: 2 },
  { id: 'lb-8', name: 'Thiago Mendes', avatar: '🦉', title: 'Coruja do Código', xp: 480, rankChange: 'down', streak: 5 }
];
