
export type Language = "en" | "hi" | "te" | "ta";

export type DiseaseInfo = {
  title: string;
  cause: string;
  symptoms: string[];
  precautions: string[];
  recommendation: string;
};

export const diseaseInfo: Record<
  string,
  Record<Language, DiseaseInfo>
> = {
  Bacterial_Spot: {
    en: {
      title: "Bacterial Spot",
      cause: "A bacterial disease caused by Xanthomonas species. Wet leaves and splashing water can spread infection.",
      symptoms: ["Small dark or water-soaked spots.", "Yellow areas around some spots.", "Spots may merge and damage leaves."],
      precautions: ["Avoid overhead watering.", "Keep tools clean.", "Remove infected plant debris safely."],
      recommendation: "Seek local agricultural advice if symptoms spread. Use only approved treatments as directed."
    },
    hi: {
      title: "बैक्टीरियल स्पॉट रोग",
      cause: "यह Xanthomonas बैक्टीरिया से होने वाला रोग है। गीली पत्तियाँ और पानी के छींटे इसे फैला सकते हैं।",
      symptoms: ["पत्तियों पर छोटे गहरे या पानी से भीगे धब्बे।", "कुछ धब्बों के आसपास पीलापन।", "धब्बे मिलकर पत्तियों को नुकसान पहुँचा सकते हैं।"],
      precautions: ["ऊपर से पानी डालने से बचें।", "औजारों को साफ रखें।", "संक्रमित पौधों के अवशेष सुरक्षित रूप से हटाएँ।"],
      recommendation: "लक्षण फैलने पर कृषि विशेषज्ञ से सलाह लें। केवल स्वीकृत उपचार निर्देशानुसार इस्तेमाल करें।"
    },
    te: {
      title: "బాక్టీరియల్ స్పాట్ తెగులు",
      cause: "ఈ తెగులు Xanthomonas బ్యాక్టీరియా వల్ల వస్తుంది. తడి ఆకులు, నీటి చినుకుల ద్వారా వ్యాపించవచ్చు.",
      symptoms: ["ఆకులపై చిన్న నల్లటి లేదా నీటితో తడిసిన మచ్చలు.", "కొన్ని మచ్చల చుట్టూ పసుపు రంగు.", "మచ్చలు కలిసిపోయి ఆకులను దెబ్బతీయవచ్చు."],
      precautions: ["ఆకులపై నేరుగా నీరు చల్లవద్దు.", "పనిముట్లను శుభ్రంగా ఉంచండి.", "సోకిన మొక్కల అవశేషాలను సురక్షితంగా తొలగించండి."],
      recommendation: "లక్షణాలు వ్యాపిస్తే వ్యవసాయ నిపుణుడిని సంప్రదించండి. ఆమోదించిన చికిత్సలను సూచనల ప్రకారం మాత్రమే ఉపయోగించండి."
    },
    ta: {
      title: "பாக்டீரியா இலைப்புள்ளி நோய்",
      cause: "Xanthomonas வகை பாக்டீரியாக்களால் ஏற்படும் நோய். ஈரமான இலைகள் மற்றும் நீர்த்துளிகள் மூலம் பரவலாம்.",
      symptoms: ["இலைகளில் சிறிய கருமையான அல்லது நீர் தேங்கியதுபோன்ற புள்ளிகள்.", "சில புள்ளிகளைச் சுற்றி மஞ்சள் நிறம்.", "புள்ளிகள் ஒன்றிணைந்து இலைகளைச் சேதப்படுத்தலாம்."],
      precautions: ["இலைகளின் மீது நேரடியாக நீர் தெளிப்பதைத் தவிர்க்கவும்.", "கருவிகளைச் சுத்தமாக வைத்திருக்கவும்.", "பாதிக்கப்பட்ட தாவரக் கழிவுகளைப் பாதுகாப்பாக அகற்றவும்."],
      recommendation: "அறிகுறிகள் பரவினால் வேளாண் நிபுணரை அணுகவும். அங்கீகரிக்கப்பட்ட சிகிச்சைகளை வழிமுறைகளின்படி மட்டுமே பயன்படுத்தவும்."
    }
  },

  Early_Blight: {
    en: {
      title: "Early Blight",
      cause: "A fungal disease commonly caused by Alternaria solani. Warm, humid weather and wet leaves can favor infection.",
      symptoms: ["Brown spots with concentric rings.", "Yellowing around spots.", "Older leaves may dry and fall."],
      precautions: ["Avoid overhead watering.", "Provide good airflow.", "Remove infected leaves and crop debris safely."],
      recommendation: "Monitor affected plants and consult a local agricultural expert if the disease spreads."
    },
    hi: {
      title: "अगेती झुलसा रोग",
      cause: "यह आमतौर पर Alternaria solani नामक कवक से होता है। गर्म और नम मौसम में इसका प्रकोप बढ़ सकता है।",
      symptoms: ["पत्तियों पर गोल छल्लों जैसे भूरे धब्बे।", "धब्बों के आसपास पीलापन।", "पुरानी पत्तियाँ सूखकर गिर सकती हैं।"],
      precautions: ["ऊपर से पानी डालने से बचें।", "पौधों के बीच हवा आने-जाने दें।", "संक्रमित पत्तियों और अवशेषों को सुरक्षित हटाएँ।"],
      recommendation: "पौधों पर नजर रखें और रोग फैलने पर कृषि विशेषज्ञ से सलाह लें।"
    },
    te: {
      title: "ఎర్లీ బ్లైట్ తెగులు",
      cause: "ఇది సాధారణంగా Alternaria solani అనే శిలీంధ్రం వల్ల వస్తుంది. వేడి, తేమతో కూడిన వాతావరణం వ్యాధిని పెంచవచ్చు.",
      symptoms: ["ఆకులపై వలయాల్లాంటి గోధుమ మచ్చలు.", "మచ్చల చుట్టూ పసుపు రంగు.", "పాత ఆకులు ఎండిపోయి రాలవచ్చు."],
      precautions: ["ఆకులపై నేరుగా నీరు చల్లవద్దు.", "మొక్కల మధ్య గాలి ప్రసరణ ఉండేలా చూడండి.", "సోకిన ఆకులు, పంట అవశేషాలను సురక్షితంగా తొలగించండి."],
      recommendation: "మొక్కలను గమనిస్తూ ఉండండి. తెగులు వ్యాపిస్తే వ్యవసాయ నిపుణుడిని సంప్రదించండి."
    },
    ta: {
      title: "ஆரம்ப இலைக்கருகல் நோய்",
      cause: "இது பொதுவாக Alternaria solani என்ற பூஞ்சையால் ஏற்படுகிறது. வெப்பமும் ஈரப்பதமும் நோய் வளர்ச்சிக்கு உதவலாம்.",
      symptoms: ["இலைகளில் வளைய வடிவிலான பழுப்பு புள்ளிகள்.", "புள்ளிகளைச் சுற்றி மஞ்சள் நிறம்.", "பழைய இலைகள் காய்ந்து உதிரலாம்."],
      precautions: ["இலைகளின் மீது நேரடியாக நீர் தெளிப்பதைத் தவிர்க்கவும்.", "செடிகளுக்கு இடையே நல்ல காற்றோட்டம் இருக்கச் செய்யவும்.", "பாதிக்கப்பட்ட இலைகள் மற்றும் பயிர்க் கழிவுகளைப் பாதுகாப்பாக அகற்றவும்."],
      recommendation: "செடிகளைக் கண்காணிக்கவும். நோய் பரவினால் வேளாண் நிபுணரை அணுகவும்."
    }
  },

  Healthy: {
    en: {
      title: "Healthy Leaf",
      cause: "The model classified this image as healthy. No disease was identified in the submitted image.",
      symptoms: ["No obvious disease pattern detected by the model.", "The leaf may appear green and relatively uniform."],
      precautions: ["Water appropriately.", "Maintain good airflow.", "Inspect leaves regularly."],
      recommendation: "Continue normal plant care. This result does not guarantee that the entire plant is disease-free."
    },
    hi: {
      title: "स्वस्थ पत्ती",
      cause: "मॉडल ने इस तस्वीर को स्वस्थ पत्ती के रूप में पहचाना है। तस्वीर में किसी रोग की पहचान नहीं हुई।",
      symptoms: ["मॉडल को रोग का स्पष्ट पैटर्न नहीं मिला।", "पत्ती हरी और सामान्य दिखाई दे सकती है।"],
      precautions: ["उचित मात्रा में पानी दें।", "पौधों में अच्छा वायु संचार रखें।", "पत्तियों की नियमित जाँच करें।"],
      recommendation: "सामान्य देखभाल जारी रखें। यह परिणाम पूरे पौधे के रोगमुक्त होने की गारंटी नहीं है।"
    },
    te: {
      title: "ఆరోగ్యకరమైన ఆకు",
      cause: "ఈ చిత్రాన్ని మోడల్ ఆరోగ్యకరమైన ఆకుగా గుర్తించింది. చిత్రంలో నిర్దిష్ట తెగులు గుర్తించబడలేదు.",
      symptoms: ["మోడల్‌కు స్పష్టమైన తెగులు లక్షణాలు కనిపించలేదు.", "ఆకు పచ్చగా, సాధారణంగా కనిపించవచ్చు."],
      precautions: ["సరైన మోతాదులో నీరు ఇవ్వండి.", "మొక్కల మధ్య గాలి ప్రసరణ ఉండేలా చూడండి.", "ఆకులను క్రమం తప్పకుండా పరిశీలించండి."],
      recommendation: "సాధారణ సంరక్షణ కొనసాగించండి. ఈ ఫలితం మొత్తం మొక్కకు తెగులు లేదని హామీ ఇవ్వదు."
    },
    ta: {
      title: "ஆரோக்கியமான இலை",
      cause: "இந்தப் படத்தை ஆரோக்கியமான இலையாக மாடல் வகைப்படுத்தியுள்ளது. படத்தில் குறிப்பிட்ட நோய் எதுவும் கண்டறியப்படவில்லை.",
      symptoms: ["மாடலுக்கு தெளிவான நோய் அறிகுறிகள் தெரியவில்லை.", "இலை பச்சையாகவும் இயல்பாகவும் இருக்கலாம்."],
      precautions: ["சரியான அளவில் நீர் வழங்கவும்.", "செடிகளுக்கு நல்ல காற்றோட்டம் இருக்கச் செய்யவும்.", "இலைகளைத் தொடர்ந்து பரிசோதிக்கவும்."],
      recommendation: "வழக்கமான பராமரிப்பைத் தொடரவும். இந்த முடிவு முழுச் செடியும் நோயற்றது என்பதற்கான உத்தரவாதம் அல்ல."
    }
  },

  Late_Blight: {
    en: {
      title: "Late Blight",
      cause: "A destructive disease caused by Phytophthora infestans. Cool, humid conditions and wet leaves favor its development.",
      symptoms: ["Irregular dark, water-soaked lesions.", "Lesions can expand rapidly.", "White growth may appear in humid conditions."],
      precautions: ["Inspect plants during cool, wet weather.", "Avoid prolonged leaf wetness.", "Remove affected material carefully."],
      recommendation: "Seek prompt agricultural advice because the disease can spread rapidly. Use only locally approved treatments."
    },
    hi: {
      title: "पछेती झुलसा रोग",
      cause: "यह Phytophthora infestans नामक रोगजनक से होता है। ठंडा और नम मौसम इसके फैलाव को बढ़ा सकता है।",
      symptoms: ["अनियमित गहरे, पानी से भीगे धब्बे।", "धब्बे तेजी से फैल सकते हैं।", "नम वातावरण में सफेद वृद्धि दिखाई दे सकती है।"],
      precautions: ["ठंडे और नम मौसम में पौधों की जाँच करें।", "पत्तियों को लंबे समय तक गीला न रहने दें।", "प्रभावित भागों को सावधानी से हटाएँ।"],
      recommendation: "यह रोग तेजी से फैल सकता है, इसलिए जल्द कृषि विशेषज्ञ से सलाह लें। केवल स्थानीय रूप से स्वीकृत उपचार इस्तेमाल करें।"
    },
    te: {
      title: "లేట్ బ్లైట్ తెగులు",
      cause: "ఇది Phytophthora infestans అనే వ్యాధికారకం వల్ల వస్తుంది. చల్లని, తేమతో కూడిన వాతావరణం దీని వ్యాప్తికి అనుకూలం.",
      symptoms: ["క్రమరహితమైన ముదురు, నీటితో తడిసిన మచ్చలు.", "మచ్చలు వేగంగా విస్తరించవచ్చు.", "తేమ ఎక్కువగా ఉన్నప్పుడు తెల్లటి పెరుగుదల కనిపించవచ్చు."],
      precautions: ["చల్లని, తడి వాతావరణంలో మొక్కలను పరిశీలించండి.", "ఆకులు ఎక్కువసేపు తడిగా ఉండకుండా చూడండి.", "సోకిన భాగాలను జాగ్రత్తగా తొలగించండి."],
      recommendation: "ఈ తెగులు వేగంగా వ్యాపించవచ్చు. వెంటనే వ్యవసాయ నిపుణుడిని సంప్రదించి, స్థానికంగా ఆమోదించిన చికిత్సలను మాత్రమే ఉపయోగించండి."
    },
    ta: {
      title: "தாமத இலைக்கருகல் நோய்",
      cause: "Phytophthora infestans என்ற நோய்க்காரணியால் ஏற்படுகிறது. குளிர்ச்சியும் அதிக ஈரப்பதமும் நோய் பரவ உதவும்.",
      symptoms: ["ஒழுங்கற்ற கருமையான, நீர் தேங்கியதுபோன்ற புண்கள்.", "புண்கள் விரைவாகப் பெரிதாகலாம்.", "ஈரமான சூழலில் வெள்ளை நிற வளர்ச்சி தோன்றலாம்."],
      precautions: ["குளிர்ந்த ஈரமான காலநிலையில் செடிகளைப் பரிசோதிக்கவும்.", "இலைகள் நீண்ட நேரம் ஈரமாக இருப்பதைத் தவிர்க்கவும்.", "பாதிக்கப்பட்ட பகுதிகளை கவனமாக அகற்றவும்."],
      recommendation: "இந்த நோய் வேகமாகப் பரவலாம். உடனடியாக வேளாண் நிபுணரை அணுகி, உள்ளூரில் அங்கீகரிக்கப்பட்ட சிகிச்சைகளை மட்டுமே பயன்படுத்தவும்."
    }
  },

  Leaf_Mold: {
    en: {
      title: "Leaf Mold",
      cause: "A fungal disease commonly caused by Passalora fulva. High humidity and poor airflow favor infection.",
      symptoms: ["Yellow patches on the upper leaf surface.", "Olive-green or brown growth underneath.", "Leaves may curl and dry."],
      precautions: ["Improve ventilation.", "Reduce excessive humidity.", "Avoid wetting leaves during watering."],
      recommendation: "Improve airflow and seek agricultural advice if symptoms continue to spread."
    },
    hi: {
      title: "लीफ मोल्ड रोग",
      cause: "यह आमतौर पर Passalora fulva नामक कवक से होता है। अधिक नमी और कम हवा का संचार रोग को बढ़ावा देते हैं।",
      symptoms: ["पत्ती की ऊपरी सतह पर पीले धब्बे।", "नीचे की सतह पर जैतूनी-हरे या भूरे रंग की वृद्धि।", "पत्तियाँ मुड़कर सूख सकती हैं।"],
      precautions: ["हवा का संचार बेहतर करें।", "अत्यधिक नमी कम करें।", "पानी देते समय पत्तियों को भिगोने से बचें।"],
      recommendation: "वायु संचार सुधारें। लक्षण फैलते रहें तो कृषि विशेषज्ञ से सलाह लें।"
    },
    te: {
      title: "లీఫ్ మోల్డ్ తెగులు",
      cause: "ఇది సాధారణంగా Passalora fulva అనే శిలీంధ్రం వల్ల వస్తుంది. అధిక తేమ, తక్కువ గాలి ప్రసరణ వ్యాధిని పెంచుతాయి.",
      symptoms: ["ఆకు పైభాగంలో పసుపు మచ్చలు.", "ఆకు కింది భాగంలో ఆలివ్ ఆకుపచ్చ లేదా గోధుమ పెరుగుదల.", "ఆకులు ముడుచుకుని ఎండిపోవచ్చు."],
      precautions: ["గాలి ప్రసరణను మెరుగుపరచండి.", "అధిక తేమను తగ్గించండి.", "నీరు పెట్టేటప్పుడు ఆకులు తడవకుండా చూడండి."],
      recommendation: "గాలి ప్రసరణను మెరుగుపరచండి. లక్షణాలు వ్యాపిస్తే వ్యవసాయ నిపుణుడిని సంప్రదించండి."
    },
    ta: {
      title: "இலைப் பூஞ்சை நோய்",
      cause: "இது பொதுவாக Passalora fulva என்ற பூஞ்சையால் ஏற்படுகிறது. அதிக ஈரப்பதமும் குறைந்த காற்றோட்டமும் நோயை ஊக்குவிக்கும்.",
      symptoms: ["இலையின் மேற்பரப்பில் மஞ்சள் திட்டுகள்.", "இலையின் அடிப்பகுதியில் ஆலிவ் பச்சை அல்லது பழுப்பு நிற வளர்ச்சி.", "இலைகள் சுருண்டு காயலாம்."],
      precautions: ["காற்றோட்டத்தை மேம்படுத்தவும்.", "அதிக ஈரப்பதத்தைக் குறைக்கவும்.", "நீர் பாய்ச்சும்போது இலைகள் நனையாமல் பார்த்துக்கொள்ளவும்."],
      recommendation: "காற்றோட்டத்தை மேம்படுத்தவும். அறிகுறிகள் பரவினால் வேளாண் நிபுணரை அணுகவும்."
    }
  },

  Septoria_Leaf_Spot: {
    en: {
      title: "Septoria Leaf Spot",
      cause: "A fungal disease caused by Septoria lycopersici. Splashing water can spread the infection.",
      symptoms: ["Many small circular leaf spots.", "Light centers with dark margins.", "Leaves may yellow and fall."],
      precautions: ["Avoid overhead watering.", "Remove infected lower leaves.", "Keep tools clean and rotate crops where practical."],
      recommendation: "Monitor the plants and seek agricultural advice if leaf damage increases."
    },
    hi: {
      title: "सेप्टोरिया पत्ती धब्बा रोग",
      cause: "यह Septoria lycopersici नामक कवक से होता है। पानी के छींटे संक्रमण फैला सकते हैं।",
      symptoms: ["पत्तियों पर कई छोटे गोल धब्बे।", "धब्बों का बीच हल्का और किनारे गहरे हो सकते हैं।", "पत्तियाँ पीली होकर गिर सकती हैं।"],
      precautions: ["ऊपर से पानी डालने से बचें।", "संक्रमित निचली पत्तियाँ हटाएँ।", "औजार साफ रखें और संभव हो तो फसल चक्र अपनाएँ।"],
      recommendation: "पौधों की निगरानी करें। पत्तियों को अधिक नुकसान होने पर कृषि विशेषज्ञ से सलाह लें।"
    },
    te: {
      title: "సెప్టోరియా ఆకు మచ్చ తెగులు",
      cause: "ఇది Septoria lycopersici అనే శిలీంధ్రం వల్ల వస్తుంది. నీటి చినుకులు వ్యాధిని వ్యాపింపజేయవచ్చు.",
      symptoms: ["ఆకులపై అనేక చిన్న గుండ్రని మచ్చలు.", "మచ్చల మధ్య భాగం లేతగా, అంచులు ముదురుగా ఉండవచ్చు.", "ఆకులు పసుపు రంగులోకి మారి రాలవచ్చు."],
      precautions: ["ఆకులపై నేరుగా నీరు చల్లవద్దు.", "సోకిన కింది ఆకులను తొలగించండి.", "పనిముట్లను శుభ్రంగా ఉంచి, సాధ్యమైనప్పుడు పంట మార్పిడి చేయండి."],
      recommendation: "మొక్కలను గమనించండి. ఆకు నష్టం పెరిగితే వ్యవసాయ నిపుణుడిని సంప్రదించండి."
    },
    ta: {
      title: "செப்டோரியா இலைப்புள்ளி நோய்",
      cause: "Septoria lycopersici என்ற பூஞ்சையால் ஏற்படும் நோய். நீர்த்துளிகள் மூலம் பரவலாம்.",
      symptoms: ["இலைகளில் பல சிறிய வட்டப் புள்ளிகள்.", "புள்ளிகளின் நடுப்பகுதி வெளிர்ந்தும் ஓரங்கள் கருமையாகவும் இருக்கலாம்.", "இலைகள் மஞ்சளாகி உதிரலாம்."],
      precautions: ["இலைகளின் மீது நேரடியாக நீர் தெளிப்பதைத் தவிர்க்கவும்.", "பாதிக்கப்பட்ட கீழ் இலைகளை அகற்றவும்.", "கருவிகளைச் சுத்தமாக வைத்து, இயன்றால் பயிர் சுழற்சி செய்யவும்."],
      recommendation: "செடிகளைக் கண்காணிக்கவும். இலைச் சேதம் அதிகரித்தால் வேளாண் நிபுணரை அணுகவும்."
    }
  },

  Spider_Mites: {
    en: {
      title: "Spider Mites",
      cause: "Tiny plant-feeding mites. Hot, dry conditions can favor outbreaks.",
      symptoms: ["Fine pale speckles on leaves.", "Fine webbing in heavy infestations.", "Leaves may bronze, dry, or fall."],
      precautions: ["Inspect the undersides of leaves.", "Check nearby plants.", "Avoid unnecessary broad-spectrum pesticides."],
      recommendation: "Confirm mites are present before treatment. Ask a local expert about appropriate control methods."
    },
    hi: {
      title: "स्पाइडर माइट्स का प्रकोप",
      cause: "ये बहुत छोटे कीट-सदृश माइट्स हैं जो पौधों का रस चूसते हैं। गर्म और शुष्क मौसम में इनका प्रकोप बढ़ सकता है।",
      symptoms: ["पत्तियों पर बारीक हल्के धब्बे।", "अधिक प्रकोप में महीन जाला।", "पत्तियाँ भूरी होकर सूख या गिर सकती हैं।"],
      precautions: ["पत्तियों की निचली सतह जाँचें।", "आसपास के पौधों की भी जाँच करें।", "अनावश्यक व्यापक प्रभाव वाले कीटनाशकों से बचें।"],
      recommendation: "उपचार से पहले माइट्स की पुष्टि करें। उचित नियंत्रण के लिए स्थानीय विशेषज्ञ से सलाह लें।"
    },
    te: {
      title: "స్పైడర్ మైట్స్ సమస్య",
      cause: "ఇవి మొక్కల రసాన్ని పీల్చే అతి చిన్న మైట్స్. వేడి, పొడి వాతావరణంలో వీటి ఉధృతి పెరగవచ్చు.",
      symptoms: ["ఆకులపై చిన్న లేత మచ్చలు.", "ఎక్కువగా సోకినప్పుడు సన్నని వలలు.", "ఆకులు గోధుమ రంగులోకి మారి ఎండిపోవచ్చు లేదా రాలవచ్చు."],
      precautions: ["ఆకుల కింది భాగాన్ని పరిశీలించండి.", "పక్కనున్న మొక్కలను కూడా తనిఖీ చేయండి.", "అవసరం లేని విస్తృత ప్రభావం కలిగిన పురుగుమందులను నివారించండి."],
      recommendation: "చికిత్సకు ముందు మైట్స్ ఉన్నాయో నిర్ధారించండి. సరైన నియంత్రణ కోసం వ్యవసాయ నిపుణుడిని సంప్రదించండి."
    },
    ta: {
      title: "சிலந்திப்பேன் தாக்குதல்",
      cause: "இவை தாவரச் சாற்றை உறிஞ்சும் மிகச் சிறிய பூச்சியினங்கள். வெப்பமான வறண்ட சூழலில் இவற்றின் தாக்குதல் அதிகரிக்கலாம்.",
      symptoms: ["இலைகளில் சிறிய வெளிர்ந்த புள்ளிகள்.", "தாக்குதல் அதிகமானால் மெல்லிய வலைகள்.", "இலைகள் பழுப்பு நிறமாகி காயலாம் அல்லது உதிரலாம்."],
      precautions: ["இலைகளின் அடிப்பகுதியைப் பரிசோதிக்கவும்.", "அருகிலுள்ள செடிகளையும் சரிபார்க்கவும்.", "தேவையற்ற பரந்த செயல்பாட்டு பூச்சிக்கொல்லிகளைத் தவிர்க்கவும்."],
      recommendation: "சிகிச்சைக்கு முன் சிலந்திப்பேன் இருப்பதை உறுதிப்படுத்தவும். கட்டுப்பாட்டு முறைகளுக்கு வேளாண் நிபுணரை அணுகவும்."
    }
  },

  Target_Spot: {
    en: {
      title: "Target Spot",
      cause: "A fungal disease commonly associated with Corynespora cassiicola. Warm, humid conditions can favor infection.",
      symptoms: ["Brown lesions that may develop rings.", "Spots may enlarge and merge.", "Severe damage may cause leaves to fall."],
      precautions: ["Reduce prolonged leaf wetness.", "Improve plant spacing and airflow.", "Remove infected debris safely."],
      recommendation: "Symptoms can resemble other diseases. Seek expert confirmation if uncertain."
    },
    hi: {
      title: "टारगेट स्पॉट रोग",
      cause: "यह Corynespora cassiicola नामक कवक से जुड़ा रोग है। गर्म और नम मौसम में इसका प्रकोप बढ़ सकता है।",
      symptoms: ["भूरे धब्बे जिनमें छल्ले बन सकते हैं।", "धब्बे बड़े होकर आपस में मिल सकते हैं।", "अधिक नुकसान होने पर पत्तियाँ गिर सकती हैं।"],
      precautions: ["पत्तियों को लंबे समय तक गीला न रहने दें।", "पौधों के बीच उचित दूरी और हवा का संचार रखें।", "संक्रमित अवशेष सुरक्षित रूप से हटाएँ।"],
      recommendation: "इसके लक्षण अन्य रोगों जैसे हो सकते हैं। संदेह होने पर विशेषज्ञ से पुष्टि कराएँ।"
    },
    te: {
      title: "టార్గెట్ స్పాట్ తెగులు",
      cause: "ఇది Corynespora cassiicola అనే శిలీంధ్రంతో సంబంధం ఉన్న తెగులు. వేడి, తేమ ఎక్కువగా ఉన్నప్పుడు వ్యాధి పెరగవచ్చు.",
      symptoms: ["వలయాలు ఏర్పడే గోధుమ మచ్చలు.", "మచ్చలు పెద్దవై కలిసిపోవచ్చు.", "తీవ్రమైన నష్టం వల్ల ఆకులు రాలవచ్చు."],
      precautions: ["ఆకులు ఎక్కువసేపు తడిగా ఉండకుండా చూడండి.", "మొక్కల మధ్య తగిన దూరం, గాలి ప్రసరణ కల్పించండి.", "సోకిన అవశేషాలను సురక్షితంగా తొలగించండి."],
      recommendation: "ఇతర తెగుళ్ల లక్షణాలతో ఇవి పోలి ఉండవచ్చు. సందేహం ఉంటే నిపుణుడితో నిర్ధారించుకోండి."
    },
    ta: {
      title: "டார்கெட் ஸ்பாட் நோய்",
      cause: "Corynespora cassiicola என்ற பூஞ்சையுடன் தொடர்புடைய நோய். வெப்பமும் ஈரப்பதமும் நோயை ஊக்குவிக்கலாம்.",
      symptoms: ["வளையங்கள் உருவாகக்கூடிய பழுப்பு நிறப் புண்கள்.", "புள்ளிகள் பெரிதாகி ஒன்றிணையலாம்.", "கடுமையான பாதிப்பில் இலைகள் உதிரலாம்."],
      precautions: ["இலைகள் நீண்ட நேரம் ஈரமாக இருப்பதைத் தவிர்க்கவும்.", "செடிகளுக்கு இடைவெளியும் நல்ல காற்றோட்டமும் வழங்கவும்.", "பாதிக்கப்பட்ட கழிவுகளைப் பாதுகாப்பாக அகற்றவும்."],
      recommendation: "இதன் அறிகுறிகள் பிற நோய்களைப் போல இருக்கலாம். சந்தேகம் இருந்தால் நிபுணரிடம் உறுதிப்படுத்தவும்."
    }
  },

  Tomato_Mosaic_Virus: {
    en: {
      title: "Tomato Mosaic Virus",
      cause: "A viral disease that can spread through contaminated hands, tools, seeds, or plant material.",
      symptoms: ["Mottled light and dark green leaves.", "Distorted or narrow leaves.", "Reduced plant growth."],
      precautions: ["Clean hands and tools.", "Use healthy planting material.", "Avoid handling healthy plants immediately after suspected infected plants."],
      recommendation: "There is no curative treatment for an infected plant. Seek expert confirmation and follow local guidance."
    },
    hi: {
      title: "टमाटर मोज़ेक वायरस",
      cause: "यह एक विषाणुजनित रोग है जो दूषित हाथों, औजारों, बीजों या पौधों की सामग्री से फैल सकता है।",
      symptoms: ["पत्तियों पर हल्के और गहरे हरे रंग का मिश्रण।", "पत्तियों का विकृत या संकरा होना।", "पौधे की वृद्धि कम होना।"],
      precautions: ["हाथों और औजारों को साफ रखें।", "स्वस्थ बीज और पौध सामग्री का उपयोग करें।", "संदिग्ध संक्रमित पौधों को छूने के बाद स्वस्थ पौधों को न छुएँ।"],
      recommendation: "संक्रमित पौधे का उपचार करके वायरस समाप्त नहीं किया जा सकता। विशेषज्ञ से पुष्टि और स्थानीय सलाह लें।"
    },
    te: {
      title: "టమాటో మొజాయిక్ వైరస్",
      cause: "ఇది వైరస్ వల్ల వచ్చే తెగులు. కలుషితమైన చేతులు, పనిముట్లు, విత్తనాలు లేదా మొక్కల పదార్థాల ద్వారా వ్యాపించవచ్చు.",
      symptoms: ["ఆకులపై లేత, ముదురు ఆకుపచ్చ రంగుల మిశ్రమం.", "ఆకులు వంకరగా లేదా సన్నగా మారడం.", "మొక్క పెరుగుదల తగ్గడం."],
      precautions: ["చేతులు, పనిముట్లను శుభ్రంగా ఉంచండి.", "ఆరోగ్యకరమైన విత్తనాలు, మొక్కల పదార్థాలను ఉపయోగించండి.", "సోకినట్లు అనుమానం ఉన్న మొక్కలను తాకిన వెంటనే ఆరోగ్యకరమైన మొక్కలను తాకవద్దు."],
      recommendation: "సోకిన మొక్కలోని వైరస్‌ను నయం చేసే చికిత్స లేదు. నిపుణుడి నిర్ధారణ, స్థానిక సూచనలను అనుసరించండి."
    },
    ta: {
      title: "தக்காளி மொசைக் வைரஸ்",
      cause: "இது ஒரு வைரஸ் நோய். மாசடைந்த கைகள், கருவிகள், விதைகள் அல்லது தாவரப் பொருட்கள் மூலம் பரவலாம்.",
      symptoms: ["இலைகளில் வெளிர் மற்றும் அடர் பச்சை நிறக் கலவை.", "இலைகள் சிதைந்து அல்லது குறுகலாக மாறுதல்.", "செடியின் வளர்ச்சி குறைதல்."],
      precautions: ["கைகளையும் கருவிகளையும் சுத்தமாக வைத்திருக்கவும்.", "ஆரோக்கியமான விதைகள் மற்றும் நடவுப் பொருட்களைப் பயன்படுத்தவும்.", "பாதிக்கப்பட்டிருக்கலாம் என சந்தேகிக்கும் செடிகளைத் தொட்ட பிறகு ஆரோக்கியமான செடிகளைத் தொடாதீர்கள்."],
      recommendation: "பாதிக்கப்பட்ட செடியில் வைரஸை குணப்படுத்தும் சிகிச்சை இல்லை. நிபுணரிடம் உறுதிப்படுத்தி உள்ளூர் வழிகாட்டுதலைப் பின்பற்றவும்."
    }
  },

  Yellow_Leaf_Curl_Virus: {
    en: {
      title: "Tomato Yellow Leaf Curl Virus",
      cause: "A viral disease transmitted mainly by whiteflies.",
      symptoms: ["Upward curling of leaves.", "Yellowing along leaf margins.", "Stunted growth and reduced fruit production."],
      precautions: ["Monitor plants for whiteflies.", "Use locally recommended whitefly-management methods.", "Consider resistant varieties when available."],
      recommendation: "Seek local agricultural advice. Infected plants cannot be cured with a pesticide."
    },
    hi: {
      title: "टमाटर पीली पत्ती मरोड़ वायरस",
      cause: "यह विषाणुजनित रोग मुख्यतः सफेद मक्खी द्वारा फैलता है।",
      symptoms: ["पत्तियों का ऊपर की ओर मुड़ना।", "पत्तियों के किनारों पर पीलापन।", "पौधे की वृद्धि और फल उत्पादन कम होना।"],
      precautions: ["सफेद मक्खी की नियमित जाँच करें।", "स्थानीय रूप से सुझाए गए नियंत्रण उपाय अपनाएँ।", "उपलब्ध होने पर प्रतिरोधी किस्में चुनें।"],
      recommendation: "स्थानीय कृषि विशेषज्ञ से सलाह लें। संक्रमित पौधे को कीटनाशक से ठीक नहीं किया जा सकता।"
    },
    te: {
      title: "టమాటో పసుపు ఆకు ముడత వైరస్",
      cause: "ఈ వైరస్ ప్రధానంగా తెల్లదోమ ద్వారా వ్యాపిస్తుంది.",
      symptoms: ["ఆకులు పైవైపు ముడుచుకోవడం.", "ఆకు అంచులు పసుపు రంగులోకి మారడం.", "మొక్క ఎదుగుదల, పండ్ల దిగుబడి తగ్గడం."],
      precautions: ["తెల్లదోమ ఉందేమో మొక్కలను పరిశీలించండి.", "స్థానికంగా సూచించిన తెల్లదోమ నియంత్రణ పద్ధతులను పాటించండి.", "అందుబాటులో ఉంటే తెగులు నిరోధక రకాలను ఎంచుకోండి."],
      recommendation: "వ్యవసాయ నిపుణుడిని సంప్రదించండి. సోకిన మొక్కను పురుగుమందుతో నయం చేయలేము."
    },
    ta: {
      title: "தக்காளி மஞ்சள் இலை சுருள் வைரஸ்",
      cause: "இந்த வைரஸ் முக்கியமாக வெள்ளை ஈக்கள் மூலம் பரவுகிறது.",
      symptoms: ["இலைகள் மேல்நோக்கிச் சுருளுதல்.", "இலை ஓரங்களில் மஞ்சள் நிறம் தோன்றுதல்.", "செடி வளர்ச்சியும் பழ உற்பத்தியும் குறைதல்."],
      precautions: ["வெள்ளை ஈக்கள் உள்ளனவா எனச் செடிகளைப் பரிசோதிக்கவும்.", "உள்ளூரில் பரிந்துரைக்கப்படும் வெள்ளை ஈக் கட்டுப்பாட்டு முறைகளைப் பின்பற்றவும்.", "கிடைத்தால் எதிர்ப்புத் திறன் கொண்ட ரகங்களைத் தேர்வு செய்யவும்."],
      recommendation: "உள்ளூர் வேளாண் நிபுணரை அணுகவும். பாதிக்கப்பட்ட செடியை பூச்சிக்கொல்லியால் குணப்படுத்த முடியாது."
    }
  }
};
