
import type { Language } from "./Diseaseinformations";

type KnowledgeItem = {
  id: string;
  keywords: Record<Language, string[]>;
  answer: Record<Language, string>;
};

export const plantKnowledge: KnowledgeItem[] = [
  {
    id: "watering",
    keywords: {
      en: [
        "water",
        "watering",
        "how often water",
        "how much water",
        "when should i water",
        "water my tomato",
        "irrigation",
        "soil moisture",
        "dry soil",
      ],
      hi: [
        "पानी",
        "सिंचाई",
        "कितनी बार पानी",
        "कब पानी देना",
        "पौधों को पानी",
        "मिट्टी की नमी",
      ],
      te: [
        "నీరు",
        "నీళ్లు",
        "ఎన్ని సార్లు నీరు",
        "ఎప్పుడు నీరు",
        "నీరు పెట్టాలి",
        "నేల తేమ",
        "మొక్కకు నీరు",
      ],
      ta: [
        "தண்ணீர்",
        "நீர்ப்பாசனம்",
        "எத்தனை முறை நீர்",
        "எப்போது நீர்",
        "செடிக்கு தண்ணீர்",
        "மண்ணின் ஈரப்பதம்",
      ],
    },
    answer: {
      en: "Water tomato plants near their roots. Check soil moisture before watering. The required amount depends on weather, soil type and plant growth.",
      hi: "टमाटर के पौधों को जड़ों के पास पानी दें। पानी देने से पहले मिट्टी की नमी जाँचें। पानी की आवश्यकता मौसम, मिट्टी और पौधे की वृद्धि पर निर्भर करती है।",
      te: "టమాటా మొక్కలకు వేర్ల దగ్గర నీరు ఇవ్వండి. నీరు పెట్టే ముందు నేల తేమను పరిశీలించండి. నీటి అవసరం వాతావరణం, నేల రకం మరియు మొక్క ఎదుగుదలపై ఆధారపడి ఉంటుంది.",
      ta: "தக்காளி செடிகளின் வேர்ப்பகுதியில் நீர் பாய்ச்சவும். நீர் பாய்ச்சுவதற்கு முன் மண்ணின் ஈரப்பதத்தைச் சரிபார்க்கவும். நீரின் தேவை வானிலை, மண் வகை மற்றும் செடியின் வளர்ச்சியைப் பொறுத்தது.",
    },
  },

  {
    id: "fertilizer",
    keywords: {
      en: [
        "fertilizer",
        "fertiliser",
        "manure",
        "nutrients",
        "plant food",
        "what fertilizer",
        "which fertilizer",
        "nitrogen",
        "phosphorus",
        "potassium",
        "npk",
      ],
      hi: [
        "खाद",
        "उर्वरक",
        "पोषक तत्व",
        "पौधों का भोजन",
        "कौन सी खाद",
        "नाइट्रोजन",
        "फॉस्फोरस",
        "पोटैशियम",
      ],
      te: [
        "ఎరువు",
        "పోషకాలు",
        "పోషక పదార్థాలు",
        "ఏ ఎరువు",
        "నైట్రోజన్",
        "ఫాస్ఫరస్",
        "పొటాషియం",
      ],
      ta: [
        "உரம்",
        "ஊட்டச்சத்து",
        "சத்துக்கள்",
        "எந்த உரம்",
        "நைட்ரஜன்",
        "பாஸ்பரஸ்",
        "பொட்டாசியம்",
      ],
    },
    answer: {
      en: "Tomato plants need balanced nutrients such as nitrogen, phosphorus and potassium. Choose fertilizer according to soil conditions and follow the product instructions. Avoid excessive application.",
      hi: "टमाटर के पौधों को नाइट्रोजन, फॉस्फोरस और पोटैशियम जैसे संतुलित पोषक तत्व चाहिए। मिट्टी के अनुसार खाद चुनें और उसके निर्देशों का पालन करें। अधिक खाद डालने से बचें।",
      te: "టమాటా మొక్కలకు నైట్రోజన్, ఫాస్ఫరస్ మరియు పొటాషియం వంటి సమతుల్య పోషకాలు అవసరం. నేల పరిస్థితులకు అనుగుణంగా ఎరువును ఎంచుకుని సూచనలను పాటించండి. అధికంగా ఎరువు వేయవద్దు.",
      ta: "தக்காளி செடிகளுக்கு நைட்ரஜன், பாஸ்பரஸ் மற்றும் பொட்டாசியம் போன்ற சமநிலையான ஊட்டச்சத்துக்கள் தேவை. மண்ணின் நிலைக்கு ஏற்ற உரத்தைத் தேர்ந்தெடுத்து வழிமுறைகளைப் பின்பற்றவும். அதிக உரம் இடுவதைத் தவிர்க்கவும்.",
    },
  },

  {
    id: "pests",
    keywords: {
      en: [
        "pest",
        "pests",
        "insect",
        "insects",
        "aphids",
        "whiteflies",
        "whitefly",
        "bugs",
        "caterpillar",
        "leaf eating insects",
        "insect attack",
      ],
      hi: [
        "कीट",
        "कीड़े",
        "सफेद मक्खी",
        "कीट हमला",
        "पत्ते खाने वाले कीड़े",
        "एफिड",
      ],
      te: [
        "పురుగులు",
        "కీటకాలు",
        "తెల్లదోమ",
        "పురుగు దాడి",
        "ఆకులు తినే పురుగులు",
        "అఫిడ్స్",
      ],
      ta: [
        "பூச்சிகள்",
        "பூச்சி",
        "வெள்ளை ஈ",
        "பூச்சி தாக்குதல்",
        "இலைகளை உண்ணும் பூச்சிகள்",
        "அசுவினி",
      ],
    },
    answer: {
      en: "Inspect the undersides of tomato leaves regularly for insects and eggs. Remove heavily affected leaves when appropriate and consult a local agricultural expert about suitable pest-control methods.",
      hi: "टमाटर के पत्तों की निचली सतह पर नियमित रूप से कीटों और अंडों की जाँच करें। अधिक प्रभावित पत्तों को उचित तरीके से हटाएँ और कीट नियंत्रण के लिए कृषि विशेषज्ञ से सलाह लें।",
      te: "టమాటా ఆకుల కింది భాగంలో పురుగులు, గుడ్లు ఉన్నాయో క్రమం తప్పకుండా పరిశీలించండి. ఎక్కువగా ప్రభావితమైన ఆకులను అవసరమైతే తొలగించి, పురుగుల నియంత్రణకు వ్యవసాయ నిపుణుడిని సంప్రదించండి.",
      ta: "தக்காளி இலைகளின் அடிப்பகுதியில் பூச்சிகள் மற்றும் முட்டைகள் உள்ளனவா எனத் தொடர்ந்து பாருங்கள். அதிகம் பாதிக்கப்பட்ட இலைகளைத் தேவையானபோது அகற்றி, பூச்சிக் கட்டுப்பாட்டுக்கு வேளாண் நிபுணரை அணுகவும்.",
    },
  },

  {
    id: "prevention",
    keywords: {
      en: [
        "prevent disease",
        "disease prevention",
        "prevent diseases",
        "keep plants healthy",
        "protect tomato plants",
        "avoid plant diseases",
        "how to prevent",
        "plant care",
        "tomato plant care",
      ],
      hi: [
        "बीमारी से बचाव",
        "रोग रोकथाम",
        "पौधों को स्वस्थ",
        "बीमारी कैसे रोकें",
        "पौधों की देखभाल",
      ],
      te: [
        "వ్యాధుల నివారణ",
        "వ్యాధులు రాకుండా",
        "మొక్కలను ఆరోగ్యంగా",
        "వ్యాధులను ఎలా నివారించాలి",
        "మొక్కల సంరక్షణ",
      ],
      ta: [
        "நோய் தடுப்பு",
        "நோய்களைத் தடுக்க",
        "செடிகளை ஆரோக்கியமாக",
        "நோயை எவ்வாறு தடுப்பது",
        "செடி பராமரிப்பு",
      ],
    },
    answer: {
      en: "Use healthy seedlings, maintain proper spacing, water near the roots, remove infected plant material and inspect leaves regularly. Crop rotation can also help reduce disease pressure.",
      hi: "स्वस्थ पौधों का चयन करें, उचित दूरी रखें, जड़ों के पास पानी दें, संक्रमित हिस्सों को हटाएँ और पत्तों की नियमित जाँच करें। फसल चक्र अपनाने से भी रोग का खतरा कम हो सकता है।",
      te: "ఆరోగ్యకరమైన మొక్కలను ఎంచుకోండి, సరైన దూరం పాటించండి, వేర్ల దగ్గర నీరు పోయండి, వ్యాధి సోకిన భాగాలను తొలగించండి మరియు ఆకులను క్రమం తప్పకుండా పరిశీలించండి. పంట మార్పిడి కూడా ఉపయోగపడుతుంది.",
      ta: "ஆரோக்கியமான நாற்றுகளைத் தேர்ந்தெடுத்து, சரியான இடைவெளி விட்டு, வேர்ப்பகுதியில் நீர் பாய்ச்சி, பாதிக்கப்பட்ட பகுதிகளை அகற்றி, இலைகளைத் தொடர்ந்து பரிசோதிக்கவும். பயிர் சுழற்சியும் நோய் அபாயத்தைக் குறைக்க உதவும்.",
    },
  },
];

export const fallbackAnswer: Record<Language, string> = {
  en: "I can help with tomato plant diseases, symptoms, prevention, watering, fertilizers and pests. Please ask a tomato farming question.",
  hi: "मैं टमाटर के पौधों की बीमारियों, लक्षणों, बचाव, सिंचाई, खाद और कीटों के बारे में मदद कर सकता हूँ। कृपया टमाटर की खेती से जुड़ा प्रश्न पूछें।",
  te: "నేను టమాటా మొక్కల వ్యాధులు, లక్షణాలు, నివారణ, నీరు, ఎరువులు మరియు పురుగుల గురించి సహాయం చేయగలను. దయచేసి టమాటా సాగుకు సంబంధించిన ప్రశ్న అడగండి.",
  ta: "தக்காளி செடிகளின் நோய்கள், அறிகுறிகள், தடுப்பு, நீர்ப்பாசனம், உரங்கள் மற்றும் பூச்சிகள் பற்றி உதவ முடியும். தக்காளி சாகுபடி தொடர்பான கேள்வியைக் கேளுங்கள்.",
};

function normalizeQuestion(question: string): string {
  return question
    .toLowerCase()
    .replace(/[.,!?।؟]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchPlantQuestion(
  question: string,
  language: Language
): string | null {
  const normalizedQuestion = normalizeQuestion(question);

  for (const item of plantKnowledge) {
    const matched = item.keywords[language].some((keyword) =>
      normalizedQuestion.includes(normalizeQuestion(keyword))
    );

    if (matched) {
      return item.answer[language];
    }
  }

  return null;
}
