import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {
  initReactI18next
} from "react-i18next";

const resources = {
  en: {
    translation: {
      //Navigation Bar
      "Country Code": "EN",
      Home: "Home",
      "Random Card": "Random Card",
      "Discord Bot": "Discord Bot",
      "Support Us": "Support Us",
      results: "{{count}} Matching Results",

      //Search
      Banner: "Banner:",
      search: "Search {{total}} cards for...",
      grid: "Grid View",
      list: "List View",
      "auto-load": "Toggle Scrolling Auto-loader",

      //Filters
      //Order By
      "Order By": "Order By",
      name: "name",
      theme: "theme",
      rarity: "rarity",
      energy: "energy",
      health: "health",
      damage: "damage",

      //Theme
      Theme: "Theme",
      adventure: "adventure",
      fantasy: "fantasy",
      general: "general",
      mystical: "mystical",
      "sci-fi": "sci-fi",
      superhero: "superhero",

      //Rarities
      Rarity: "Rarity",
      common: "common",
      rare: "rare",
      epic: "epic",
      legendary: "legendary",

      //Character Types
      assassin: "assassin",
      melee: "melee",
      tank: "tank",
      ranged: "ranged",
      totem: "totem",
      spell: "spell",
      trap: "trap",

      //Upgrades
      level: "Level {{num}}",
      upgrade: "Upgrade {{num}} / {{total}}",


      //Sections
      "discord-commands": "AWESOM-O Discord Commands",

      "General Information": "General Information",
      "Cast Area": "Cast Area",
      "Max Velocity": "Max Velocity",
      "Time To Reach Max Velocity": "Time To Reach Max Velocity",
      "Agro Range Multiplier": "Agro Range Multiplier",

      "Power Information": "Power Information",
      "Power Type": "Power Type",
      "Power Amount": "Power Amount",
      "Power Duration": "Power Duration",
      "Charged Power Regen": "Charged Power Regen",
      "Charged Power Radius": "Charged Power Radius",

      "Can Attack?": "Can Attack?",
      "Attack Range": "Attack Range",
      "Pre-Attack Delay": "Pre-Attack Delay",
      Knockback: "Knockback",
      "Knockback Angle": "Knockback Angle",
      "Time Between Attacks": "Time Between Attacks",

      "AOE Attacks?": "AOE Attacks?",
      "AOE Damage Percentage": "AOE Damage Percentage",
      "AOE Knockback Percentage": "AOE Knockback Percentage",
      "AOE Radius": "AOE Radius",

      Requirements: "Requirements",
      "Minimum Episode Completed": "Minimum Episode Completed",
      "Minimum PVP Rank Required": "Minimum PVP Rank Required",
      "Minimum Player Level": "Minimum Player Level",

      //Footer
      Copyright: "Copyright: Feinwaru Software",

      "About Feinwaru": "About Feinwaru",
      "Our Team": "Our Team",
      Branding: "Branding",
      Careers: "Careers",

      "Our Projects": "Our Projects",
      "SPPD Mobile": "SPPD Mobile",
      "more...": "more...",

      "Extra Resources": "Extra Resources",
      "Help & Support": "Help & Support",
      Developers: "Developers",
      Feedback: "Feedback",
      "Terms & Privacy": "Terms & Privacy"
    }
  },
  "zh-Hans": {
    translation: {
      //Navigation Bar
      "Country Code": "ZH",
      Home: "主页",
      "Random Card": "随机卡牌",
      "Discord Bot": "Discord机器人",
      "Support Us": "支持我们",
      results: "{{count}} 个匹配结果",

      //Search
      Banner: "题图：",
      search: "在{{total}}张卡牌中搜索……",
      grid: "网格视图",
      list: "列表视图",
      "auto-load": "切换滑动自动读取",

      //Filters
      //Order By
      "Order By": "排列方式",
      name: "名称",
      theme: "主题",
      rarity: "稀有度",
      energy: "费用",
      health: "生命",
      damage: "伤害",

      //Theme
      Theme: "主题",
      adventure: "冒险",
      fantasy: "奇幻",
      general: "中立",
      mystical: "神话",
      "sci-fi": "科幻",
      superhero: "超级英雄",

      //Rarities
      Rarity: "稀有度",
      common: "普通",
      rare: "稀有",
      epic: "史诗",
      legendary: "传奇",

      //Character Types
      assassin: "刺客",
      melee: "战士",
      tank: "坦克",
      ranged: "射手",
      totem: "建筑",
      spell: "法术",
      trap: "陷阱",

      //Upgrades
      level: "Level {{num}}",
      upgrade: "升级{{num}} / {{total}}",


      //Sections
      "discord-commands": "AWESOM-O Discord指令",

      "General Information": "基本信息",
      "Cast Area": "施放范围",
      "Max Velocity": "最大速度",
      "Time To Reach Max Velocity": "达到最大速度所需时间",
      "Agro Range Multiplier": "嘲讽范围系数",

      "Power Information": "技能信息",
      "Power Type": "技能类型",
      "Power Amount": "技能数值",
      "Power Duration": "技能持续时间",
      "Charged Power Regen": "集气技能冷却",
      "Charged Power Radius": "集气技能半径",

      "Can Attack?": "能否攻击？",
      "Attack Range": "攻击范围",
      "Pre-Attack Delay": "攻击前摇",
      Knockback: "击退",
      "Knockback Angle": "击退角度",
      "Time Between Attacks": "攻击间隔",

      "AOE Attacks?": "是否范围攻击？",
      "AOE Damage Percentage": "范围攻击伤害比例",
      "AOE Knockback Percentage": "范围攻击击退比例",
      "AOE Radius": "范围攻击半径",

      Requirements: "解锁要求",
      "Minimum Episode Completed": "最低关卡要求",
      "Minimum PVP Rank Required": "最低段位要求",
      "Minimum Player Level": "最低等级要求",

      //Footer
      Copyright: "版权所有：Feinwaru Software",

      "About Feinwaru": "关于Feinwaru",
      "Our Team": "团队介绍",
      Branding: "品牌合作",
      Careers: "求职信息",

      "Our Projects": "其他项目",
      "SPPD Mobile": "SPPD Mobile",
      "more...": "更多……",

      "Extra Resources": "其他资源",
      "Help & Support": "帮助与支持",
      Developers: "开发者",
      Feedback: "反馈",
      "Terms & Privacy": "条款与隐私"
    }
  },
  "zh-Hant": {
    translation: {
      //Navigation Bar
      "Country Code": "ZH",
      Home: "主頁",
      "Random Card": "隨機卡牌",
      "Discord Bot": "Discord機器人",
      "Support Us": "支持我們",
      results: "{{count}} 個匹配結果",

      //Search
      Banner: "題圖：",
      search: "在{{total}}張卡牌中搜索……",
      grid: "網格視圖",
      list: "列表視圖",
      "auto-load": "切換滑動自動讀取",

      //Filters
      //Order By
      "Order By": "排列方式",
      name: "名稱",
      theme: "主題",
      rarity: "稀有度",
      energy: "費用",
      health: "生命",
      damage: "傷害",

      //Theme
      Theme: "主題",
      adventure: "冒險",
      fantasy: "奇幻",
      general: "中立",
      mystical: "神話",
      "sci-fi": "科幻",
      superhero: "超級英雄",

      //Rarities
      Rarity: "稀有度",
      common: "普通",
      rare: "稀有",
      epic: "史詩",
      legendary: "傳奇",

      //Character Types
      assassin: "刺客",
      melee: "戰士",
      tank: "坦克",
      ranged: "射手",
      totem: "建筑",
      spell: "法術",
      trap: "陷阱",

      //Upgrades
      level: "Level{{num}}",
      upgrade: "升級{{num}} / {{total}}",


      //Sections
      "discord-commands": "AWESOM-O Discord指令",

      "General Information": "基本信息",
      "Cast Area": "施放范圍",
      "Max Velocity": "最大速度",
      "Time To Reach Max Velocity": "達到最大速度所需時間",
      "Agro Range Multiplier": "嘲諷范圍系數",

      "Power Information": "技能信息",
      "Power Type": "技能類型",
      "Power Amount": "技能數值",
      "Power Duration": "技能持續時間",
      "Charged Power Regen": "集氣技能冷卻",
      "Charged Power Radius": "集氣技能半徑",

      "Can Attack?": "能否攻擊？",
      "Attack Range": "攻擊范圍",
      "Pre-Attack Delay": "攻擊前搖",
      Knockback: "擊退",
      "Knockback Angle": "擊退角度",
      "Time Between Attacks": "攻擊間隔",

      "AOE Attacks?": "是否范圍攻擊？",
      "AOE Damage Percentage": "范圍攻擊傷害比例",
      "AOE Knockback Percentage": "范圍攻擊擊退比例",
      "AOE Radius": "范圍攻擊半徑",

      Requirements: "解鎖要求",
      "Minimum Episode Completed": "最低關卡要求",
      "Minimum PVP Rank Required": "最低段位要求",
      "Minimum Player Level": "最低等級要求",

      //Footer
      Copyright: "版權所有：Feinwaru Software",

      "About Feinwaru": "關於Feinwaru",
      "Our Team": "團隊介紹",
      Branding: "品牌合作",
      Careers: "求職信息",

      "Our Projects": "其他項目",
      "SPPD Mobile": "SPPD Mobile",
      "more...": "更多……",

      "Extra Resources": "其他資源",
      "Help & Support": "幫助與支持",
      Developers: "開發者",
      Feedback: "反饋",
      "Terms & Privacy": "條款與隱私"
    }
  },
  ru: {
    translation: {
      //Navigation Bar
      "Country Code": "RU",
      Home: "Главная",
      "Random Card": "Случайная Карта",
      "Discord Bot": "Дискорд Бот",
      "Support Us": "Поддержать Нас",
      results: "{{count}} Результата",

      //Search
      Banner: "Баннер:",
      search: "Поиск {{total}} карт...",
      grid: "Сетка",
      list: "Список",
      "auto-load": "Переключить прокрутку автозагрузки ",

      //Filters
      //Order By
      "Order By": "Список",
      name: "Имя",
      theme: "Темы",
      rarity: "Редкость",
      energy: "Энергия",
      health: "Здоровье",
      damage: "Урон",

      //Theme
      Theme: "Темы",
      adventure: "Приключение",
      fantasy: "Фэнтэзи",
      general: "Нейтральная",
      mystical: "Мистика",
      "sci-fi": "Научно-Фантастическая",
      superhero: "Супергерои",

      //Rarities
      Rarity: "Редкость",
      common: "Обычная",
      rare: "Редкая",
      epic: "Эпическая",
      legendary: "Легендарная",

      //Character Types
      assassin: "Киллер",
      melee: "Боец",
      tank: "Танк",
      ranged: "Стрелок",
      totem: "Шаман",
      spell: "Заклинание",
      trap: "Ловушка",

      //Upgrades
      level: "Уровень {{num}}",
      upgrade: "Улучшения {{num}} / {{total}}",


      //Sections
      "discord-commands": "AWESOM-O Дискорд Команды",

      "General Information": "Основная Информация",
      "Cast Area": "Зона Призыва",
      "Max Velocity": "Максимальная Скорость",
      "Time To Reach Max Velocity": "Время До Максимальной Скорости",
      "Agro Range Multiplier": "Агро Диапазон",

      "Power Information": "Информация Мощности",
      "Power Type": "Тип Мощности",
      "Power Amount": "Количество Мощности",
      "Power Duration": "Длительность Мощности",
      "Charged Power Regen": "Зарядка Мощности",
      "Charged Power Radius": "Радиус Мощности",

      "Can Attack?": "Может Атаковать?",
      "Attack Range": "Дальность Атаки",
      "Pre-Attack Delay": "Задержка Перед Атакой",
      Knockback: "Отбрасывание",
      "Knockback Angle": "Угол Отбрасывания",
      "Time Between Attacks": "Время Между Атаками",

      "AOE Attacks?": "Массовая Атака?",
      "AOE Damage Percentage": "Процент Повреждений Массовой Атаки",
      "AOE Knockback Percentage": "Процент Отбрасывания Массовой Атаки",
      "AOE Radius": "Радиус Массой Атаки",

      Requirements: "Доступность",
      "Minimum Episode Completed": "Минимальный Эпизод Завершён",
      "Minimum PVP Rank Required": "Минимальный PVP Ранг Требуется",
      "Minimum Player Level": "Минимальный Уровень Игрока",

      //Footer
      Copyright: "Авторские права: Feinwaru Software",

      "About Feinwaru": "Больше о Feinwaru",
      "Our Team": "Наша Команда",
      Branding: "Брендирование",
      Careers: "Карьера",

      "Our Projects": "Наши Проекты",
      "SPPD Mobile": "SPPD Mobile",
      "more...": "больше...",

      "Extra Resources": "Дополнительные Ресурсы",
      "Help & Support": "Справка & Поддержка",
      Developers: "Разработчики",
      Feedback: "Обратная связь",
      "Terms & Privacy": "Условия & Конфиденциальность"
    }
  },
  "pt-BR": {
    translation: {
      //Navigation Bar
      "Country Code": "PT-BR",
      Home: "Início",
      "Random Card": "Cartão aleatório",
      "Discord Bot": "Discord Bot",
      "Support Us": "Nos ajude!",
      results: "{{count}} Resultados correspondentes",

      //Search
      Banner: "Banner:",
      search: "Procurar {{total}} cartões para...",
      grid: "Visão em grade",
      list: "Exibição da lista",
      "auto-load": "Alternar Auto-carregador de Rolagem",

      //Filters
      //Order By
      "Order By": "Pedido por",
      name: "nome",
      theme: "tema",
      rarity: "raridade",
      energy: "energia",
      health: "saúde",
      damage: "dano",

      //Theme
      Theme: "Tema",
      adventure: "Aventura",
      fantasy: "fantasia",
      general: "geral",
      mystical: "místico",
      "sci-fi": "sci-fi",
      superhero: "super herói",

      //Rarities
      Rarity: "Raridade",
      common: "comum",
      rare: "raro",
      epic: "épico",
      legendary: "legendário",

      //Character Types
      assassin: "assassino",
      melee: "corpo a corpo",
      tank: "tanque",
      ranged: "longa distância",
      totem: "totem",
      spell: "magia",
      trap: "armadilha",

      //Upgrades
      level: "Nível {{num}}",
      upgrade: "Melhorar {{num}} / {{total}}",


      //Sections
      "discord-commands": "AWESOM-O Comandos do Discord",

      "General Information": "Informação Geral",
      "Cast Area": "Área de Cast",
      "Max Velocity": "Velocidade máxima",
      "Time To Reach Max Velocity": "Tempo para atingir velocidade máxima",
      "Agro Range Multiplier": "Multiplicador de faixa de agro",

      "Power Information": "Informação da potência",
      "Power Type": "Tipo de potência",
      "Power Amount": "Quantidade de poder",
      "Power Duration": "Duração da potência",
      "Charged Power Regen": "Regeneração de potência carregada",
      "Charged Power Radius": "Raio de potência carregada",

      "Can Attack?": "Pode atacar?",
      "Attack Range": "Raio de ataque",
      "Pre-Attack Delay": "Deley de Pré-Ataque",
      Knockback: "Knockback",
      "Knockback Angle": "Ângulo de Knockback",
      "Time Between Attacks": "Tempo entre os ataques",

      "AOE Attacks?": "AOE ataques?",
      "AOE Damage Percentage": "AOE Porcentagem de dano",
      "AOE Knockback Percentage": "AOE Porcentagem do Knockback",
      "AOE Radius": "AOE Raio",

      Requirements: "Requisitos",
      "Minimum Episode Completed": "Mínimo do episódio completo",
      "Minimum PVP Rank Required": "Rank de PVP mínimo requerido",
      "Minimum Player Level": "Nível mínimo do jogador",

      //Footer
      Copyright: "Direitos autorais: Feinwaru Software",

      "About Feinwaru": "Sobre Feinwaru",
      "Our Team": "Nosso time",
      Branding: "Marca",
      Careers: "Carreiras",

      "Our Projects": "Nossos projetos",
      "SPPD Mobile": "SPPD Mobile",
      "more...": "mais...",

      "Extra Resources": "Recursos extras",
      "Help & Support": "Ajuda & Suporte",
      Developers: "Desenvolvedores",
      Feedback: "Feedback",
      "Terms & Privacy": "Termos & Privacidade"
    }
  },
  "pt-PT": {
    translation: {
      //Navigation Bar
      "Country Code": "PT",
      Home: "Página Inicial",
      "Random Card": "Carta Aleatória",
      "Discord Bot": "Bot do Discord",
      "Support Us": "Suporta-nos",
      results: "{{count}} Resultados Correspondentes",

      //Search
      Banner: "Banner:",
      search: "A procurar {{total}} cartas para...",
      grid: "Vista de Grelha",
      list: "Vista de Lista",
      "auto-load": "Ligar o Auto-Loader de scroll",

      //Filters
      //Order By
      "Order By": "Ordenar Por",
      name: "nome",
      theme: "tema",
      rarity: "raridade",
      energy: "energia",
      health: "vida",
      damage: "dano",

      //Theme
      Theme: "Tema",
      adventure: "aventura",
      fantasy: "fantasia",
      general: "geral",
      mystical: "místico",
      "sci-fi": "sci-fi",
      superhero: "super herói",

      //Rarities
      Rarity: "Raridade",
      common: "comum",
      rare: "raro",
      epic: "épico",
      legendary: "lendário",

      //Character Types
      assassin: "assassino",
      melee: "corpo-a-corpo",
      tank: "tanque",
      ranged: "longa distãncia",
      totem: "totem",
      spell: "feitiço",
      trap: "armadilha",

      //Upgrades
      level: "Nível {{num}}",
      upgrade: "Atualização {{num}} / {{total}}",


      //Sections
      "discord-commands": "Comandos do AWESOM-O Discord",

      "General Information": "Informação Geral",
      "Cast Area": "Área da Abilidade",
      "Max Velocity": "Velocidade Máxima",
      "Time To Reach Max Velocity": "Tempo para Chegar À Velocidade Máxima",
      "Agro Range Multiplier": "Multiplicador de Alcance de Foco",

      "Power Information": "Informação do Poder",
      "Power Type": "Tipo de Poder",
      "Power Amount": "Quantidade de Poder",
      "Power Duration": "Duração do Poder",
      "Charged Power Regen": "Regeneração do Poder Carregado",
      "Charged Power Radius": "Raio do Poder Carregado",

      "Can Attack?": "Pode Atacar?",
      "Attack Range": "Alcance do Ataque",
      "Pre-Attack Delay": "Tempo de Resposta Pré-Ataque",
      Knockback: "Knockback",
      "Knockback Angle": "Ângulo de Knockback",
      "Time Between Attacks": "Tempo Entre Ataques",

      "AOE Attacks?": "Ataques AOE?",
      "AOE Damage Percentage": "Percentagem de Dano AOE",
      "AOE Knockback Percentage": "Percentagem de knockback AOE",
      "AOE Radius": "Raio AOE",

      Requirements: "Requesitos",
      "Minimum Episode Completed": "Episódio Mínimo Completo",
      "Minimum PVP Rank Required": "Nível Mínimo de PVP requerido",
      "Minimum Player Level": "Nível de Jogador Mínimo",

      //Footer
      Copyright: "Direitos de autor: Feinwaru Software",

      "About Feinwaru": "Acerca de Feinwaru",
      "Our Team": "A Nossa Equia",
      Branding: "Marcas",
      Careers: "Carreiras",

      "Our Projects": "Os Nossos Projetos",
      "SPPD Mobile": "SPPD Mobile",
      "more...": "mais...",

      "Extra Resources": "Extra Resources",
      "Help & Support": "Ajuda e Suporte",
      Developers: "Desenvolvedores",
      Feedback: "Feedback",
      "Terms & Privacy": "Termos e Privacidade"
    }
  }

  /*es: {
    translation: {
      //Navigation Bar
      "Country Code": "ES",
      "Home": "Casa",
      "Random Card": "Tarjeta aleatoria",
      "Discord Bot": "Discord Bot",
      "Support Us": "Apoyanos",
      "results": "{{count}} resultados coincidentes",

      //Search
      "Banner": "Bandera:",
      "search": "Buscar {{total}} cartas para ...",
      "grid": "Vista en cuadrícula",
      "list": "Les vista",
      "auto-load": "Toggle Scrolling Auto-loader",

      //Filters
      //Order By
      "Order By": "Ordenar por",
      "name": "nombre",
      "theme": "tema",
      "rarity": "rareza",
      "energy": "energía",
      "health": "salud",
      "damage": "dañar",

      //Theme
      "Theme": "Tema",
      "adventure": "aventuras",
      "fantasy": "fantasía",
      "general": "general",
      "mystical": "místico",
      "sci-fi": "ciencia ficción",

      //Rarities
      "Rarity": "Rareza",
      "common": "común",
      "rare": "raro",
      "epic": "épico",
      "legendary": "legendario",

      //Character Types
      "assassin": "asesino",
      "melee": "pelea confusa",
      "tank": "tanque",
      "ranged": "a distancia",
      "totem": "tótem",
      "spell": "spello",
      "trap": "trapo",

      //Upgrades
      "level": "Nivel {{num}}",
      "upgrade": "Actualizar {{num}} / {{total}}",


      //Sections
      "discord-commands": "Comandos de la discordia de AWESOM-O",

      "General Information": "Información general",
      "Cast Area": "Área de lanzamiento",
      "Max Velocity": "Velocidad máxima",
      "Time To Reach Max Velocity": "Tiempo para alcanzar la velocidad máxima ",
      "Agro Range Multiplier": "Multiplicador de rango agro ",

      "Power Information": "Información de energía",
      "Power Type": "Tipo de energía",
      "Power Amount": "Cantidad de energía",
      "Power Duration": "Duración de la energía",
      "Charged Power Regen": "Carga de energía cargada",
      "Charged Power Radius": "Radio de potencia cargada",

      "Can Attack?": "¿Puede atacar?",
      "Attack Range": "Rango de ataque",
      "Pre-Attack Delay": "Retraso previo al ataque",
      "Knockback": "Knockback",
      "Knockback Angle": "Ángulo de retorno",
      "Time Between Attacks": "Tiempo Entre Ataques",

      "AOE Attacks?": "¿AOE Ataques?",
      "AOE Damage Percentage": "Porcentaje de Daño AOE",
      "AOE Knockback Percentage": "AOE Porcentaje de recuperación",
      "AOE Radius": "Radio AOE",

      "Requirements": "Requerimientos",
      "Minimum Episode Completed": "Episodio mínimo completado",
      "Minimum PVP Rank Required": "Rango mínimo de PVP requerido",
      "Minimum Player Level": "Nivel mínimo de jugador",

      //Footer
      "Copyright": "Derechos de autor: Feinwaru Software",

      "About Feinwaru": "Acerca de Feinwaru",
      "Our Team": "Nuestro equipo",
      "Branding": "Marca",
      "Careers": "Carreras profesionales",

      "Our Projects": "Nuestros proyectos",
      "SPPD Mobile": "SPPD Mobile",
      "more...": "más...",

      "Extra Resources": "Recursos Extra",
      "Help & Support": "Servicio de asistencia",
      "Developers": "Desarrolladores",
      "Feedback": "Realimentación",
      "Terms & Privacy": "Términos y Privacidad",
    }
  },
  pl: {
    translation: {
      //Navigation Bar
      "Country Code": "PL",
      "Home": "Dom",
      "Random Card": "Losowa karta",
      "Discord Bot": "Bot Discord",
      "Support Us": "Wesprzyj nas",
      "results": "{{count}} wyniki",

      //Search
      "Banner": "???",
      "search": "Szukaj {{total}} kart na ...",
      "grid": "???",
      "list": "lista",
      "auto-load": "???",

      //Filters
      //Order By
      "Order By": "???",
      "name": "imię",
      "theme": "???",
      "rarity": "rzadkość",
      "energy": "energia",
      "health": "???",
      "damage": "???",

      //Theme
      "Theme": "???",
      "adventure": "???",
      "fantasy": "???",
      "general": "generalne",
      "mystical": "mistyczne",
      "sci-fi": "science fiction",
      "superhero": "???",

      //Rarities
      "Rarity": "Rzadkość",
      "common": "pospolite",
      "rare": "rzadkie",
      "epic": "epickie",
      "legendary": "legendarne",

      //Character Types
      "assassin": "???",
      "melee": "???",
      "tank": "???",
      "ranged": "???",
      "totem": "totem",
      "spell": "zaklęcie",
      "trap": "pułapka",

      //Upgrades
      "level": "Poziom {{num}}",
      "upgrade": "??? {{num}} / {{total}}",


      //Sections
      "discord-commands": "-",

      "General Information": "Informacje ogólne",
      "Cast Area": "-",
      "Max Velocity": "Maksymalna Prędkość",
      "Time To Reach Max Velocity": "Czas do osiągnięcia maksymalnej prędkości",
      "Agro Range Multiplier": "-",

      "Power Information": "Informacje o mocy",
      "Power Type": "-",
      "Power Amount": "Moc",
      "Power Duration": "Czas trwania mocy",
      "Charged Power Regen": "-",
      "Charged Power Radius": "Promień naładowanej mocy",

      "Can Attack?": "Czy możesz zaatakować?",
      "Attack Range": "Zasięg ataku",
      "Pre-Attack Delay": "Opóźnienie przed atakiem",
      "Knockback": "Odrzut",
      "Knockback Angle": "Kąt odrzutu",
      "Time Between Attacks": "Czas między atakami",

      "AOE Attacks?": "Ataki AOE?",
      "AOE Damage Percentage": "Procent obrażeń AOE",
      "AOE Knockback Percentage": "Procent odrzucenia AOE",
      "AOE Radius": "Promień AOE",

      "Requirements": "Wymagania",
      "Minimum Episode Completed": "Minimalny odcinek ukończony",
      "Minimum PVP Rank Required": "Wymagana minimalna pozycja PVP",
      "Minimum Player Level": "Minimalny poziom gracza",

      //Footer
      "Copyright": "Prawa autorskie: Feinwaru Software",

      "About Feinwaru": "O Feinwaru",
      "Our Team": "Nasz zespół",
      "Branding": "Branding",
      "Careers": "Kariery",

      "Our Projects": "Nasz projekt",
      "SPPD Mobile": "SPPD Mobile",
      "more...": "więcej...",

      "Extra Resources": "Dodatkowe zasoby",
      "Help & Support": "Pomoc i wsparcie",
      "Developers": "Deweloperzy",
      "Feedback": "-",
      "Terms & Privacy": "Warunki i prywatność",
    }
  }
  */
};

const detectionSettings = {
  order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag", "path", "subdomain"],
  lookupQuerystring: "hl"
};


i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection: detectionSettings,
    resources,
    fallbackLng: "en",
    keySeparator: false,
    interpolation: {
      escapeValue: false
    },
    react: {
      wait: true
    }
  });

export default i18n;