import { FoodItem } from '../types';

// Helper to create crisp visual SVG Data URIs representing test reactions
function createSampleSvg(bgColor: string, liquidColor: string, featureSvg: string, title: string, subtitle: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>
      <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="rgba(255,255,255,0.4)"/>
        <stop offset="30%" stop-color="rgba(255,255,255,0.1)"/>
        <stop offset="70%" stop-color="rgba(255,255,255,0.1)"/>
        <stop offset="100%" stop-color="rgba(255,255,255,0.3)"/>
      </linearGradient>
    </defs>
    <!-- Background -->
    <rect width="400" height="300" fill="url(#bg)"/>
    <rect x="20" y="20" width="360" height="260" rx="12" fill="${bgColor}" fill-opacity="0.2" stroke="${bgColor}" stroke-width="1.5" stroke-dasharray="4 4"/>
    
    <!-- Test Beaker / Glass Container -->
    <rect x="130" y="55" width="140" height="180" rx="8" fill="url(#glass)" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>
    <ellipse cx="200" cy="55" rx="70" ry="10" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>
    
    <!-- Liquid content -->
    <rect x="133" y="100" width="134" height="130" rx="4" fill="${liquidColor}"/>
    <ellipse cx="200" cy="100" rx="67" ry="8" fill="${liquidColor}" filter="brightness(1.1)"/>
    
    <!-- Specific Reaction visual features -->
    ${featureSvg}
    
    <!-- Measurement lines on beaker -->
    <line x1="135" y1="90" x2="150" y2="90" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
    <line x1="135" y1="120" x2="145" y2="120" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
    <line x1="135" y1="150" x2="150" y2="150" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
    <line x1="135" y1="180" x2="145" y2="180" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
    
    <!-- Captions -->
    <rect x="35" y="235" width="330" height="36" rx="6" fill="rgba(15,23,42,0.85)" stroke="rgba(255,255,255,0.15)"/>
    <text x="200" y="250" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#f8fafc">${title}</text>
    <text x="200" y="264" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#94a3b8">${subtitle}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Preset SVGs for Milk
const milkDetergentPositiveSvg = createSampleSvg(
  '#ef4444',
  '#f8fafc',
  `<!-- Persistent dense froth layer -->
   <rect x="133" y="65" width="134" height="35" fill="#ffffff"/>
   <circle cx="150" cy="75" r="4" fill="none" stroke="#cbd5e1" stroke-width="1"/>
   <circle cx="165" cy="72" r="6" fill="none" stroke="#cbd5e1" stroke-width="1"/>
   <circle cx="185" cy="78" r="5" fill="none" stroke="#cbd5e1" stroke-width="1"/>
   <circle cx="210" cy="73" r="7" fill="none" stroke="#cbd5e1" stroke-width="1"/>
   <circle cx="235" cy="76" r="5" fill="none" stroke="#cbd5e1" stroke-width="1"/>
   <circle cx="250" cy="80" r="4" fill="none" stroke="#cbd5e1" stroke-width="1"/>
   <circle cx="170" cy="88" r="5" fill="none" stroke="#cbd5e1" stroke-width="1"/>
   <circle cx="220" cy="88" r="6" fill="none" stroke="#cbd5e1" stroke-width="1"/>
   <!-- Warning badge -->
   <circle cx="200" cy="160" r="16" fill="#ef4444" fill-opacity="0.9"/>
   <path d="M200 151 v10 M200 166 v2" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
  'Milk: Dense Froth >15mm (Detergent Test)',
  'Thick persistent honeycomb lather indicating chemical surfactants'
);

const milkPureSampleSvg = createSampleSvg(
  '#10b981',
  '#f8fafc',
  `<!-- Very thin natural bubble line -->
   <ellipse cx="200" cy="100" rx="67" ry="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
   <circle cx="155" cy="100" r="2" fill="#cbd5e1"/>
   <circle cx="235" cy="100" r="2" fill="#cbd5e1"/>
   <!-- Pure Check badge -->
   <circle cx="200" cy="160" r="16" fill="#10b981" fill-opacity="0.9"/>
   <path d="M193 160 l5 5 l10 -10" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'Milk: Authentic Pure Sample (Normal)',
  'Thin natural surface ring subsided in under 45 seconds'
);

// Preset SVGs for Turmeric
const turmericMetanilPositiveSvg = createSampleSvg(
  '#ef4444',
  '#d946ef',
  `<!-- Intense magenta color shift -->
   <rect x="133" y="100" width="134" height="130" rx="4" fill="#d946ef"/>
   <!-- Strong chemical dye glow -->
   <ellipse cx="200" cy="140" rx="50" ry="25" fill="#f43f5e" fill-opacity="0.4"/>
   <circle cx="200" cy="170" r="16" fill="#ef4444" fill-opacity="0.9"/>
   <path d="M200 161 v10 M200 176 v2" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
  'Turmeric: Bright Magenta Reaction (Acid Test)',
  'Persistent pink-magenta dye indicates banned Metanil Yellow'
);

const turmericPureSampleSvg = createSampleSvg(
  '#10b981',
  '#eab308',
  `<!-- Natural Curcumin Yellow with Settled Layer -->
   <rect x="133" y="100" width="134" height="90" fill="#facc15" fill-opacity="0.7"/>
   <!-- Clean settled particles at bottom -->
   <rect x="133" y="190" width="134" height="40" rx="4" fill="#ca8a04"/>
   <circle cx="200" cy="145" r="16" fill="#10b981" fill-opacity="0.9"/>
   <path d="M193 145 l5 5 l10 -10" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'Turmeric: Natural Golden Yellow (Normal)',
  'Natural settling; returns to golden yellow on dilution'
);

// Preset SVGs for Chilli
const chilliBrickPositiveSvg = createSampleSvg(
  '#ef4444',
  '#f87171',
  `<!-- Water with heavy red sediment at bottom -->
   <rect x="133" y="100" width="134" height="85" fill="#fca5a5" fill-opacity="0.5"/>
   <rect x="133" y="185" width="134" height="45" rx="4" fill="#991b1b"/>
   <circle cx="150" cy="205" r="3" fill="#450a0a"/>
   <circle cx="170" cy="215" r="4" fill="#450a0a"/>
   <circle cx="210" cy="210" r="3" fill="#450a0a"/>
   <circle cx="230" cy="218" r="4" fill="#450a0a"/>
   <circle cx="200" cy="145" r="16" fill="#ef4444" fill-opacity="0.9"/>
   <path d="M200 136 v10 M200 151 v2" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
  'Chilli: Dense Brick Grit Sediment (Sediment Test)',
  'Heavy brick dust and soapstone instantly sink to bottom'
);

const chilliPureSampleSvg = createSampleSvg(
  '#10b981',
  '#fecaca',
  `<!-- Pure chilli floating naturally on upper surface -->
   <rect x="133" y="100" width="134" height="130" rx="4" fill="#fee2e2" fill-opacity="0.4"/>
   <rect x="133" y="98" width="134" height="20" fill="#dc2626"/>
   <circle cx="200" cy="165" r="16" fill="#10b981" fill-opacity="0.9"/>
   <path d="M193 165 l5 5 l10 -10" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'Chilli: Floating Flakes on Surface (Normal)',
  'Pure spices float smoothly without dense mineral sediment'
);

// Preset SVGs for Cooking Oil
const oilArgemonePositiveSvg = createSampleSvg(
  '#ef4444',
  '#fbbf24',
  `<!-- Reddish crimson interface ring -->
   <rect x="133" y="100" width="134" height="65" fill="#f59e0b"/>
   <rect x="133" y="165" width="134" height="15" fill="#b91c1c"/>
   <rect x="133" y="180" width="134" height="50" fill="#fef08a" fill-opacity="0.4"/>
   <circle cx="200" cy="135" r="16" fill="#ef4444" fill-opacity="0.9"/>
   <path d="M200 126 v10 M200 141 v2" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
  'Cooking Oil: Crimson Red Layer (Argemone Test)',
  'Toxic argemone oil creates distinct red chemical barrier'
);

const oilPureSampleSvg = createSampleSvg(
  '#10b981',
  '#fbbf24',
  `<!-- Clean golden oil -->
   <rect x="133" y="100" width="134" height="130" rx="4" fill="#f59e0b"/>
   <ellipse cx="200" cy="100" rx="67" ry="8" fill="#fde047" fill-opacity="0.8"/>
   <circle cx="200" cy="165" r="16" fill="#10b981" fill-opacity="0.9"/>
   <path d="M193 165 l5 5 l10 -10" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'Cooking Oil: Uniform Amber Clarity (Normal)',
  'Clean phase boundary and transparent golden hue'
);

// Preset SVGs for Rice
const ricePlasticPositiveSvg = createSampleSvg(
  '#ef4444',
  '#334155',
  `<!-- Grains floating & melting under heat test -->
   <rect x="133" y="100" width="134" height="130" rx="4" fill="#38bdf8" fill-opacity="0.3"/>
   <!-- Floating synthetic grains on water top -->
   <ellipse cx="160" cy="105" rx="10" ry="4" fill="#ffffff" stroke="#94a3b8"/>
   <ellipse cx="185" cy="103" rx="12" ry="4" fill="#ffffff" stroke="#94a3b8"/>
   <ellipse cx="215" cy="106" rx="11" ry="5" fill="#ffffff" stroke="#94a3b8"/>
   <ellipse cx="240" cy="104" rx="9" ry="4" fill="#ffffff" stroke="#94a3b8"/>
   <circle cx="200" cy="165" r="16" fill="#ef4444" fill-opacity="0.9"/>
   <path d="M200 156 v10 M200 171 v2" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
  'Rice: High Buoyancy & Plastic Odor (Water/Flame)',
  'Synthetic polymer grains float buoyantly on water surface'
);

const ricePureSampleSvg = createSampleSvg(
  '#10b981',
  '#334155',
  `<!-- Natural grains sinking to bottom -->
   <rect x="133" y="100" width="134" height="130" rx="4" fill="#38bdf8" fill-opacity="0.2"/>
   <!-- Clean settled grains at bottom -->
   <ellipse cx="155" cy="220" rx="12" ry="4" fill="#f8fafc"/>
   <ellipse cx="180" cy="222" rx="13" ry="5" fill="#f8fafc"/>
   <ellipse cx="210" cy="219" rx="11" ry="4" fill="#f8fafc"/>
   <ellipse cx="235" cy="221" rx="12" ry="4" fill="#f8fafc"/>
   <circle cx="200" cy="155" r="16" fill="#10b981" fill-opacity="0.9"/>
   <path d="M193 155 l5 5 l10 -10" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'Rice: Natural Sinking Grains (Normal)',
  'Authentic starchy grains sink promptly and char naturally'
);

// Preset SVGs for Sugar
const sugarChalkPositiveSvg = createSampleSvg(
  '#ef4444',
  '#94a3b8',
  `<!-- Turbid water with chalk precipitate at bottom -->
   <rect x="133" y="100" width="134" height="95" fill="#cbd5e1" fill-opacity="0.8"/>
   <rect x="133" y="195" width="134" height="35" rx="4" fill="#ffffff"/>
   <circle cx="200" cy="150" r="16" fill="#ef4444" fill-opacity="0.9"/>
   <path d="M200 141 v10 M200 156 v2" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
  'Sugar: Insoluble Milky Sediment (Chalk Test)',
  'Heavy chalk powder or washing soda fails to dissolve'
);

const sugarPureSampleSvg = createSampleSvg(
  '#10b981',
  '#38bdf8',
  `<!-- Crystal clear dissolved sucrose solution -->
   <rect x="133" y="100" width="134" height="130" rx="4" fill="#e0f2fe" fill-opacity="0.3"/>
   <circle cx="200" cy="165" r="16" fill="#10b981" fill-opacity="0.9"/>
   <path d="M193 165 l5 5 l10 -10" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'Sugar: 100% Clear Dissolution (Normal)',
  'Sugar dissolves completely without residue or turbidity'
);

export const FOOD_DATABASE: FoodItem[] = [
  {
    id: 'milk',
    name: {
      en: 'Milk',
      kn: 'ಹಾಲು',
      hi: 'दूध'
    },
    tagline: {
      en: 'Daily dairy staple for chai, curd & nutrition',
      kn: 'ಚಹಾ, ಮೊಸರು ಮತ್ತು ಪೋಷಕಾಂಶಗಳ ದೈನಂದಿನ ಹಾಲು',
      hi: 'चाय, दही और पोषण का दैनिक डेयरी उत्पाद'
    },
    category: {
      en: 'Dairy Essentials',
      kn: 'ಡೈರಿ ಪದಾರ್ಥಗಳು',
      hi: 'डेयरी उत्पाद'
    },
    commonAdulterants: {
      en: ['Synthetic Detergent', 'Urea', 'Starch', 'Water Dilution'],
      kn: ['ಸಿಂಥೆಟಿಕ್ ಡಿಟರ್ಜೆಂಟ್', 'ಯೂರಿಯಾ', 'ಸ್ಟಾರ್ಚ್', 'ನೀರಿನ ಮಿಶ್ರಣ'],
      hi: ['सिंथेटिक डिटर्जेंट', 'यूरिया', 'स्टार्च', 'पानी की मिलावट']
    },
    iconName: 'Milk',
    colorScheme: {
      primary: 'bg-blue-600',
      light: 'bg-blue-50',
      badge: 'text-blue-700 bg-blue-100',
      border: 'border-blue-200'
    },
    sampleImages: [
      {
        id: 'milk-sample-detergent',
        label: {
          en: 'Suspicious Milk (Detergent Lather)',
          kn: 'ಅನುಮಾನಾಸ್ಪದ ಹಾಲು (ಡಿಟರ್ಜೆಂಟ್ ನೊರೆ)',
          hi: 'मिलावटी दूध (डिटर्जेंट झाग)'
        },
        expectedStatus: 'suspicious',
        description: {
          en: 'Forms thick persistent foam layer >15mm after shaking with equal water',
          kn: 'ಸಮಾನ ನೀರಿನೊಂದಿಗೆ ಅಲುಗಾಡಿಸಿದಾಗ 15mm ಗಿಂತ ಹೆಚ್ಚು ದಪ್ಪನೆಯ ನೊರೆ ಉಂಟಾಗುತ್ತದೆ',
          hi: 'समान पानी के साथ हिलाने पर 15 मिमी से अधिक मोटा झाग बनता है'
        },
        dataUrl: milkDetergentPositiveSvg
      },
      {
        id: 'milk-sample-pure',
        label: {
          en: 'Pure Cow Milk (Normal)',
          kn: 'ಶುದ್ಧ ಹಸುವಿನ ಹಾಲು (ಸಾಮಾನ್ಯ)',
          hi: 'शुद्ध गाय का दूध (सामान्य)'
        },
        expectedStatus: 'normal',
        description: {
          en: 'Thin surface bubble film that subsides within 45-60 seconds',
          kn: 'ತೆಳುವಾದ ನೊರೆ ಪದರವು 45-60 ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಕರಗುತ್ತದೆ',
          hi: 'झाग की पतली परत जो 45-60 सेकंड में शांत हो जाती है'
        },
        dataUrl: milkPureSampleSvg
      }
    ],
    dartTests: [
      {
        id: 'milk-detergent',
        name: {
          en: 'Shake & Froth Test for Detergents',
          kn: 'ಡಿಟರ್ಜೆಂಟ್ ಪತ್ತೆಗಾಗಿ ಅಲುಗಾಡಿಸುವ ಪರೀಕ್ಷೆ',
          hi: 'डिटर्जेंट हेतु हिलाने का झाग परीक्षण'
        },
        targetAdulterant: {
          en: 'Synthetic Detergents, Shampoos & Surfactants',
          kn: 'ಸಿಂಥೆಟಿಕ್ ಡಿಟರ್ಜೆಂಟ್, ಶ್ಯಾಂಪೂ ಮತ್ತು ಸರ್ಫ್ಯಾಕ್ಟಂಟ್',
          hi: 'सिंथेटिक डिटर्जेंट, शैम्पू व रासायनिक झाग'
        },
        estimatedMinutes: 3,
        equipment: {
          en: ['Clean glass tumbler or small bottle', 'Water (room temperature)', '5 to 10ml milk sample'],
          kn: ['ಸ್ವಚ್ಛವಾದ ಗಾಜಿನ ಲೋಟ ಅಥವಾ ಬಾಟಲ್', 'ಸ್ವಚ್ಛ ನೀರು', '೫ ರಿಂದ ೧೦ ಮಿ.ಲೀ ಹಾಲು'],
          hi: ['साफ कांच का गिलास या छोटी बोतल', 'सामान्य पानी', '5 से 10 मिली दूध']
        },
        precautions: {
          en: ['Do not taste or ingest milk suspected of containing detergents.', 'Ensure test glass has no leftover dishwashing residue.'],
          kn: ['ಡಿಟರ್ಜೆಂಟ್ ಸಂಶಯವಿರುವ ಹಾಲನ್ನು ಸೇವಿಸಬೇಡಿ.', 'ಪರೀಕ್ಷಾ ಗಾಜಿನಲ್ಲಿ ಯಾವುದೇ ಹಿಂದಿನ ಸಾಬೂನಿನ ಅಂಶವಿಲ್ಲದಿರಲಿ.'],
          hi: ['डिटर्जेंट मिले होने की आशंका वाले दूध का स्वाद न चखें।', 'सुनिश्चित करें कि कांच के गिलास में पहले का साबुन न लगा हो।']
        },
        steps: [
          {
            stepNumber: 1,
            title: {
              en: 'Measure equal parts',
              kn: 'ಸಮಾನ ಪ್ರಮಾಣ ಅಳೆಯಿರಿ',
              hi: 'समान मात्रा मापें'
            },
            instruction: {
              en: 'Take about 5 to 10 ml of the milk sample and add an equal quantity of tap water in a clean glass bottle.',
              kn: 'ಸ್ವಚ್ಛವಾದ ಬಾಟಲಿಯಲ್ಲಿ ೫-೧೦ ಮಿ.ಲೀ ಹಾಲು ಮತ್ತು ಅಷ್ಟೇ ಪ್ರಮಾಣದ ನೀರನ್ನು ಹಾಕಿ.',
              hi: 'एक साफ बोतल में 5 से 10 मिली दूध और उतनी ही मात्रा में पानी डालें।'
            },
            visualHint: '1:1 ratio of milk and water'
          },
          {
            stepNumber: 2,
            title: {
              en: 'Shake vigorously',
              kn: 'ವೇಗವಾಗಿ ಅಲುಗಾಡಿಸಿ',
              hi: 'तेजी से हिलाएं'
            },
            instruction: {
              en: 'Close the bottle tightly and shake vigorously for 20 seconds.',
              kn: 'ಮುಚ್ಚಳವನ್ನು ಗಟ್ಟಿಯಾಗಿ ಮುಚ್ಚಿ ೨೦ ಸೆಕೆಂಡುಗಳ ಕಾಲ ವೇಗವಾಗಿ ಅಲುಗಾಡಿಸಿ.',
              hi: 'ढक्कन बंद करके 20 सेकंड तक अच्छी तरह जोर से हिलाएं।'
            },
            visualHint: 'Vigorous shaking'
          },
          {
            stepNumber: 3,
            title: {
              en: 'Observe foam height & persistence',
              kn: 'ನೊರೆ ಎತ್ತರ ಮತ್ತು ಸ್ಥಿರತೆ ಗಮನಿಸಿ',
              hi: 'झाग की ऊंचाई और स्थिरता देखें'
            },
            instruction: {
              en: 'Keep the bottle still on a flat table and observe the froth level after 2 to 5 minutes.',
              kn: 'ಬಾಟಲಿಯನ್ನು ಸಮತಟ್ಟಾದ ಮೇಜಿನ ಮೇಲಿಟ್ಟು ೨ ರಿಂದ ೫ ನಿಮಿಷಗಳ ನಂತರ ನೊರೆಯನ್ನು ಗಮನಿಸಿ.',
              hi: 'बोतल को मेज पर रखें और 2 से 5 मिनट बाद झाग का स्तर देखें।'
            },
            visualHint: 'Observation at rest'
          }
        ],
        pureOutcome: {
          en: 'Pure milk forms only a very thin layer of foam that promptly subsides within 60 seconds.',
          kn: 'ಶುದ್ಧ ಹಾಲು ಕೇವಲ ತೆಳುವಾದ ನೊರೆಯ ಲೇಯರ್ ಉಂಟುಮಾಡುತ್ತದೆ ಮತ್ತು ೬೦ ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಕರಗುತ್ತದೆ.',
          hi: 'शुद्ध दूध में बहुत पतली झाग की परत बनती है जो 60 सेकंड में बैठ जाती है।'
        },
        adulteratedOutcome: {
          en: 'Milk adulterated with detergent forms a thick, dense honeycomb lather (>10mm) that remains stable for over 5-10 minutes.',
          kn: 'ಡಿಟರ್ಜೆಂಟ್ ಬೆರೆತ ಹಾಲಿನಲ್ಲಿ ೧೦mm ಗಿಂತ ಹೆಚ್ಚು ದಪ್ಪನೆಯ ನೊರೆ ರೂಪುಗೊಂಡು ೫-೧೦ ನಿಮಿಷಗಳಿಗೂ ಹೆಚ್ಚು ಕಾಲ ಸ್ಥಿರವಾಗಿರುತ್ತದೆ.',
          hi: 'डिटर्जेंट मिले दूध में 10 मिमी से अधिक गाढ़ा झाग बनता है जो 5-10 मिनट तक स्थिर बना रहता है।'
        }
      },
      {
        id: 'milk-slant',
        name: {
          en: 'Slanted Glass Plate Test for Water Dilution',
          kn: 'ನೀರಿನ ಕಲಬೆರಕೆ ಪತ್ತೆಗೆ ಇಳಿಜಾರು ಗಾಜಿನ ಪರೀಕ್ಷೆ',
          hi: 'पानी की मिलावट हेतु झुकी हुई कांच की प्लेट का परीक्षण'
        },
        targetAdulterant: {
          en: 'Excessive Water Dilution',
          kn: 'ಅತಿಯಾದ ನೀರಿನ ಮಿಶ್ರಣ',
          hi: 'अतिरिक्त पानी की मिलावट'
        },
        estimatedMinutes: 2,
        equipment: {
          en: ['A polished slanting glass plate, clean slate or mirror', 'Dropper or spoon'],
          kn: ['ಸ್ವಚ್ಛವಾದ ಇಳಿಜಾರಾದ ಗಾಜು ಅಥವಾ ಕನ್ನಡಿ', 'ಚಮಚ'],
          hi: ['साफ झुका हुआ कांच या दर्पण', 'चम्मच या ड्रॉपर']
        },
        precautions: {
          en: ['Ensure the glass surface is clean, dry, and free of oil films.'],
          kn: ['ಗಾಜಿನ ಮೇಲ್ಮೈ ಶುಷ್ಕ ಮತ್ತು ಎಣ್ಣೆ ಮುಕ್ತವಾಗಿರಬೇಕು.'],
          hi: ['कांच की सतह साफ, सूखी और चिकनाई रहित होनी चाहिए।']
        },
        steps: [
          {
            stepNumber: 1,
            title: {
              en: 'Place a drop of milk',
              kn: 'ಒಂದು ಹನಿ ಹಾಲು ಹಾಕಿ',
              hi: 'दूध की एक बूंद डालें'
            },
            instruction: {
              en: 'Place a drop of milk on the top edge of a polished slanting glass plate.',
              kn: 'ಇಳಿಜಾರಾದ ಗಾಜಿನ ಮೇಲ್ಭಾಗದಲ್ಲಿ ಹಾಲಿನ ಒಂದು ಹನಿಯನ್ನು ಇರಿಸಿ.',
              hi: 'झुकी हुई कांच की प्लेट के ऊपरी किनारे पर दूध की एक बूंद रखें।'
            },
            visualHint: 'Drop at top of slant'
          },
          {
            stepNumber: 2,
            title: {
              en: 'Watch flow rate and white trail',
              kn: 'ಹರಿವು ಮತ್ತು ಬಿಳಿ ಗೆರೆ ಗಮನಿಸಿ',
              hi: 'बहाव की गति और सफेद निशान देखें'
            },
            instruction: {
              en: 'Observe how the drop slides down the slanting surface.',
              kn: 'ಹನಿಯು ಹೇಗೆ ಕೆಳಗೆ ಹರಿಯುತ್ತದೆ ಎಂಬುದನ್ನು ಗಮನಿಸಿ.',
              hi: 'देखें कि बूंद कैसे नीचे बहती है।'
            },
            visualHint: 'Sliding milk trail'
          }
        ],
        pureOutcome: {
          en: 'Pure milk flows slowly leaving behind a distinct white trail mark.',
          kn: 'ಶುದ್ಧ ಹಾಲು ನಿಧಾನವಾಗಿ ಹರಿದು ಸ್ಪಷ್ಟವಾದ ಬಿಳಿ ರೇಖೆಯ ಗುರುತನ್ನು ಬಿಡುತ್ತದೆ.',
          hi: 'शुद्ध दूध धीरे-धीरे बहता है और पीछे एक स्पष्ट सफेद निशान छोड़ता है।'
        },
        adulteratedOutcome: {
          en: 'Milk adulterated with water flows immediately down without leaving any noticeable white trail.',
          kn: 'ನೀರು ಬೆರೆಸಿದ ಹಾಲು ಯಾವುದೇ ಬಿಳಿ ಗುರುತು ಬಿಡದೆ ತಕ್ಷಣವೇ ಸರಕ್ಕನೆ ಹರಿದುಹೋಗುತ್ತದೆ.',
          hi: 'पानी मिला दूध बिना कोई सफेद निशान छोड़े तुरंत नीचे बह जाता है।'
        }
      }
    ]
  },
  {
    id: 'turmeric',
    name: {
      en: 'Turmeric Powder',
      kn: 'ಅರಿಶಿನ ಪುಡಿ',
      hi: 'हल्दी पाउडर'
    },
    tagline: {
      en: 'Golden medicinal kitchen spice with curcumin',
      kn: 'ಕರ್ಕ್ಯುಮಿನ್ ಹೊಂದಿರುವ ಪವಿತ್ರ ಮತ್ತು ಔಷಧೀಯ ಸಂಬಾರ ಪದಾರ್ಥ',
      hi: 'करक्यूमिन युक्त औषधीय और पवित्र मसाला'
    },
    category: {
      en: 'Spices & Condiments',
      kn: 'ಮಸಾಲೆ ಪದಾರ್ಥಗಳು',
      hi: 'मसाले'
    },
    commonAdulterants: {
      en: ['Metanil Yellow Dye', 'Lead Chromate', 'Chalk / Soapstone Powder', 'Starch Flour'],
      kn: ['ಮೆಟಾನಿಲ್ ಹಳದಿ ರಾಸಾಯನಿಕ ಬಣ್ಣ', 'ಲೆಡ್ ಕ್ರೋಮೇಟ್', 'ಸೀಮೆಸುಣ್ಣದ ಪುಡಿ', 'ಹಿಟ್ಟಿನ ಕಲಬೆರಕೆ'],
      hi: ['मेटानिल येलो कृत्रिम रंग', 'लेड क्रोमेट', 'खड़िया / चॉक पाउडर', 'स्टार्च या आटा']
    },
    iconName: 'Sparkles',
    colorScheme: {
      primary: 'bg-amber-500',
      light: 'bg-amber-50',
      badge: 'text-amber-800 bg-amber-100',
      border: 'border-amber-200'
    },
    sampleImages: [
      {
        id: 'turmeric-sample-metanil',
        label: {
          en: 'Adulterated with Metanil Yellow (Suspicious)',
          kn: 'ಮೆಟಾನಿಲ್ ಯೆಲ್ಲೋ ಬೆರೆತ ಅರಿಶಿನ (ಅನುಮಾನಾಸ್ಪದ)',
          hi: 'मेटानिल येलो युक्त हल्दी (संदिग्ध)'
        },
        expectedStatus: 'suspicious',
        description: {
          en: 'Turns bright persistent magenta/pink when acid is added and stays pink after water dilution',
          kn: 'ಆಮ್ಲ ಸೇರಿಸಿದಾಗ ಗಾಢ ಗುಲಾಬಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿ, ನೀರು ಸೇರಿಸಿದ ನಂತರವೂ ಗುಲಾಬಿಯಾಗಿಯೇ ಉಳಿಯುತ್ತದೆ',
          hi: 'एसिड डालने पर गहरा गुलाबी रंग बनता है और पानी मिलाने पर भी गुलाबी ही रहता है'
        },
        dataUrl: turmericMetanilPositiveSvg
      },
      {
        id: 'turmeric-sample-pure',
        label: {
          en: 'Pure Organic Turmeric (Normal)',
          kn: 'ಶುದ್ಧ ಸಾವಯವ ಅರಿಶಿನ (ಸಾಮಾನ್ಯ)',
          hi: 'शुद्ध हल्दी पाउडर (सामान्य)'
        },
        expectedStatus: 'normal',
        description: {
          en: 'Settles naturally to the bottom leaving light yellow water above; shifts back to golden yellow on dilution',
          kn: 'ನೈಸರ್ಗಿಕವಾಗಿ ತಳದಲ್ಲಿ ಸಂಗ್ರಹವಾಗಿ ಮೇಲೆ ತಿಳಿ ಹಳದಿ ನೀರನ್ನು ಬಿಡುತ್ತದೆ; ನೀರು ಸೇರಿಸಿದಾಗ ಹಳದಿಗೆ ಮರಳುತ್ತದೆ',
          hi: 'तली में बैठ जाती है और पानी हल्का पीला रहता है; तनु करने पर वापस पीला रंग आ जाता है'
        },
        dataUrl: turmericPureSampleSvg
      }
    ],
    dartTests: [
      {
        id: 'turmeric-metanil',
        name: {
          en: 'Metanil Yellow Chemical Dye Test',
          kn: 'ಮೆಟಾನಿಲ್ ಹಳದಿ ರಾಸಾಯನಿಕ ಬಣ್ಣ ಪರೀಕ್ಷೆ',
          hi: 'मेटानिल येलो रासायनिक रंग परीक्षण'
        },
        targetAdulterant: {
          en: 'Metanil Yellow (Carcinogenic Industrial Coal-Tar Dye)',
          kn: 'ಮೆಟಾನಿಲ್ ಯೆಲ್ಲೋ (ಕ್ಯಾನ್ಸರ್‌ಕಾರಕ ರಾಸಾಯನಿಕ ಬಣ್ಣ)',
          hi: 'मेटानिल येलो (कैंसरकारी औद्योगिक रंग)'
        },
        estimatedMinutes: 2,
        equipment: {
          en: ['Glass tumbler or test tube', 'Warm water', '1 tsp Turmeric sample', 'Few drops of concentrated Lemon Juice, Vinegar, or mild Hydrochloric acid'],
          kn: ['ಗಾಜಿನ ಲೋಟ', 'ಬೆಚ್ಚಗಿನ ನೀರು', '೧ ಚಮಚ ಅರಿಶಿನ ಪುಡಿ', 'ಕೆಲವು ಹನಿ ನಿಂಬೆ ರಸ ಅಥವಾ ವಿನೆಗರ್'],
          hi: ['कांच का गिलास या परखनली', 'हल्का गुनगुना पानी', '1 चम्मच हल्दी', 'नींबू का रस, सिरका या हाइड्रोक्लोरिक एसिड की कुछ बूंदें']
        },
        precautions: {
          en: ['Avoid direct skin contact if using laboratory acid; wear gloves.', 'Metanil yellow is toxic to the liver; do not consume suspicious samples.'],
          kn: ['ರಾಸಾಯನಿಕ ಆಮ್ಲ ಬಳಸುವಾಗ ಕೈಗವಸು ಧರಿಸಿ.', 'ಮೆಟಾನಿಲ್ ಯೆಲ್ಲೋ ಯಕೃತ್ತಿಗೆ ಹಾನಿಕಾರಕ, ಸೇವಿಸಬೇಡಿ.'],
          hi: ['एसिड का उपयोग करते समय दस्ताने पहनें।', 'मेटानिल येलो लिवर के लिए अत्यधिक हानिकारक है, इसे न खाएं।']
        },
        steps: [
          {
            stepNumber: 1,
            title: {
              en: 'Dissolve in warm water',
              kn: 'ಬೆಚ್ಚಗಿನ ನೀರಿನಲ್ಲಿ ಕರಗಿಸಿ',
              hi: 'गुनगुने पानी में घोलें'
            },
            instruction: {
              en: 'Add a teaspoon of turmeric powder to a half glass of warm water and stir well.',
              kn: 'ಅರ್ಧ ಲೋಟ ಬೆಚ್ಚಗಿನ ನೀರಿಗೆ ಒಂದು ಚಮಚ ಅರಿಶಿನ ಪುಡಿ ಹಾಕಿ ಚೆನ್ನಾಗಿ ಕಲಕಿ.',
              hi: 'आधे गिलास गुनगुने पानी में एक चम्मच हल्दी पाउडर डालकर अच्छी तरह मिलाएं।'
            },
            visualHint: 'Yellowish water suspension'
          },
          {
            stepNumber: 2,
            title: {
              en: 'Add acid drops',
              kn: 'ಆಮ್ಲದ ಹನಿಗಳನ್ನು ಸೇರಿಸಿ',
              hi: 'एसिड की बूंदें डालें'
            },
            instruction: {
              en: 'Add 4 to 5 drops of concentrated lemon juice, vinegar, or diluted hydrochloric acid.',
              kn: '೪-೫ ಹನಿ ನಿಂಬೆ ರಸ ಅಥವಾ ವಿನೆಗರ್ ಅನ್ನು ಸೇರಿಸಿ.',
              hi: 'नींबू के रस या सिरके की 4-5 बूंदें डालें।'
            },
            visualHint: 'Dropper adding acid'
          },
          {
            stepNumber: 3,
            title: {
              en: 'Dilute with fresh water',
              kn: 'ಮತ್ತಷ್ಟು ನೀರು ಸೇರಿಸಿ',
              hi: 'और पानी मिलाएं'
            },
            instruction: {
              en: 'Observe the color change. Then add more water to check if the color reverts.',
              kn: 'ಬಣ್ಣದ ಬದಲಾವಣೆ ಗಮನಿಸಿ. ನಂತರ ಮತ್ತಷ್ಟು ನೀರು ಸೇರಿಸಿ ಬಣ್ಣ ಹಳದಿಗೆ ಮರಳುತ್ತದೆಯೇ ನೋಡಿ.',
              hi: 'रंग परिवर्तन देखें। फिर और पानी डालकर देखें कि क्या रंग वापस बदलता है।'
            },
            visualHint: 'Color dilution'
          }
        ],
        pureOutcome: {
          en: 'Pure turmeric may temporarily darken slightly, but immediately returns to its authentic light yellow color upon diluting with water.',
          kn: 'ಶುದ್ಧ ಅರಿಶಿನವು ನೀರನ್ನು ಸೇರಿಸಿದ ತಕ್ಷಣವೇ ತನ್ನ ನೈಸರ್ಗಿಕ ತಿಳಿ ಹಳದಿ ಬಣ್ಣಕ್ಕೆ ಮರಳುತ್ತದೆ.',
          hi: 'शुद्ध हल्दी पानी मिलाने पर तुरंत अपने प्राकृतिक हल्के पीले रंग में लौट आती है।'
        },
        adulteratedOutcome: {
          en: 'Adulterated turmeric turns an intense bright magenta or violet-pink and stays distinctly pink even after substantial water dilution.',
          kn: 'ಕಲಬೆರಕೆ ಅರಿಶಿನವು ತೀವ್ರವಾದ ಮೆಜೆಂಟಾ ಅಥವಾ ಗುಲಾಬಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿ, ನೀರು ಸೇರಿಸಿದ ನಂತರವೂ ಗುಲಾಬಿಯಾಗಿಯೇ ಉಳಿಯುತ್ತದೆ.',
          hi: 'मिलावटी हल्दी गहरा मैजेंटा या गुलाबी हो जाती है और पानी मिलाने के बाद भी गुलाबी बनी रहती है।'
        }
      },
      {
        id: 'turmeric-sediment',
        name: {
          en: 'Water Settling & Chalk Powder Test',
          kn: 'ನೀರಿನ ತಳ ಶೇಖರಣೆ ಮತ್ತು ಸೀಮೆಸುಣ್ಣ ಪರೀಕ್ಷೆ',
          hi: 'पानी में तलछट व खड़िया पाउडर परीक्षण'
        },
        targetAdulterant: {
          en: 'Chalk Powder, Talc & Yellow Soapstone',
          kn: 'ಸೀಮೆಸುಣ್ಣ, ಟಾಲ್ಕ್ ಮತ್ತು ಸೋಪ್‌ಸ್ಟೋನ್',
          hi: 'खड़िया, टैल्क और सोपस्टोन पाउडर'
        },
        estimatedMinutes: 3,
        equipment: {
          en: ['Clear glass tumbler', 'Lukewarm water', '1 teaspoon Turmeric'],
          kn: ['ಪಾರದರ್ಶಕ ಗಾಜಿನ ಲೋಟ', 'ಉಗುರುಬೆಚ್ಚಗಿನ ನೀರು', '೧ ಚಮಚ ಅರಿಶಿನ'],
          hi: ['पारदर्शी कांच का गिलास', 'गुनगुना पानी', '1 चम्मच हल्दी']
        },
        precautions: {
          en: ['Leave the glass completely undisturbed during the settling phase.'],
          kn: ['ತಳ ಶೇಖರಣೆಯ ಸಮಯದಲ್ಲಿ ಲೋಟವನ್ನು ಅಲುಗಾಡಿಸಬೇಡಿ.'],
          hi: ['सेटल होने के दौरान गिलास को बिल्कुल न हिलाएं।']
        },
        steps: [
          {
            stepNumber: 1,
            title: {
              en: 'Add to clear water',
              kn: 'ಸ್ವಚ್ಛ ನೀರಿಗೆ ಸೇರಿಸಿ',
              hi: 'साफ पानी में डालें'
            },
            instruction: {
              en: 'Fill a glass tumbler with water and gently sprinkle 1 tsp turmeric powder on the top without stirring.',
              kn: 'ಲೋಟದಲ್ಲಿ ನೀರು ತುಂಬಿಸಿ, ಕಲಕದೆ ಮೇಲ್ಭಾಗದಲ್ಲಿ ೧ ಚಮಚ ಅರಿಶಿನ ಪುಡಿಯನ್ನು ಉದುರಿಸಿ.',
              hi: 'गिलास में पानी भरें और बिना हिलाए ऊपर से 1 चम्मच हल्दी पाउडर छिड़कें।'
            },
            visualHint: 'Turmeric settling gently'
          },
          {
            stepNumber: 2,
            title: {
              en: 'Allow 2 minutes to settle',
              kn: '೨ ನಿಮಿಷ ಕಾಲ ಬಿಡಿ',
              hi: '2 मिनट बैठने दें'
            },
            instruction: {
              en: 'Leave undisturbed for 2-3 minutes. Observe water clarity in the upper column.',
              kn: '೨-೩ ನಿಮಿಷ ಹಾಗೆಯೇ ಬಿಡಿ. ಮೇಲಿನ ನೀರಿನ ಪಾರದರ್ಶಕತೆಯನ್ನು ಗಮನಿಸಿ.',
              hi: '2-3 मिनट बिना छुए छोड़ दें। ऊपर के पानी का रंग देखें।'
            },
            visualHint: 'Layer separation'
          }
        ],
        pureOutcome: {
          en: 'Pure turmeric settles slowly to the bottom leaving the upper water translucent light yellow.',
          kn: 'ಶುದ್ಧ ಅರಿಶಿನವು ತಳದಲ್ಲಿ ನಿಧಾನವಾಗಿ ಸಂಗ್ರಹವಾಗಿ, ಮೇಲಿನ ನೀರು ತಿಳಿ ಹಳದಿಯಾಗಿ ಪಾರದರ್ಶಕವಾಗಿರುತ್ತದೆ.',
          hi: 'शुद्ध हल्दी धीरे-धीरे नीचे बैठ जाती है और ऊपर का पानी पारदर्शी हल्का पीला रहता है।'
        },
        adulteratedOutcome: {
          en: 'Adulterated sample leaves the water permanently milky turbid with an immediate heavy chalky layer at the bottom.',
          kn: 'ಕಲಬೆರಕೆ ಮಾದರಿಯಲ್ಲಿ ನೀರು ಬೆಳ್ಳಗೆ ಮಬ್ಬಾಗಿ ಉಳಿಯುತ್ತದೆ ಮತ್ತು ತಳದಲ್ಲಿ ಸೀಮೆಸುಣ್ಣದ ಶೇಖರಣೆ ಕಾಣುತ್ತದೆ.',
          hi: 'मिलावटी नमूने में पानी मटमैला और दूधिया हो जाता है तथा तली में खड़िया की भारी परत बैठ जाती है।'
        }
      }
    ]
  },
  {
    id: 'chilli',
    name: {
      en: 'Chilli Powder',
      kn: 'ಖಾರದ ಪುಡಿ',
      hi: 'लाल मिर्च पाउडर'
    },
    tagline: {
      en: 'Pungent red spice essential for curries and sambar',
      kn: 'ಸಾರು ಮತ್ತು ಪಲ್ಯಗಳಿಗೆ ಅತ್ಯಗತ್ಯವಾದ ಕೆಂಪು ಮೆಣಸಿನ ಪುಡಿ',
      hi: 'सब्जियों और सांभर के लिए आवश्यक तीखा लाल मसाला'
    },
    category: {
      en: 'Spices & Condiments',
      kn: 'ಮಸಾಲೆ ಪದಾರ್ಥಗಳು',
      hi: 'मसाले'
    },
    commonAdulterants: {
      en: ['Brick Powder', 'Sudan Red / Coal Tar Dyes', 'Soapstone Powder', 'Sawdust'],
      kn: ['ಇಟ್ಟಿಗೆ ಪುಡಿ', 'ಸುಡಾನ್ ರೆಡ್ ರಾಸಾಯನಿಕ ಬಣ್ಣ', 'ಸೋಪ್‌ಸ್ಟೋನ್ ಕಲ್ಲು ಪುಡಿ', 'ಮರದ ಪುಡಿ'],
      hi: ['ईंट का चूरा', 'सूडान रेड कृत्रिम रंग', 'सोपस्टोन पाउडर', 'लकड़ी का बुरादा']
    },
    iconName: 'Flame',
    colorScheme: {
      primary: 'bg-red-600',
      light: 'bg-red-50',
      badge: 'text-red-700 bg-red-100',
      border: 'border-red-200'
    },
    sampleImages: [
      {
        id: 'chilli-sample-brick',
        label: {
          en: 'Chilli with Brick Dust (Suspicious)',
          kn: 'ಇಟ್ಟಿಗೆ ಪುಡಿ ಬೆರೆತ ಮೆಣಸಿನ ಪುಡಿ (ಅನುಮಾನಾಸ್ಪದ)',
          hi: 'ईंट का चूरा मिली मिर्च (संदिग्ध)'
        },
        expectedStatus: 'suspicious',
        description: {
          en: 'Heavy gritty mineral sediment instantly drops to the bottom with scratches on glass',
          kn: 'ಭಾರವಾದ ಇಟ್ಟಿಗೆ ಕಣಗಳು ತಕ್ಷಣವೇ ತಳದಲ್ಲಿ ಸಂಗ್ರಹವಾಗಿ ಗಾಜನ್ನು ಗೀಚುತ್ತವೆ',
          hi: 'भारी कंकड़नुमा ईंट का चूरा तुरंत तली में बैठ जाता है और कांच पर खुरचता है'
        },
        dataUrl: chilliBrickPositiveSvg
      },
      {
        id: 'chilli-sample-pure',
        label: {
          en: 'Pure Kashmiri Chilli (Normal)',
          kn: 'ಶುದ್ಧ ಕಾಶ್ಮೀರಿ ಮೆಣಸಿನ ಪುಡಿ (ಸಾಮಾನ್ಯ)',
          hi: 'शुद्ध लाल मिर्च पाउडर (सामान्य)'
        },
        expectedStatus: 'normal',
        description: {
          en: 'Light spice flakes float smoothly on water surface with slow natural carotenoid dispersion',
          kn: 'ಮಸಾಲೆ ಕಣಗಳು ನೀರಿನ ಮೇಲ್ಮೈಯಲ್ಲಿ ತೇಲುತ್ತವೆ ಮತ್ತು ನಿಧಾನವಾಗಿ ನೈಸರ್ಗಿಕ ಬಣ್ಣ ಬಿಡುತ್ತವೆ',
          hi: 'मिर्च के हल्के कण सतह पर तैरते हैं और धीरे-धीरे प्राकृतिक रंग छोड़ते हैं'
        },
        dataUrl: chilliPureSampleSvg
      }
    ],
    dartTests: [
      {
        id: 'chilli-brick',
        name: {
          en: 'Water Sedimentation & Glass Rub Test',
          kn: 'ನೀರಿನ ತಳ ಶೇಖರಣೆ ಮತ್ತು ಗೀಚು ಪರೀಕ್ಷೆ',
          hi: 'जल अवसादन व कांच घर्षण परीक्षण'
        },
        targetAdulterant: {
          en: 'Brick Powder, Gritty Sand & Soapstone',
          kn: 'ಇಟ್ಟಿಗೆ ಪುಡಿ, ಮರಳು ಮತ್ತು ಕಲ್ಲು ಪುಡಿ',
          hi: 'ईंट का चूरा, रेत व सोपस्टोन'
        },
        estimatedMinutes: 2,
        equipment: {
          en: ['Glass of clear water', '1 tsp chilli powder', 'Clean spoon'],
          kn: ['ಒಂದು ಲೋಟ ನೀರು', '೧ ಚಮಚ ಖಾರದ ಪುಡಿ', 'ಚಮಚ'],
          hi: ['एक गिलास साफ पानी', '1 चम्मच लाल मिर्च पाउडर', 'चम्मच']
        },
        precautions: {
          en: ['Wash hands thoroughly after handling chilli powder; avoid rubbing eyes.'],
          kn: ['ಖಾರದ ಪುಡಿ ಮುಟ್ಟಿದ ನಂತರ ಕೈಗಳನ್ನು ಚೆನ್ನಾಗಿ ತೊಳೆಯಿರಿ; ಕಣ್ಣು ಮುಟ್ಟಬೇಡಿ.'],
          hi: ['मिर्च छूने के बाद हाथ अच्छी तरह धोएं, आंखों को न छुएं।']
        },
        steps: [
          {
            stepNumber: 1,
            title: {
              en: 'Pour into water',
              kn: 'ನೀರಿಗೆ ಹಾಕಿ',
              hi: 'पानी में डालें'
            },
            instruction: {
              en: 'Add a teaspoon of chilli powder into a glass of clean water without stirring.',
              kn: 'ಸ್ವಚ್ಛ ನೀರಿನ ಲೋಟಕ್ಕೆ ಒಂದು ಚಮಚ ಖಾರದ ಪುಡಿಯನ್ನು ಕಲಕದೆ ಹಾಕಿ.',
              hi: 'साफ पानी से भरे गिलास में 1 चम्मच मिर्च पाउडर बिना हिलाए डालें।'
            },
            visualHint: 'Powder sprinkled on water'
          },
          {
            stepNumber: 2,
            title: {
              en: 'Observe sinking particles',
              kn: 'ತಳ ಸೇರುವ ಕಣಗಳನ್ನು ಗಮನಿಸಿ',
              hi: 'नीचे बैठने वाले कण देखें'
            },
            instruction: {
              en: 'Check if dense red particles fall rapidly to the bottom.',
              kn: 'ಭಾರವಾದ ಕೆಂಪು ಕಣಗಳು ಶೀಘ್ರವಾಗಿ ತಳ ಸೇರುತ್ತವೆಯೇ ಗಮನಿಸಿ.',
              hi: 'देखें कि क्या भारी लाल कण तेजी से तली में गिरते हैं।'
            },
            visualHint: 'Sediment falling'
          },
          {
            stepNumber: 3,
            title: {
              en: 'Rub sediment on glass',
              kn: 'ತಳದ ಕಣಗಳನ್ನು ಉಜ್ಜಿ ನೋಡಿ',
              hi: 'तलछट को कांच पर रगड़ें'
            },
            instruction: {
              en: 'Dip a finger, touch the sediment at the bottom and rub it against the glass wall. Check for a harsh gritty, scratching sensation.',
              kn: 'ಬೆರಳಿನಿಂದ ತಳದ ಕಣಗಳನ್ನು ಮುಟ್ಟಿ ಗಾಜಿನ ಗೋಡೆಗೆ ಉಜ್ಜಿ, ಕರಕರ ಎನ್ನುವ ಕಲ್ಲಿನ ಅನುಭವ ಬರುತ್ತದೆಯೇ ನೋಡಿ.',
              hi: 'उंगली से तली की तलछट को छूकर कांच की दीवार पर रगड़ें और खुरदुरापन महसूस करें।'
            },
            visualHint: 'Fingertip gritty check'
          }
        ],
        pureOutcome: {
          en: 'Pure chilli powder stays floating on top; any minimal residue feels soft and smooth with no scratchy sand feel.',
          kn: 'ಶುದ್ಧ ಖಾರದ ಪುಡಿ ನೀರಿನ ಮೇಲೆ ತೇಲುತ್ತದೆ; ತಳದಲ್ಲಿ ಯಾವುದೇ ಕರಕರ ಎನ್ನುವ ಇಟ್ಟಿಗೆ ಕಣಗಳಿರುವುದಿಲ್ಲ.',
          hi: 'शुद्ध मिर्च सतह पर तैरती है और छूने पर बिल्कुल चिकनी महसूस होती है, कोई खुरदुरापन नहीं होता।'
        },
        adulteratedOutcome: {
          en: 'Brick powder immediately plunges to the bottom, feels distinctly gritty and grates scratchily against glass.',
          kn: 'ಇಟ್ಟಿಗೆ ಪುಡಿ ತಕ್ಷಣವೇ ತಳಕ್ಕೆ ಬೀಳುತ್ತದೆ ಮತ್ತು ಬೆರಳಿನಲ್ಲಿ ಉಜ್ಜಿದಾಗ ಕಲ್ಲಿನಂತೆ ಗಾಜನ್ನು ಗೀಚುತ್ತದೆ.',
          hi: 'ईंट का चूरा तुरंत नीचे गिर जाता है और कांच पर रगड़ने पर खुरचाहट की आवाज और अहसास होता है।'
        }
      }
    ]
  },
  {
    id: 'oil',
    name: {
      en: 'Cooking Oil',
      kn: 'ಅಡುಗೆ ಎಣ್ಣೆ',
      hi: 'खाद्य तेल'
    },
    tagline: {
      en: 'Mustard, sunflower & groundnut cooking oils',
      kn: 'ಸಾಸಿವೆ, ಸೂರ್ಯಕಾಂತಿ ಮತ್ತು ಕಡಲೆಕಾಯಿ ಅಡುಗೆ ಎಣ್ಣೆ',
      hi: 'सरसों, मूंगफली व सूरजमुखी खाद्य तेल'
    },
    category: {
      en: 'Oils & Fats',
      kn: 'ಎಣ್ಣೆ ಮತ್ತು ಕೊಬ್ಬುಗಳು',
      hi: 'तेल एवं वसा'
    },
    commonAdulterants: {
      en: ['Argemone (Mexican Poppy) Oil', 'Cheap Mineral Oil / Paraffin', 'Castor Oil', 'Rancid Recycled Oil'],
      kn: ['ಅರ್ಗೆಮೋನ್ ವಿಷಕಾರಿ ಎಣ್ಣೆ', 'ಖನಿಜ ತೈಲ / ಪ್ಯಾರಾಫಿನ್', 'ಹರಳೆಣ್ಣೆ', 'ಮರುಬಳಕೆಯ ಹಾನಿಕಾರಕ ಎಣ್ಣೆ'],
      hi: ['आर्गेमोन (सत्यानाशी) का विषैला तेल', 'सस्ता मिनरल ऑयल / पैराफिन', 'अरंडी का तेल', 'प्रयुक्त जला हुआ तेल']
    },
    iconName: 'Droplet',
    colorScheme: {
      primary: 'bg-emerald-600',
      light: 'bg-emerald-50',
      badge: 'text-emerald-700 bg-emerald-100',
      border: 'border-emerald-200'
    },
    sampleImages: [
      {
        id: 'oil-sample-argemone',
        label: {
          en: 'Oil with Argemone (High Risk)',
          kn: 'ಅರ್ಗೆಮೋನ್ ಬೆರೆತ ಎಣ್ಣೆ (ಹೆಚ್ಚಿನ ಅಪಾಯ)',
          hi: 'आर्गेमोन युक्त तेल (अत्यधिक जोखिम)'
        },
        expectedStatus: 'suspicious',
        description: {
          en: 'Crimson-red or reddish-brown ring develops at the interface between the acid and oil layer',
          kn: 'ಆಮ್ಲ ಮತ್ತು ಎಣ್ಣೆಯ ಸಂಪರ್ಕ ಪದರದಲ್ಲಿ ಗಾಢ ಕೆಂಪು ವೃತ್ತದ ರೇಖೆ ಮೂಡುತ್ತದೆ',
          hi: 'एसिड और तेल की परत के मिलन स्थल पर गहरा लाल छल्ला बनता है'
        },
        dataUrl: oilArgemonePositiveSvg
      },
      {
        id: 'oil-sample-pure',
        label: {
          en: 'Pure Mustard/Sunflower Oil (Normal)',
          kn: 'ಶುದ್ಧ ಸಾಸಿವೆ/ಸೂರ್ಯಕಾಂತಿ ಎಣ್ಣೆ (ಸಾಮಾನ್ಯ)',
          hi: 'शुद्ध सरसों/सूरजमुखी तेल (सामान्य)'
        },
        expectedStatus: 'normal',
        description: {
          en: 'Uniform golden amber clarity with no reddish discoloration or turbidity',
          kn: 'ಯಾವುದೇ ಕೆಂಪು ಗೆರೆ ಇಲ್ಲದೆ ಸಮಾನವಾದ ಹೊಳೆಯುವ ಬಂಗಾರದ ಬಣ್ಣ',
          hi: 'बिना किसी लाल निशान के एक समान पारदर्शी सुनहरा रंग'
        },
        dataUrl: oilPureSampleSvg
      }
    ],
    dartTests: [
      {
        id: 'oil-argemone',
        name: {
          en: 'Acid Layer Test for Argemone Oil',
          kn: 'ಅರ್ಗೆಮೋನ್ ಎಣ್ಣೆ ಪತ್ತೆಗೆ ಆಮ್ಲ ಪರೀಕ್ಷೆ',
          hi: 'आर्गेमोन तेल की जांच हेतु एसिड परीक्षण'
        },
        targetAdulterant: {
          en: 'Argemone Mexicana Oil (Causes Epidemic Dropsy, Cardiac Failure & Blindness)',
          kn: 'ಅರ್ಗೆಮೋನ್ ಎಣ್ಣೆ (ಹೃದಯ ವೈಫಲ್ಯ ಮತ್ತು ಕುರುಡುತನ ಉಂಟುಮಾಡುತ್ತದೆ)',
          hi: 'आर्गेमोन तेल (महामारी ड्रॉप्सी, हृदय रोग व अंधापन कारक)'
        },
        estimatedMinutes: 4,
        equipment: {
          en: ['Small transparent glass tube or vial', '5ml cooking oil sample', '5ml concentrated Nitric Acid or strong household vinegar with a drop of lemon'],
          kn: ['ಸಣ್ಣ ಪಾರದರ್ಶಕ ಗಾಜಿನ ಬಾಟಲ್', '೫ ಮಿ.ಲೀ ಅಡುಗೆ ಎಣ್ಣೆ', '೫ ಮಿ.ಲೀ ಆಮ್ಲ ಅಥವಾ ಪ್ರಬಲ ವಿನೆಗರ್'],
          hi: ['छोटी कांच की शीशी', '5 मिली खाद्य तेल', '5 मिली नाइट्रिक एसिड या तेज सिरका']
        },
        precautions: {
          en: ['Argemone oil is extremely hazardous to public health. Under no circumstance should suspected oil be consumed.'],
          kn: ['ಅರ್ಗೆಮೋನ್ ಎಣ್ಣೆ ಅತ್ಯಂತ ಮಾರಕ ವಿಷ. ಸಂಶಯವಿರುವ ಎಣ್ಣೆಯನ್ನು ಯಾವುದೇ ಕಾರಣಕ್ಕೂ ಸೇವಿಸಬೇಡಿ.'],
          hi: ['आर्गेमोन तेल स्वास्थ्य के लिए अत्यंत विषैला है। संदिग्ध तेल का बिल्कुल सेवन न करें।']
        },
        steps: [
          {
            stepNumber: 1,
            title: {
              en: 'Mix oil and acid',
              kn: 'ಎಣ್ಣೆ ಮತ್ತು ಆಮ್ಲ ಮಿಶ್ರಣ ಮಾಡಿ',
              hi: 'तेल और एसिड मिलाएं'
            },
            instruction: {
              en: 'Take 5 ml of cooking oil in a test vial and gently add 5 ml of nitric acid along the inner glass wall.',
              kn: 'ಗಾಜಿನ ಬಾಟಲಿಯಲ್ಲಿ ೫ ಮಿ.ಲೀ ಎಣ್ಣೆ ತೆಗೆದುಕೊಂಡು ನಿಧಾನವಾಗಿ ೫ ಮಿ.ಲೀ ಆಮ್ಲವನ್ನು ಬದಿಯಿಂದ ಸುರಿಯಿರಿ.',
              hi: 'शीशी में 5 मिली तेल लें और दीवार के सहारे धीरे-धीरे 5 मिली एसिड डालें।'
            },
            visualHint: 'Two distinct liquid layers'
          },
          {
            stepNumber: 2,
            title: {
              en: 'Shake gently and let stand',
              kn: 'ಮೆಲ್ಲಗೆ ಕಲಕಿ ನಿಲ್ಲಿಸಿ',
              hi: 'हल्का हिलाकर स्थिर रखें'
            },
            instruction: {
              en: 'Shake gently for 10 seconds, then keep it standing still for 2 minutes to separate.',
              kn: '೧೦ ಸೆಕೆಂಡ್ ಮೆಲ್ಲಗೆ ಕಲಕಿ, ೨ ನಿಮಿಷ ಕದಲದೆ ಇರಿಸಿ ಪದರಗಳು ಬೇರ್ಪಡಲು ಬಿಡಿ.',
              hi: '10 सेकंड धीरे से हिलाएं, फिर 2 मिनट तक स्थिर रखकर परतें अलग होने दें।'
            },
            visualHint: 'Observing junction layer'
          }
        ],
        pureOutcome: {
          en: 'No color change occurs at the junction of the two layers; the oil maintains its natural golden amber tint.',
          kn: 'ಎರಡು ಪದರಗಳ ಮಧ್ಯೆ ಯಾವುದೇ ಬಣ್ಣ ಬದಲಾವಣೆ ಆಗುವುದಿಲ್ಲ; ಎಣ್ಣೆಯ ನೈಸರ್ಗಿಕ ಬಣ್ಣ ಹಾಗೆಯೇ ಇರುತ್ತದೆ.',
          hi: 'दोनों परतों के मिलन बिंदु पर कोई रंग नहीं बदलता, तेल का प्राकृतिक रंग बना रहता है।'
        },
        adulteratedOutcome: {
          en: 'A distinct crimson red or reddish-brown color develops at the interface between the acid and oil, indicating toxic argemone.',
          kn: 'ಎರಡು ಪದರಗಳ ನಡುವೆ ಗಾಢ ಕೆಂಪು ಅಥವಾ ಕೆಂಗಂದು ರೇಖೆ ಮೂಡುತ್ತದೆ, ಇದು ಅರ್ಗೆಮೋನ್ ವಿಷವನ್ನು ಸಾಬೀತುಪಡಿಸುತ್ತದೆ.',
          hi: 'परतों के बीच गहरा लाल या भूरा-लाल छल्ला बन जाता है, जो विषैले आर्गेमोन की उपस्थिति दर्शाता है।'
        }
      }
    ]
  },
  {
    id: 'rice',
    name: {
      en: 'Rice',
      kn: 'ಅಕ್ಕಿ',
      hi: 'चावल'
    },
    tagline: {
      en: 'Primary Indian staple grain (Sona Masoori, Basmati)',
      kn: 'ಭಾರತೀಯರ ಪ್ರಮುಖ ಅನ್ನದ ಧಾನ್ಯ (ಸೋನಾ ಮಸೂರಿ, ಬಾಸ್ಮತಿ)',
      hi: 'भारतीय भोजन का मुख्य अनाज (सोना मसूरी, बासमती)'
    },
    category: {
      en: 'Cereals & Grains',
      kn: 'ಧಾನ್ಯಗಳು',
      hi: 'अनाज'
    },
    commonAdulterants: {
      en: ['Plastic Rice Polymers', 'Paraffin Wax / Talc Polish', 'Foreign Starch Pellets'],
      kn: ['ಪ್ಲಾಸ್ಟಿಕ್ ಅಕ್ಕಿ', 'ಪ್ಯಾರಾಫಿನ್ ಮೇಣ / ಟಾಲ್ಕ್ ಪಾಲಿಶ್', 'ಕೃತಕ ಪಿಷ್ಟದ ಕಾಳುಗಳು'],
      hi: ['प्लास्टिक चावल', 'पैराफिन वैक्स / टैल्क पॉलिश', 'कृत्रिम स्टार्च गोलियां']
    },
    iconName: 'Wheat',
    colorScheme: {
      primary: 'bg-teal-600',
      light: 'bg-teal-50',
      badge: 'text-teal-700 bg-teal-100',
      border: 'border-teal-200'
    },
    sampleImages: [
      {
        id: 'rice-sample-plastic',
        label: {
          en: 'Synthetic Floating Rice (Suspicious)',
          kn: 'ತೇಲುವ ಪ್ಲಾಸ್ಟಿಕ್ ಅಕ್ಕಿ (ಅನುಮಾನಾಸ್ಪದ)',
          hi: 'तैरता हुआ प्लास्टिक चावल (संदिग्ध)'
        },
        expectedStatus: 'suspicious',
        description: {
          en: 'Grains float on water surface due to synthetic polymer density and melt under flame with chemical smell',
          kn: 'ಕೃತಕ ಪಾಲಿಮರ್ ಕಾರಣ ಧಾನ್ಯಗಳು ನೀರಿನ ಮೇಲೆ ತೇಲುತ್ತವೆ ಮತ್ತು ಬೆಂಕಿಯಲ್ಲಿ ಪ್ಲಾಸ್ಟಿಕ್ ವಾಸನೆಯೊಂದಿಗೆ ಕರಗುತ್ತವೆ',
          hi: 'हल्के घनत्व के कारण दाने पानी पर तैरते हैं और आग में प्लास्टिक की बदबू के साथ पिघलते हैं'
        },
        dataUrl: ricePlasticPositiveSvg
      },
      {
        id: 'rice-sample-pure',
        label: {
          en: 'Authentic Paddy Rice (Normal)',
          kn: 'ನೈಸರ್ಗಿಕ ಭತ್ತದ ಅಕ್ಕಿ (ಸಾಮಾನ್ಯ)',
          hi: 'प्राकृतिक धान का चावल (सामान्य)'
        },
        expectedStatus: 'normal',
        description: {
          en: 'Heavy starchy grains sink promptly to the container bottom and char naturally to brittle black ash under flame',
          kn: 'ನೈಸರ್ಗಿಕ ಧಾನ್ಯಗಳು ತಕ್ಷಣವೇ ನೀರಿನ ತಳ ಸೇರುತ್ತವೆ ಮತ್ತು ಬೆಂಕಿಯಲ್ಲಿ ಸುಟ್ಟಾಗ ನೈಸರ್ಗಿಕ ಬೂದಿಯಾಗುತ್ತವೆ',
          hi: 'प्राकृतिक दाने तुरंत तली में डूब जाते हैं और आग में जलकर सामान्य राख बन जाते हैं'
        },
        dataUrl: ricePureSampleSvg
      }
    ],
    dartTests: [
      {
        id: 'rice-water-sink',
        name: {
          en: 'Water Density Sink & Float Test',
          kn: 'ನೀರಿನ ಸಾಂದ್ರತೆ ಮುಳುಗುವಿಕೆ ಪರೀಕ್ಷೆ',
          hi: 'पानी में डूबने व तैरने का घनत्व परीक्षण'
        },
        targetAdulterant: {
          en: 'Plastic Polymer Synthetic Grains',
          kn: 'ಪ್ಲಾಸ್ಟಿಕ್ ಪಾಲಿಮರ್ ಕೃತಕ ಕಾಳುಗಳು',
          hi: 'प्लास्टिक पॉलीमर कृत्रिम दाने'
        },
        estimatedMinutes: 2,
        equipment: {
          en: ['Bowl of water', 'Handful of raw rice grains'],
          kn: ['ಒಂದು ಬಟ್ಟಲು ನೀರು', 'ಒಂದು ಹಿಡಿ ಅಕ್ಕಿ ಕಾಳುಗಳು'],
          hi: ['पानी से भरा कटोरा', 'एक मुट्ठी कच्चे चावल के दाने']
        },
        precautions: {
          en: ['Use cold or room temperature tap water.'],
          kn: ['ಸಾಮಾನ್ಯ ತಣ್ಣೀರನ್ನು ಬಳಸಿ.'],
          hi: ['सामान्य कमरे के तापमान का पानी उपयोग करें।']
        },
        steps: [
          {
            stepNumber: 1,
            title: {
              en: 'Drop rice in water',
              kn: 'ನೀರಿಗೆ ಅಕ್ಕಿ ಹಾಕಿ',
              hi: 'चावल पानी में डालें'
            },
            instruction: {
              en: 'Take a tablespoon of raw rice grains and drop them into a deep bowl filled with water.',
              kn: 'ಒಂದು ಚಮಚ ಅಕ್ಕಿಯನ್ನು ನೀರಿನ ಬಟ್ಟಲಿಗೆ ಹಾಕಿ.',
              hi: 'एक चम्मच चावल के दाने पानी से भरे कटोरे में डालें।'
            },
            visualHint: 'Grains dropped in water'
          },
          {
            stepNumber: 2,
            title: {
              en: 'Stir and observe buoyancy',
              kn: 'ಕಲಕಿ ತೇಲುವಿಕೆ ಗಮನಿಸಿ',
              hi: 'हिलाकर तैरना देखें'
            },
            instruction: {
              en: 'Stir vigorously for 5 seconds and let the water settle. Watch whether grains sink or stay afloat.',
              kn: '೫ ಸೆಕೆಂಡು ಕಲಕಿ ಬಿಡಿ. ಕಾಳುಗಳು ತಳ ಸೇರುತ್ತವೆಯೇ ಅಥವಾ ಮೇಲೆ ತೇಲುತ್ತವೆಯೇ ನೋಡಿ.',
              hi: '5 सेकंड तक हिलाएं और देखें कि दाने नीचे डूबते हैं या ऊपर तैरते हैं।'
            },
            visualHint: 'Sink vs float observation'
          }
        ],
        pureOutcome: {
          en: 'Authentic carbohydrate-dense rice grains immediately sink straight to the bottom of the container.',
          kn: 'ನೈಸರ್ಗಿಕ ಅಕ್ಕಿ ಕಾಳುಗಳು ತಕ್ಷಣವೇ ನೀರಿನ ತಳ ಸೇರುತ್ತವೆ.',
          hi: 'प्राकृतिक चावल के दाने भारी होने के कारण तुरंत पानी की तली में बैठ जाते हैं।'
        },
        adulteratedOutcome: {
          en: 'Synthetic plastic or adulterated lightweight hollow grains remain floating buoyantly on the water surface.',
          kn: 'ಪ್ಲಾಸ್ಟಿಕ್ ಅಥವಾ ಕೃತಕ ಕಾಳುಗಳು ನೀರಿನ ಮೇಲ್ಮೈಯಲ್ಲಿ ತೇಲುತ್ತವೆ.',
          hi: 'प्लास्टिक अथवा हल्के कृत्रिम दाने पानी की सतह पर तैरते रहते हैं।'
        }
      }
    ]
  },
  {
    id: 'sugar',
    name: {
      en: 'Sugar',
      kn: 'ಸಕ್ಕರೆ',
      hi: 'चीनी'
    },
    tagline: {
      en: 'Sweetening crystals for daily beverages and sweets',
      kn: 'ಸಿಹಿ ತಿಂಡಿಗಳು ಮತ್ತು ಪಾನೀಯಗಳಿಗೆ ಬಳಸುವ ಸಕ್ಕರೆ',
      hi: 'दैनिक पेय व मिठाइयों के लिए मिठास'
    },
    category: {
      en: 'Sweeteners',
      kn: 'ಸಿಹಿ ಪದಾರ್ಥಗಳು',
      hi: 'मीठे पदार्थ'
    },
    commonAdulterants: {
      en: ['Chalk Powder', 'Urea', 'Washing Soda', 'Fine Sand'],
      kn: ['ಸೀಮೆಸುಣ್ಣದ ಪುಡಿ', 'ಯೂರಿಯಾ', 'ವಾಷಿಂಗ್ ಸೋಡಾ', 'ಬಿಳಿ ಮರಳು'],
      hi: ['खड़िया / चॉक पाउडर', 'यूरिया', 'कपड़े धोने का सोडा', 'सफेद रेत']
    },
    iconName: 'Cookie',
    colorScheme: {
      primary: 'bg-indigo-600',
      light: 'bg-indigo-50',
      badge: 'text-indigo-700 bg-indigo-100',
      border: 'border-indigo-200'
    },
    sampleImages: [
      {
        id: 'sugar-sample-chalk',
        label: {
          en: 'Sugar with Chalk Sediment (Suspicious)',
          kn: 'ಸೀಮೆಸುಣ್ಣ ಬೆರೆತ ಸಕ್ಕರೆ (ಅನುಮಾನಾಸ್ಪದ)',
          hi: 'चॉक मिलावटी चीनी (संदिग्ध)'
        },
        expectedStatus: 'suspicious',
        description: {
          en: 'Heavy white insoluble mineral precipitate settles at the bottom of the glass after dissolving',
          kn: 'ಸಕ್ಕರೆ ಕರಗಿದ ನಂತರವೂ ತಳದಲ್ಲಿ ಬಿಳಿ ಸೀಮೆಸುಣ್ಣದ ಗಟ್ಟಿ ಶೇಖರಣೆ ಉಳಿಯುತ್ತದೆ',
          hi: 'चीनी घुलने के बाद भी तली में भारी सफेद चॉक की परत जमी रह जाती है'
        },
        dataUrl: sugarChalkPositiveSvg
      },
      {
        id: 'sugar-sample-pure',
        label: {
          en: 'Pure Refined Sugar (Normal)',
          kn: 'ಶುದ್ಧ ಸಕ್ಕರೆ (ಸಾಮಾನ್ಯ)',
          hi: 'शुद्ध रिफाइंड चीनी (सामान्य)'
        },
        expectedStatus: 'normal',
        description: {
          en: '100% crystal-clear dissolution with zero cloudy precipitate or insoluble sediment',
          kn: 'ಯಾವುದೇ ಬಿಳಿ ಕಣಗಳಿಲ್ಲದೆ ಶೇ ೧೦೦ ರಷ್ಟು ಸಂಪೂರ್ಣ ಪಾರದರ್ಶಕವಾಗಿ ಕರಗುತ್ತದೆ',
          hi: 'बिना किसी अवशेष के शत-प्रतिशत पारदर्शी रूप से घुल जाती है'
        },
        dataUrl: sugarPureSampleSvg
      }
    ],
    dartTests: [
      {
        id: 'sugar-dissolution',
        name: {
          en: 'Clear Water Dissolution & Chalk Test',
          kn: 'ನೀರಿನ ಸಂಪೂರ್ಣ ಕರಗುವಿಕೆ ಮತ್ತು ಸೀಮೆಸುಣ್ಣ ಪರೀಕ್ಷೆ',
          hi: 'जल विलेयता व खड़िया तलछट परीक्षण'
        },
        targetAdulterant: {
          en: 'Chalk Powder, Washing Soda & Mineral Grit',
          kn: 'ಸೀಮೆಸುಣ್ಣ, ವಾಷಿಂಗ್ ಸೋಡಾ ಮತ್ತು ಮರಳು',
          hi: 'खड़िया पाउडर, वाशिंग सोडा व अघुलनशील रेत'
        },
        estimatedMinutes: 2,
        equipment: {
          en: ['Glass tumbler of clean water', '1 tablespoon sugar sample', 'Spoon to stir'],
          kn: ['ಒಂದು ಲೋಟ ನೀರು', '೧ ಚಮಚ ಸಕ್ಕರೆ', 'ಕಲಕಲು ಚಮಚ'],
          hi: ['एक गिलास साफ पानी', '1 बड़ा चम्मच चीनी', 'चम्मच']
        },
        precautions: {
          en: ['Do not consume the solution if washing soda or chalk is detected.'],
          kn: ['ಸೀಮೆಸುಣ್ಣ ಅಥವಾ ಸೋಡಾ ಕಂಡುಬಂದರೆ ಆ ಸಕ್ಕರೆ ನೀರನ್ನು ಕುಡಿಯಬೇಡಿ.'],
          hi: ['चॉक या सोडा दिखने पर इस घोल का सेवन न करें।']
        },
        steps: [
          {
            stepNumber: 1,
            title: {
              en: 'Add sugar to water',
              kn: 'ನೀರಿಗೆ ಸಕ್ಕರೆ ಸೇರಿಸಿ',
              hi: 'पानी में चीनी डालें'
            },
            instruction: {
              en: 'Add 1-2 teaspoons of sugar sample into a transparent glass filled with clean water.',
              kn: 'ಸ್ವಚ್ಛ ನೀರಿನಿಂದ ಕೂಡಿದ ಪಾರದರ್ಶಕ ಲೋಟಕ್ಕೆ ೧-೨ ಚಮಚ ಸಕ್ಕರೆ ಹಾಕಿ.',
              hi: 'साफ पानी से भरे पारदर्शी गिलास में 1-2 चम्मच चीनी डालें।'
            },
            visualHint: 'Sugar crystals in water'
          },
          {
            stepNumber: 2,
            title: {
              en: 'Stir until dissolved',
              kn: 'ಕರಗುವವರೆಗೆ ಕಲಕಿ',
              hi: 'घुलने तक मिलाएं'
            },
            instruction: {
              en: 'Stir vigorously for 60 seconds until the sugar crystals dissolve completely.',
              kn: 'ಸಕ್ಕರೆಯ ಹರಳುಗಳು ಪೂರ್ಣವಾಗಿ ಕರಗುವವರೆಗೆ ೬೦ ಸೆಕೆಂಡುಗಳ ಕಾಲ ಚಮಚದಿಂದ ಚೆನ್ನಾಗಿ ಕಲಕಿ.',
              hi: 'चीनी के दाने पूरी तरह घुलने तक 60 सेकंड अच्छी तरह चलाएं।'
            },
            visualHint: 'Stirring solution'
          },
          {
            stepNumber: 3,
            title: {
              en: 'Inspect bottom and transparency',
              kn: 'ತಳ ಮತ್ತು ಪಾರದರ್ಶಕತೆ ಪರಿಶೀಲಿಸಿ',
              hi: 'तली और पारदर्शिता देखें'
            },
            instruction: {
              en: 'Hold the glass against light and inspect the bottom. Pure sugar leaves zero sediment.',
              kn: 'ಲೋಟವನ್ನು ಬೆಳಕಿಗೆ ಹಿಡಿದು ತಳವನ್ನು ಗಮನಿಸಿ. ಶುದ್ಧ ಸಕ್ಕರೆಯಲ್ಲಿ ಯಾವುದೇ ಕಣಗಳು ಉಳಿಯುವುದಿಲ್ಲ.',
              hi: 'गिलास को रोशनी के सामने रखकर तली देखें। शुद्ध चीनी में कोई तलछट नहीं होती।'
            },
            visualHint: 'Checking glass bottom'
          }
        ],
        pureOutcome: {
          en: 'Pure sucrose dissolves 100% cleanly yielding a crystal-clear, transparent solution with zero sediment.',
          kn: 'ಶುದ್ಧ ಸಕ್ಕರೆಯು ಸಂಪೂರ್ಣವಾಗಿ ಕರಗಿ ಶುಭ್ರವಾದ ಪಾರದರ್ಶಕ ದ್ರಾವಣವಾಗುತ್ತದೆ.',
          hi: 'शुद्ध चीनी शत-प्रतिशत घुलकर पूर्णतः पारदर्शी घोल बनाती है और कोई तलछट नहीं बचती।'
        },
        adulteratedOutcome: {
          en: 'Chalk powder or washing soda fails to dissolve, leaving a milky cloudy haze and a heavy white sediment at the bottom.',
          kn: 'ಸೀಮೆಸುಣ್ಣ ಕರಗದೆ ಉಳಿದು ನೀರು ಮಬ್ಬಾಗುತ್ತದೆ ಮತ್ತು ತಳದಲ್ಲಿ ಬಿಳಿ ಕೆಸರು ಶೇಖರಣೆಯಾಗುತ್ತದೆ.',
          hi: 'खड़िया पाउडर या वाशिंग सोडा घुलता नहीं है, पानी दूधिया हो जाता है और तली में सफेद चूना बैठ जाता है।'
        }
      }
    ]
  }
];
