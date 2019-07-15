import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {
  initReactI18next
} from 'react-i18next';

const resources = {
  en: {
    translation: {
      //Navigation Bar
      "Country Code": "EN",
      "Home": "Home",
      "Random Card": "Random Card",
      "Discord Bot": "Discord Bot",
      "Support Us": "Support Us",
      "results": "{{count}} Matching Results",

      //Search
      "Banner": "Banner:",
      "search": "Search {{total}} cards for...",
      "grid": "Grid View",
      "list": "List View",
      "auto-load": "Toggle Scrolling Auto-loader",

      //Filters
      //Order By
      "Order By": "Order By",
      "name": "name",
      "theme": "theme",
      "rarity": "rarity",
      "energy": "energy",
      "health": "health",
      "damage": "damage",

      //Theme
      "Theme": "Theme",
      "adventure": "adventure",
      "fantasy": "fantasy",
      "general": "general",
      "mystical": "mystical",
      "sci-fi": "sci-fi",
      "superhero": "superhero",

      //Rarities
      "Rarity": "Rarity",
      "common": "common",
      "rare": "rare",
      "epic": "epic",
      "legendary": "legendary",

      //Character Types
      "assassin": "assassin",
      "melee": "melee",
      "tank": "tank",
      "ranged": "ranged",
      "totem": "totem",
      "spell": "spell",
      "trap": "trap",

      //Upgrades
      "level": "Level {{num}}",
      "upgrade": "Upgrade {{num}} / {{total}}",


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
      "Knockback": "Knockback",
      "Knockback Angle": "Knockback Angle",
      "Time Between Attacks": "Time Between Attacks",

      "AOE Attacks?": "AOE Attacks?",
      "AOE Damage Percentage": "AOE Damage Percentage",
      "AOE Knockback Percentage": "AOE Knockback Percentage",
      "AOE Radius": "AOE Radius",

      "Requirements": "Requirements",
      "Minimum Episode Completed": "Minimum Episode Completed",
      "Minimum PVP Rank Required": "Minimum PVP Rank Required",
      "Minimum Player Level": "Minimum Player Level",

      //Footer
      "Copyright": "Copyright: Feinwaru Software",

      "About Feinwaru": "About Feinwaru",
      "Our Team": "Our Team",
      "Branding": "Branding",
      "Careers": "Careers",

      "Our Projects": "Our Projects",
      "SPPD Mobile": "SPPD Mobile",
      "more...": "more...",

      "Extra Resources": "Extra Resources",
      "Help & Support": "Help & Support",
      "Developers": "Developers",
      "Feedback": "Feedback",
      "Terms & Privacy": "Terms & Privacy",
    }
  },
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
  order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
  lookupQuerystring: 'hl',
}


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
    },
  });

export default i18n;