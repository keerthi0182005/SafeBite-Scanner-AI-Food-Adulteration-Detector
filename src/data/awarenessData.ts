import { Language } from '../types';

export interface AdulterantFact {
  id: string;
  foodName: Record<Language, string>;
  adulterant: Record<Language, string>;
  whyAdded: Record<Language, string>;
  healthRisks: Record<Language, string[]>;
  fssaiStandard: string;
  quickCheck: Record<Language, string>;
  severity: 'high' | 'critical' | 'moderate';
}

export interface KitchenSafetyTip {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  category: 'purchase' | 'storage' | 'inspection' | 'legal';
  icon: string;
}

export const ADULTERANT_ENCYCLOPEDIA: AdulterantFact[] = [
  {
    id: 'metanil-yellow',
    foodName: {
      en: 'Turmeric Powder & Besan',
      kn: 'ಅರಿಶಿನ ಪುಡಿ ಮತ್ತು ಕಡಲೆ ಹಿಟ್ಟು',
      hi: 'हल्दी पाउडर व बेसन'
    },
    adulterant: {
      en: 'Metanil Yellow (Industrial Coal-Tar Dye)',
      kn: 'ಮೆಟಾನಿಲ್ ಹಳದಿ (ಕಲ್ಲಿದ್ದಲು ಟಾರ್ ರಾಸಾಯನಿಕ ಬಣ್ಣ)',
      hi: 'मेटानिल येलो (औद्योगिक कोल-तार रंग)'
    },
    whyAdded: {
      en: 'Imparts an artificially vibrant, deep golden-yellow color to low-grade or stale spices.',
      kn: 'ಕಳಪೆ ಗುಣಮಟ್ಟದ ಅರಿಶಿನಕ್ಕೆ ಕಣ್ಣು ಕೋರೈಸುವ ಆಕರ್ಷಕ ಹಳದಿ ಬಣ್ಣ ನೀಡಲು ಸೇರಿಸಲಾಗುತ್ತದೆ.',
      hi: 'घटिया या बासी हल्दी को चमकीला गहरा पीला रंग देने के लिए मिलाया जाता है।'
    },
    healthRisks: {
      en: [
        'Classified as potentially carcinogenic by the International Agency for Research on Cancer',
        'Degeneration of liver and kidney cells with chronic daily exposure',
        'Neurotoxicity and developmental harm in young children'
      ],
      kn: [
        'ಕ್ಯಾನ್ಸರ್‌ಕಾರಕ ರಾಸಾಯನಿಕವೆಂದು ಗುರುತಿಸಲಾಗಿದೆ',
        'ಯಕೃತ್ತು ಮತ್ತು ಮೂತ್ರಪಿಂಡಗಳ ಜೀವಕೋಶಗಳ ನಾಶ',
        'ಮಕ್ಕಳಲ್ಲಿ ನರಮಂಡಲದ ಬೆಳವಣಿಗೆಗೆ ಅಡ್ಡಿ'
      ],
      hi: [
        'कैंसरकारी रासायनिक रंग के रूप में वर्गीकृत',
        'लिवर और किडनी की कोशिकाओं को भारी नुकसान',
        'बच्चों में तंत्रिका तंत्र के विकास पर प्रतिकूल प्रभाव'
      ]
    },
    fssaiStandard: 'FSSAI prohibits any synthetic coal-tar dye in powdered turmeric under Food Safety and Standards (Food Products Standards) Regulations.',
    quickCheck: {
      en: 'Add a few drops of lemon juice or acid to turmeric solution. If it turns bright pink-magenta and stays pink on water dilution, Metanil Yellow is present.',
      kn: 'ಅರಿಶಿನ ನೀರಿಗೆ ನಿಂಬೆ ರಸ ಸೇರಿಸಿ. ನೀರು ಸೇರಿಸಿದ ನಂತರವೂ ಗುಲಾಬಿ ಬಣ್ಣ ಹಾಗೆಯೇ ಉಳಿದರೆ ಮೆಟಾನಿಲ್ ಯೆಲ್ಲೋ ಇದೆ.',
      hi: 'हल्दी के घोल में नींबू का रस डालें। पानी मिलाने पर भी यदि गहरा गुलाबी रंग बना रहे, तो मेटानिल येलो मौजूद है।'
    },
    severity: 'critical'
  },
  {
    id: 'argemone-oil',
    foodName: {
      en: 'Mustard & Edible Cooking Oils',
      kn: 'ಸಾಸಿವೆ ಮತ್ತು ಅಡುಗೆ ಎಣ್ಣೆಗಳು',
      hi: 'सरसों व खाद्य तेल'
    },
    adulterant: {
      en: 'Argemone Mexicana (Prickly Poppy) Seed Oil',
      kn: 'ಅರ್ಗೆಮೋನ್ (ಮೆಕ್ಸಿಕನ್ ಪಾಪಿ) ಬೀಜದ ಎಣ್ಣೆ',
      hi: 'आर्गेमोन मेक्सिकाना (सत्यानाशी) का तेल'
    },
    whyAdded: {
      en: 'Argemone seeds closely resemble mustard seeds and produce cheap, easily blendable oil.',
      kn: 'ಅರ್ಗೆಮೋನ್ ಬೀಜಗಳು ಸಾಸಿವೆಯಂತೆಯೇ ಕಾಣುವುದರಿಂದ ಕಡಿಮೆ ಖರ್ಚಿನಲ್ಲಿ ಎಣ್ಣೆಯ ಪ್ರಮಾಣ ಹೆಚ್ಚಿಸಲು ಬಳಸುತ್ತಾರೆ.',
      hi: 'सत्यानाशी के बीज सरसों जैसे दिखते हैं और सस्ता तेल तैयार करके मिला दिया जाता है।'
    },
    healthRisks: {
      en: [
        'Causes "Epidemic Dropsy" with severe edema, swelling of legs and heart failure',
        'Glaucoma, optic neuropathy and permanent loss of vision',
        'Gastrointestinal erosion and multi-organ failure'
      ],
      kn: [
        'ಎಪಿಡೆಮಿಕ್ ಡ್ರಾಪ್ಸಿ ಎಂಬ ಮಾರಕ ರೋಗ - ಕಾಲುಗಳ ಊತ ಮತ್ತು ಹೃದಯ ವೈಫಲ್ಯ',
        'ಗ್ಲುಕೋಮಾ, ಕಣ್ಣಿನ ನರಗಳ ಹಾನಿ ಮತ್ತು ಶಾಶ್ವತ ಕುರುಡುತನ',
        'ಜಠರದ ಕರುಳಿನ ತೀವ್ರ ತೊಂದರೆ'
      ],
      hi: [
        'एपिडेमिक ड्रॉप्स रोग - पैरों में सूजन और अचानक दिल का दौरा',
        'ग्लूकोमा और आंखों की रोशनी का स्थायी रूप से जाना',
        'पाचन तंत्र की गंभीर क्षति'
      ]
    },
    fssaiStandard: 'Zero tolerance: Total ban under FSSAI regulations. Permitted limit of Argemone oil is 0.00%.',
    quickCheck: {
      en: 'Add concentrated nitric acid to 5ml oil and shake gently. A crimson red ring at the junction proves presence of toxic argemone.',
      kn: '೫ ಮಿ.ಲೀ ಎಣ್ಣೆಗೆ ಆಮ್ಲ ಸೇರಿಸಿ. ಮಧ್ಯದಲ್ಲಿ ಕೆಂಪು ಗೆರೆ ಮೂಡಿದರೆ ವಿಷಕಾರಿ ಅರ್ಗೆಮೋನ್ ಬೆರೆತಿದೆ ಎಂದರ್ಥ.',
      hi: '5 मिली तेल में नाइट्रिक एसिड डालकर हिलाएं। दोनों परतों के बीच गहरा लाल छल्ला बनना मिलावट का पक्का प्रमाण है।'
    },
    severity: 'critical'
  },
  {
    id: 'synthetic-milk',
    foodName: {
      en: 'Milk & Paneer',
      kn: 'ಹಾಲು ಮತ್ತು ಪನೀರ್',
      hi: 'दूध और पनीर'
    },
    adulterant: {
      en: 'Detergent, Urea, Starch & Caustic Neutralizers',
      kn: 'ಡಿಟರ್ಜೆಂಟ್, ಯೂರಿಯಾ, ಪಿಷ್ಟ ಮತ್ತು ಕಾಸ್ಟಿಕ್ ಸೋಡಾ',
      hi: 'डिटर्जेंट, यूरिया, स्टार्च व कास्टिक सोडा'
    },
    whyAdded: {
      en: 'Artificially mimics milk fat (SNF), viscosity, whitening, and increases shelf-life cheaply.',
      kn: 'ಹಾಲಿನ ಸಾಂದ್ರತೆ, ನೊರೆ ಮತ್ತು ಬಿಳುಪನ್ನು ಕೃತಕವಾಗಿ ಹೆಚ್ಚಿಸಿ ಲಾಭಗಳಿಸಲು ಬಳಸುತ್ತಾರೆ.',
      hi: 'दूध का गाढ़ापन, झाग, फैट और रंग कृत्रिम रूप से बढ़ाकर अधिक मुनाफा कमाने के लिए।'
    },
    healthRisks: {
      en: [
        'Chemical detergents corrode the mucosal lining of the stomach causing ulcers',
        'Urea overloads renal filtration leading to chronic kidney damage',
        'Carcinogenic risk from industrial caustic neutralizers'
      ],
      kn: [
        'ಡಿಟರ್ಜೆಂಟ್ ಜಠರದ ಒಳಪದರವನ್ನು ಸುಟ್ಟು ಹುಣ್ಣುಗಳನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ',
        'ಯೂರಿಯಾ ಮೂತ್ರಪಿಂಡಗಳ ಮೇಲೆ ಅತಿಯಾದ ಒತ್ತಡ ಹಾಕಿ ವೈಫಲ್ಯ ಉಂಟುಮಾಡುತ್ತದೆ',
        'ಕಾಸ್ಟಿಕ್ ಅಂಶಗಳಿಂದ ಕ್ಯಾನ್ಸರ್ ಅಪಾಯ'
      ],
      hi: [
        'डिटर्जेंट पेट की अंदरूनी परत को नष्ट करके अल्सर बनाता है',
        'यूरिया किडनी को नुकसान पहुंचाकर फेलियर का कारण बनता है',
        'रसायनों से कैंसर का भारी खतरा'
      ]
    },
    fssaiStandard: 'FSSAI limits: Urea max 700 ppm (naturally occurring trace only). Detergents, neutralizers, and starch are strictly prohibited.',
    quickCheck: {
      en: 'Shake 5ml milk with 5ml water vigorously for 20 seconds. If thick dense foam stays for >5 minutes, detergent is present.',
      kn: 'ಸಮಾನ ನೀರು ಮತ್ತು ಹಾಲನ್ನು ಬಾಟಲಿಯಲ್ಲಿ ಅಲುಗಾಡಿಸಿ. ೫ ನಿಮಿಷಗಳಿಗೂ ಹೆಚ್ಚು ಕಾಲ ದಪ್ಪ ನೊರೆ ಉಳಿದರೆ ಡಿಟರ್ಜೆಂಟ್ ಇದೆ.',
      hi: 'बराबर मात्रा में दूध और पानी को 20 सेकंड हिलाएं। 5 मिनट तक घना झाग बना रहे तो डिटर्जेंट मिला है।'
    },
    severity: 'critical'
  },
  {
    id: 'chilli-brick',
    foodName: {
      en: 'Chilli Powder',
      kn: 'ಖಾರದ ಪುಡಿ',
      hi: 'लाल मिर्च पाउडर'
    },
    adulterant: {
      en: 'Brick Dust, Sudan Red Dye & Soapstone Grit',
      kn: 'ಇಟ್ಟಿಗೆ ಪುಡಿ, ಸುಡಾನ್ ರೆಡ್ ಬಣ್ಣ ಮತ್ತು ಕಲ್ಲು ಪುಡಿ',
      hi: 'ईंट का चूरा, सूडान लाल रंग व सोपस्टोन'
    },
    whyAdded: {
      en: 'Adds heavy bulk weight to powdered spices and restores vibrant red hue to decayed chillies.',
      kn: 'ಮಸಾಲೆಯ ತೂಕವನ್ನು ಸುಲಭವಾಗಿ ಹೆಚ್ಚಿಸಲು ಮತ್ತು ಹಳೆಯ ಮೆಣಸಿಗೆ ಕೆಂಪು ಹೊಳಪು ನೀಡಲು ಬೆರೆಸುತ್ತಾರೆ.',
      hi: 'मसाले का वजन भारी करने और सड़ी मिर्च को चमकदार लाल रंग देने के लिए।'
    },
    healthRisks: {
      en: [
        'Insoluble silica and mineral dust cause severe stomach lacerations and gastritis',
        'Formation of kidney and bladder stones from insoluble minerals',
        'Sudan dyes are potent genotoxic carcinogens banned globally'
      ],
      kn: [
        'ಇಟ್ಟಿಗೆ ಕಲ್ಲುಗಳು ಜಠರದಲ್ಲಿ ರಂಧ್ರ ಮತ್ತು ಗ್ಯಾಸ್ಟ್ರಿಟಿಸ್ ಉಂಟುಮಾಡುತ್ತವೆ',
        'ಮೂತ್ರಪಿಂಡದಲ್ಲಿ ಕಲ್ಲುಗಳು ಉಂಟಾಗುವುದು',
        'ಸುಡಾನ್ ರೆಡ್ ವಿಶ್ವದಾದ್ಯಂತ ನಿಷೇಧಿಸಲ್ಪಟ್ಟ ಕ್ಯಾನ್ಸರ್‌ಕಾರಕ ಬಣ್ಣ'
      ],
      hi: [
        'ईंट के कण पेट में छाले और गंभीर गैस्ट्राइटिस पैदा करते हैं',
        'गुर्दे और मूत्राशय में पथरी का निर्माण',
        'सूडान रेड अंतरराष्ट्रीय स्तर पर प्रतिबंधित कैंसरकारी रंग है'
      ]
    },
    fssaiStandard: 'FSSAI Total Ash limit: Max 8.0%; Ash insoluble in dilute HCl max 1.3%. No non-permitted dyes.',
    quickCheck: {
      en: 'Add a spoonful to water. Brick dust instantly sinks and grates harshly when rubbed against glass.',
      kn: 'ನೀರಿಗೆ ಖಾರದ ಪುಡಿ ಹಾಕಿ. ಇಟ್ಟಿಗೆ ಪುಡಿ ತಕ್ಷಣ ತಳಕ್ಕೆ ಬೀಳುತ್ತದೆ ಮತ್ತು ಬೆರಳಿನಲ್ಲಿ ಉಜ್ಜಿದಾಗ ಗಾಜನ್ನು ಗೀಚುತ್ತದೆ.',
      hi: 'पानी में एक चम्मच डालें। ईंट का चूरा तुरंत तली में बैठता है और रगड़ने पर कंकड़ जैसा लगता है।'
    },
    severity: 'high'
  },
  {
    id: 'plastic-rice',
    foodName: {
      en: 'Rice & Grains',
      kn: 'ಅಕ್ಕಿ ಮತ್ತು ಧಾನ್ಯಗಳು',
      hi: 'चावल व अनाज'
    },
    adulterant: {
      en: 'Synthetic Polymer Pellets & Liquid Paraffin Wax Polish',
      kn: 'ಪ್ಲಾಸ್ಟಿಕ್ ಪಾಲಿಮರ್ ಕಾಳುಗಳು ಮತ್ತು ಮೇಣದ ಪಾಲಿಶ್',
      hi: 'प्लास्टिक पॉलीमर दाने व मोम की पॉलिश'
    },
    whyAdded: {
      en: 'Polishes old discolored grain into shiny premium grade or blends synthetic bulk fillers.',
      kn: 'ಹಳೆಯ ಕಳಪೆ ಅಕ್ಕಿಗೆ ಹೊಸ ಅಕ್ಕಿಯಂತೆ ಹೊಳಪು ನೀಡಲು ಮೇಣ ಹಚ್ಚುತ್ತಾರೆ.',
      hi: 'पुराने बदरंग चावल को चमकदार और प्रीमियम दिखाने के लिए पॉलिश की जाती है।'
    },
    healthRisks: {
      en: [
        'Severe acute intestinal obstruction and gastric impaction',
        'Microplastic accumulation in liver and lymph nodes',
        'Phthalate endocrine disruption'
      ],
      kn: [
        'ಕರುಳಿನ ತೀವ್ರ ಅಡಚಣೆ ಮತ್ತು ಹೊಟ್ಟೆ ನೋವು',
        'ದೇಹದ ಅಂಗಾಂಶಗಳಲ್ಲಿ ಮೈಕ್ರೋಪ್ಲಾಸ್ಟಿಕ್ ಶೇಖರಣೆ',
        'ಹಾರ್ಮೋನ್ ಸಮತೋಲನ ಹಾನಿ'
      ],
      hi: [
        'आंतों में रुकावट और गंभीर अपच',
        'शरीर के अंगों में माइक्रोप्लास्टिक का जमाव',
        'हार्मोनल असंतुलन का खतरा'
      ]
    },
    fssaiStandard: 'Grain standards prohibit synthetic fillers, mineral oils, or talc coating beyond permitted limits.',
    quickCheck: {
      en: 'Soak in water - real rice sinks, synthetic grains float. In flame test, plastic curls, melts, and emits black chemical smoke.',
      kn: 'ನೀರಿಗೆ ಹಾಕಿದಾಗ ಅಕ್ಕಿ ಮುಳುಗುತ್ತದೆ, ಪ್ಲಾಸ್ಟಿಕ್ ತೇಲುತ್ತದೆ. ಬೆಂಕಿಯಲ್ಲಿ ಸುಟ್ಟಾಗ ಪ್ಲಾಸ್ಟಿಕ್ ವಾಸನೆ ಬರುತ್ತದೆ.',
      hi: 'पानी में डालने पर असली चावल डूबता है, प्लास्टिक तैरता है। आग में जलाने पर प्लास्टिक पिघलता और बदबू देता है।'
    },
    severity: 'high'
  },
  {
    id: 'sugar-chalk',
    foodName: {
      en: 'Sugar & Jaggery',
      kn: 'ಸಕ್ಕರೆ ಮತ್ತು ಬೆಲ್ಲ',
      hi: 'चीनी व गुड़'
    },
    adulterant: {
      en: 'Chalk Powder, Washing Soda & Metanil Yellow',
      kn: 'ಸೀಮೆಸುಣ್ಣ, ವಾಷಿಂಗ್ ಸೋಡಾ ಮತ್ತು ರಾಸಾಯನಿಕ ಬಣ್ಣ',
      hi: 'खड़िया / चॉक, वाशिंग सोडा व मेटानिल येलो'
    },
    whyAdded: {
      en: 'Increases weight and gives aged sugar crystals or jaggery a lighter, brighter color.',
      kn: 'ಸಕ್ಕರೆಯ ತೂಕ ಹೆಚ್ಚಿಸಲು ಮತ್ತು ಬೆಲ್ಲಕ್ಕೆ ಹಳದಿ ಆಕರ್ಷಕ ಬಣ್ಣ ನೀಡಲು ಸೇರಿಸುತ್ತಾರೆ.',
      hi: 'वजन बढ़ाने और पुराने गुड़ को आकर्षक हल्का पीला रंग देने के लिए।'
    },
    healthRisks: {
      en: [
        'Alkaline caustic burns to esophagus from washing soda',
        'Kidney calculi (stones) from excessive calcium carbonate chalk ingestion',
        'Digestive cramps and diarrhea'
      ],
      kn: [
        'ವಾಷಿಂಗ್ ಸೋಡಾದಿಂದ ಗಂಟಲು ಮತ್ತು ಅನ್ನನಾಳದ ಉರಿ',
        'ಕ್ಯಾಲ್ಸಿಯಂ ಶೇಖರಣೆಯಿಂದ ಮೂತ್ರಪಿಂಡದಲ್ಲಿ ಕಲ್ಲುಗಳು',
        'ಹೊಟ್ಟೆ ನೋವು ಮತ್ತು ಭೇದಿ'
      ],
      hi: [
        'वाशिंग सोडा से गले और पेट में जलन',
        'अतिरिक्त कैल्शियम से गुर्दे की पथरी',
        'पेट में मरोड़ और दस्त'
      ]
    },
    fssaiStandard: 'White refined sugar must dissolve completely with water-insoluble matter not exceeding 0.05% by mass.',
    quickCheck: {
      en: 'Dissolve 10g in clear water. Pure sugar dissolves 100% crystal clear. Chalk leaves a milky cloud and white sediment.',
      kn: 'ನೀರಿಗೆ ಸಕ್ಕರೆ ಹಾಕಿ ಕಲಕಿ. ಶುದ್ಧ ಸಕ್ಕರೆ ಪೂರ್ಣ ಕರಗುತ್ತದೆ, ಸೀಮೆಸುಣ್ಣವಿದ್ದರೆ ತಳದಲ್ಲಿ ಬಿಳಿ ಕೆಸರು ಉಳಿಯುತ್ತದೆ.',
      hi: 'पानी में घोलें। शुद्ध चीनी पूरी तरह पारदर्शी घुलती है, चॉक होने पर नीचे सफेद चूना बैठ जाता है।'
    },
    severity: 'moderate'
  }
];

export const KITCHEN_SAFETY_TIPS: KitchenSafetyTip[] = [
  {
    id: 'tip-cert',
    title: {
      en: 'Always Verify FSSAI 14-Digit License & AGMARK Seal',
      kn: 'ಯಾವಾಗಲೂ FSSAI ೧೪-ಅಂಕಿಯ ಪರವಾನಗಿ ಮತ್ತು AGMARK ಸೀಲ್ ಪರಿಶೀಲಿಸಿ',
      hi: 'हमेशा FSSAI 14-अंकों का लाइसेंस और AGMARK मुहर जांचें'
    },
    description: {
      en: 'Ensure pre-packaged foods display the mandatory 14-digit FSSAI license number. For edible oils, ghee, and whole spices, look for the AGMARK grade label.',
      kn: 'ಪ್ಯಾಕೆಟ್ ಮೇಲೆ ೧೪ ಅಂಕಿಗಳ FSSAI ಲೈಸೆನ್ಸ್ ಸಂಖ್ಯೆ ಮತ್ತು ಎಣ್ಣೆ, ತುಪ್ಪದ ಮೇಲೆ AGMARK ಗುರುತು ಇರುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.',
      hi: 'सुनिश्चित करें कि पैकेट पर 14-अंकों का FSSAI नंबर हो। तेल, घी और मसालों पर AGMARK मुहर अवश्य देखें।'
    },
    category: 'purchase',
    icon: 'ShieldCheck'
  },
  {
    id: 'tip-loose',
    title: {
      en: 'Be Cautious with Unbranded Loose Spices and Milk',
      kn: 'ಬ್ರಾಂಡ್ ಇಲ್ಲದ ಬಿಡಿ ಮಸಾಲೆ ಮತ್ತು ಹಾಲಿನ ಬಗ್ಗೆ ಎಚ್ಚರವಿರಲಿ',
      hi: 'खुले मसालों और खुले दूध के प्रति विशेष सावधानी बरतें'
    },
    description: {
      en: 'Over 78% of detected adulteration cases in India occur in unsealed loose products sold without batch tracking or manufacturing dates.',
      kn: 'ಭಾರತದಲ್ಲಿ ಪತ್ತೆಯಾದ ಕಲಬೆರಕೆ ಪ್ರಕರಣಗಳಲ್ಲಿ ಶೇ ೭೮ ಕ್ಕೂ ಹೆಚ್ಚು ಸಡಿಲವಾಗಿ ಮಾರಾಟವಾಗುವ ಬಿಡಿ ಆಹಾರಗಳಲ್ಲಿ ಕಂಡುಬಂದಿವೆ.',
      hi: 'भारत में मिलावट के 78% से अधिक मामले खुले बिकने वाले बिना बैच और बिना ब्रांड के उत्पादों में पाए जाते हैं।'
    },
    category: 'purchase',
    icon: 'AlertTriangle'
  },
  {
    id: 'tip-curd',
    title: {
      en: 'The Natural Curdling Test for Fresh Milk',
      kn: 'ತಾಜಾ ಹಾಲಿಗೆ ನೈಸರ್ಗಿಕ ಮೊಸರು ಪರೀಕ್ಷೆ',
      hi: 'ताजे दूध के लिए प्राकृतिक दही परीक्षण'
    },
    description: {
      en: 'Set a small bowl of milk at room temperature. Pure milk ferments into natural fragrant curd. Synthetic or neutralized milk turns bitter or decomposes foully.',
      kn: 'ಸ್ವಲ್ಪ ಹಾಲನ್ನು ಮೊಸರು ಮಾಡಲು ಇಡಿ. ಶುದ್ಧ ಹಾಲು ಸುವಾಸನೆಯ ಗಟ್ಟಿ ಮೊಸರಾಗುತ್ತದೆ; ರಾಸಾಯನಿಕ ಹಾಲು ಕಹಿಯಾಗುತ್ತದೆ.',
      hi: 'कमरे के तापमान पर थोड़ा दूध जमाएं। असली दूध की खुशबूदार दही बनती है, जबकि सिंथेटिक दूध कड़वा और बदबूदार हो जाता है।'
    },
    category: 'inspection',
    icon: 'Milk'
  },
  {
    id: 'tip-hot-oil',
    title: {
      en: 'Avoid Reheating Cooking Oil Beyond Once',
      kn: 'ಅಡುಗೆ ಎಣ್ಣೆಯನ್ನು ಒಂದಕ್ಕಿಂತ ಹೆಚ್ಚು ಬಾರಿ ಮರುಬಳಕೆ ಮಾಡಬೇಡಿ',
      hi: 'खाद्य तेल को एक से अधिक बार बार-बार गर्म न करें'
    },
    description: {
      en: 'Repeatedly heated oil forms Total Polar Compounds (TPC) and trans-fats. FSSAI mandates maximum 25% TPC limit for commercial food fryers.',
      kn: 'ಮತ್ತೆ ಮತ್ತೆ ಕಾಯಿಸಿದ ಎಣ್ಣೆಯಲ್ಲಿ ಕ್ಯಾನ್ಸರ್‌ಕಾರಕ ಟ್ರಾನ್ಸ್‌ಫ್ಯಾಟ್‌ಗಳು ಉಂಟಾಗುತ್ತವೆ. FSSAI ಪ್ರಕಾರ TPC ಶೇ ೨೫ ಮೀರಬಾರದು.',
      hi: 'बार-बार गर्म किया गया तेल विषाक्त ट्रांस-फैट और पोलर कंपाउंड्स बनाता है, जो दिल के लिए घातक हैं।'
    },
    category: 'storage',
    icon: 'Flame'
  },
  {
    id: 'tip-rights',
    title: {
      en: 'Your Statutory Consumer Redressal Rights',
      kn: 'ಗ್ರಾಹಕರಾಗಿ ನಿಮ್ಮ ಕಾನೂನುಬದ್ಧ ಹಕ್ಕುಗಳು',
      hi: 'उपभोक्ता के रूप में आपके कानूनी अधिकार'
    },
    description: {
      en: 'Under Section 59 of the Food Safety & Standards Act 2006, consumers can demand lab sampling through their district Food Safety Officer or report via FoSCoS portal.',
      kn: 'FSSAI ಕಾಯ್ದೆ 2006 ರ ಸೆಕ್ಷನ್ 59 ರ ಅಡಿಯಲ್ಲಿ, ಗ್ರಾಹಕರು ಜಿಲ್ಲಾ ಆಹಾರ ಅಧಿಕಾರಿಯ ಮೂಲಕ ಲ್ಯಾಬ್ ಪರೀಕ್ಷೆಗೆ ಒತ್ತಾಯಿಸಬಹುದು.',
      hi: 'FSSAI अधिनियम 2006 के तहत उपभोक्ता जिला खाद्य सुरक्षा अधिकारी से नमूने की जांच करवा सकते हैं।'
    },
    category: 'legal',
    icon: 'Scale'
  }
];
