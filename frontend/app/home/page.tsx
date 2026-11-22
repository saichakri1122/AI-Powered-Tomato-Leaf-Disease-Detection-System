
"use client";

import { useEffect, useRef, useState } from "react";
import { diseaseInfo } from "@/data/Diseaseinformations";
import VoiceAssistant from "../components/voice-assistance/VoiceAssistant";

const API_URL = "http://127.0.0.1:8000/predict";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=1800&q=90";

const LEAF_IMAGE =
  "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=900&q=85";

const translations = {
  en: {
    welcome: "Welcome, Plant Protector!",
    subtitle: "Let's grow healthier tomato plants together.",
    status: "Your intelligent plant care companion",
    healthy: "Give your tomato plants the care they deserve.",
    description: "Upload a clear tomato leaf image and let our AI model analyze it for possible diseases.",
    scan: "Choose Leaf Image",
    camera: "Take a Photo",
    upload: "Upload from Device",
    tipTitle: "Tips for accurate detection",
    tip: "Capture one tomato leaf in natural lighting. Keep the leaf in focus and avoid blurry images.",
    language: "Change language",
    preview: "Your selected leaf",
    analyze: "Analyze My Leaf",
    scanning: "Analyzing your tomato leaf...",
    result: "Disease Detection Result",
    retry: "Scan Another Leaf",
    voice: "Ask our plant assistant",
    listening: "Listening... Speak now",
    voiceUnsupported: "Voice input is not supported by this browser.",
    cameraError: "Could not open the camera or image picker.",
    apiError: "Could not connect to the prediction service. Check that your backend is running.",
    uncertain: "The result is uncertain. Please try a clearer photo.",
    rejected: "This image was not identified as a tomato leaf.",
    success: "Analysis completed",
    confidence: "Model confidence",
    causeTitle: "Why it happens",
    symptomsTitle: "Visible symptoms",
    precautionsTitle: "Preventive measures",
    recommendationTitle: "Recommended action",
    footer: "Growing healthier tomato plants, together.",
    healthyBadge: "Plant health matters",
    uploadTitle: "Let's examine your plant",
    uploadSubtitle: "Upload a leaf photograph to identify possible diseases.",
    stepOne: "Upload",
    stepTwo: "Analyze",
    stepThree: "Protect",
    imageNote: "JPG, PNG or WEBP · Maximum 10 MB",
    selected: "Image ready for analysis",
    confidenceLabel: "AI confidence",
    noResult: "No prediction details available.",
    scanAgain: "Analyze another image",
    photoGuide: "For better results, photograph a single leaf against a simple background.",
    detected: "Detected condition",
  },

  hi: {
    welcome: "स्वागत है, पौधों के रक्षक!",
    subtitle: "आइए मिलकर स्वस्थ टमाटर के पौधे उगाएँ।",
    status: "आपका स्मार्ट पौधा देखभाल साथी",
    healthy: "अपने टमाटर के पौधों को बेहतर देखभाल दें।",
    description: "टमाटर के पत्ते की साफ तस्वीर अपलोड करें और AI से संभावित बीमारियों की जाँच करवाएँ।",
    scan: "पत्ती की तस्वीर चुनें",
    camera: "तस्वीर लें",
    upload: "डिवाइस से अपलोड करें",
    tipTitle: "सटीक पहचान के लिए सुझाव",
    tip: "प्राकृतिक रोशनी में एक टमाटर के पत्ते की साफ तस्वीर लें। धुंधली तस्वीरों से बचें।",
    language: "भाषा बदलें",
    preview: "आपकी चुनी हुई पत्ती",
    analyze: "मेरी पत्ती की जाँच करें",
    scanning: "आपके टमाटर के पत्ते की जाँच हो रही है...",
    result: "बीमारी की जाँच का परिणाम",
    retry: "दूसरी पत्ती की जाँच करें",
    voice: "पौधा सहायक से पूछें",
    listening: "सुन रहा है... अब बोलें",
    voiceUnsupported: "इस ब्राउज़र में आवाज़ से इनपुट उपलब्ध नहीं है।",
    cameraError: "कैमरा या तस्वीर चयन नहीं खुल सका।",
    apiError: "जाँच सेवा से कनेक्ट नहीं हो सका। बैकएंड चालू है या नहीं, जाँचें।",
    uncertain: "परिणाम स्पष्ट नहीं है। कृपया साफ तस्वीर आज़माएँ।",
    rejected: "इस तस्वीर की पहचान टमाटर की पत्ती के रूप में नहीं हुई।",
    success: "जाँच पूरी हुई",
    confidence: "मॉडल का विश्वास स्तर",
    causeTitle: "यह रोग क्यों होता है",
    symptomsTitle: "दिखने वाले लक्षण",
    precautionsTitle: "बचाव के उपाय",
    recommendationTitle: "सुझाया गया कदम",
    footer: "आइए, टमाटर की फसल को स्वस्थ बनाएँ।",
    healthyBadge: "पौधों का स्वास्थ्य महत्वपूर्ण है",
    uploadTitle: "आइए आपके पौधे की जाँच करें",
    uploadSubtitle: "संभावित बीमारी पहचानने के लिए पत्ती की तस्वीर अपलोड करें।",
    stepOne: "अपलोड",
    stepTwo: "जाँच",
    stepThree: "सुरक्षा",
    imageNote: "JPG, PNG या WEBP · अधिकतम 10 MB",
    selected: "तस्वीर जाँच के लिए तैयार है",
    confidenceLabel: "AI विश्वास स्तर",
    noResult: "जाँच का विवरण उपलब्ध नहीं है।",
    scanAgain: "दूसरी तस्वीर की जाँच करें",
    photoGuide: "बेहतर परिणाम के लिए एक पत्ती की तस्वीर साधारण पृष्ठभूमि में लें।",
    detected: "पहचानी गई स्थिति",
  },

  te: {
    welcome: "స్వాగతం, మొక్కల సంరక్షకులారా!",
    subtitle: "కలిసి ఆరోగ్యకరమైన టమాటా మొక్కలను పెంచుదాం.",
    status: "మీ తెలివైన మొక్కల సంరక్షణ సహాయకుడు",
    healthy: "మీ టమాటా మొక్కలకు మంచి సంరక్షణ అందించండి.",
    description: "టమాటా ఆకు స్పష్టమైన ఫోటోను అప్‌లోడ్ చేసి AI ద్వారా వ్యాధులను గుర్తించండి.",
    scan: "ఆకు ఫోటోను ఎంచుకోండి",
    camera: "ఫోటో తీయండి",
    upload: "పరికరం నుండి అప్‌లోడ్ చేయండి",
    tipTitle: "ఖచ్చితమైన గుర్తింపు కోసం సూచనలు",
    tip: "సహజమైన వెలుతురులో ఒక టమాటా ఆకును స్పష్టంగా ఫోటో తీయండి. అస్పష్టమైన చిత్రాలను నివారించండి.",
    language: "భాష మార్చండి",
    preview: "మీరు ఎంచుకున్న ఆకు",
    analyze: "నా ఆకును పరీక్షించండి",
    scanning: "మీ టమాటా ఆకును పరీక్షిస్తున్నాము...",
    result: "వ్యాధి గుర్తింపు ఫలితం",
    retry: "మరో ఆకును పరీక్షించండి",
    voice: "మొక్కల సహాయకుడిని అడగండి",
    listening: "వింటున్నాము... ఇప్పుడు మాట్లాడండి",
    voiceUnsupported: "ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ అందుబాటులో లేదు.",
    cameraError: "కెమెరా లేదా ఫోటో ఎంపికను తెరవలేకపోయాము.",
    apiError: "పరీక్ష సేవకు కనెక్ట్ కాలేకపోయాము. బ్యాకెండ్ నడుస్తోందో చూడండి.",
    uncertain: "ఫలితం స్పష్టంగా లేదు. దయచేసి మరింత స్పష్టమైన ఫోటోను ప్రయత్నించండి.",
    rejected: "ఈ చిత్రం టమాటా ఆకుగా గుర్తించబడలేదు.",
    success: "పరీక్ష పూర్తయింది",
    confidence: "మోడల్ విశ్వాస స్థాయి",
    causeTitle: "వ్యాధి రావడానికి కారణం",
    symptomsTitle: "కనిపించే లక్షణాలు",
    precautionsTitle: "ముందస్తు జాగ్రత్తలు",
    recommendationTitle: "సిఫార్సు చేయబడిన చర్య",
    footer: "కలిసి ఆరోగ్యకరమైన టమాటా మొక్కలను పెంచుదాం.",
    healthyBadge: "మొక్కల ఆరోగ్యం ముఖ్యం",
    uploadTitle: "మీ మొక్కను పరీక్షిద్దాం",
    uploadSubtitle: "వ్యాధులను గుర్తించడానికి ఆకు ఫోటోను అప్‌లోడ్ చేయండి.",
    stepOne: "అప్‌లోడ్",
    stepTwo: "పరీక్ష",
    stepThree: "రక్షణ",
    imageNote: "JPG, PNG లేదా WEBP · గరిష్టంగా 10 MB",
    selected: "ఫోటో పరీక్షకు సిద్ధంగా ఉంది",
    confidenceLabel: "AI విశ్వాస స్థాయి",
    noResult: "పరీక్ష వివరాలు అందుబాటులో లేవు.",
    scanAgain: "మరో చిత్రాన్ని పరీక్షించండి",
    photoGuide: "మెరుగైన ఫలితాల కోసం ఒక ఆకును సాధారణ నేపథ్యంపై ఫోటో తీయండి.",
    detected: "గుర్తించిన పరిస్థితి",
  },

  ta: {
    welcome: "வரவேற்கிறோம், செடி பாதுகாவலரே!",
    subtitle: "ஆரோக்கியமான தக்காளி செடிகளை ஒன்றாக வளர்ப்போம்.",
    status: "உங்கள் புத்திசாலித்தனமான செடி பராமரிப்பு உதவியாளர்",
    healthy: "உங்கள் தக்காளி செடிகளுக்கு சிறந்த பராமரிப்பு அளியுங்கள்.",
    description: "தக்காளி இலையின் தெளிவான புகைப்படத்தைப் பதிவேற்றி AI மூலம் நோய்களைக் கண்டறியுங்கள்.",
    scan: "இலைப் புகைப்படத்தைத் தேர்ந்தெடுக்கவும்",
    camera: "புகைப்படம் எடுக்கவும்",
    upload: "சாதனத்திலிருந்து பதிவேற்றவும்",
    tipTitle: "துல்லியமான கண்டறிதலுக்கான குறிப்புகள்",
    tip: "இயற்கையான வெளிச்சத்தில் ஒரு தக்காளி இலையைத் தெளிவாகப் புகைப்படம் எடுக்கவும்.",
    language: "மொழியை மாற்றவும்",
    preview: "நீங்கள் தேர்ந்தெடுத்த இலை",
    analyze: "என் இலையைப் பரிசோதிக்கவும்",
    scanning: "உங்கள் தக்காளி இலை பரிசோதிக்கப்படுகிறது...",
    result: "நோய் கண்டறிதல் முடிவு",
    retry: "மற்றொரு இலையைப் பரிசோதிக்கவும்",
    voice: "செடி உதவியாளரிடம் கேளுங்கள்",
    listening: "கேட்கிறது... இப்போது பேசவும்",
    voiceUnsupported: "இந்த உலாவியில் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை.",
    cameraError: "கேமரா அல்லது படத் தேர்வைத் திறக்க முடியவில்லை.",
    apiError: "கணிப்பு சேவையுடன் இணைக்க முடியவில்லை. பின்புற சேவை இயங்குகிறதா எனச் சரிபார்க்கவும்.",
    uncertain: "முடிவு தெளிவாக இல்லை. தெளிவான புகைப்படத்தை முயற்சிக்கவும்.",
    rejected: "இந்தப் படம் தக்காளி இலையாக அடையாளம் காணப்படவில்லை.",
    success: "பரிசோதனை முடிந்தது",
    confidence: "மாதிரியின் நம்பிக்கை அளவு",
    causeTitle: "நோய் ஏற்படுவதற்கான காரணம்",
    symptomsTitle: "காணக்கூடிய அறிகுறிகள்",
    precautionsTitle: "முன்னெச்சரிக்கை நடவடிக்கைகள்",
    recommendationTitle: "பரிந்துரைக்கப்படும் நடவடிக்கை",
    footer: "ஒன்றாக ஆரோக்கியமான தக்காளி செடிகளை வளர்ப்போம்.",
    healthyBadge: "செடி ஆரோக்கியம் முக்கியம்",
    uploadTitle: "உங்கள் செடியைப் பரிசோதிப்போம்",
    uploadSubtitle: "நோய்களைக் கண்டறிய இலையின் புகைப்படத்தைப் பதிவேற்றவும்.",
    stepOne: "பதிவேற்றம்",
    stepTwo: "பரிசோதனை",
    stepThree: "பாதுகாப்பு",
    imageNote: "JPG, PNG அல்லது WEBP · அதிகபட்சம் 10 MB",
    selected: "புகைப்படம் பரிசோதனைக்குத் தயாராக உள்ளது",
    confidenceLabel: "AI நம்பிக்கை அளவு",
    noResult: "பரிசோதனை விவரங்கள் இல்லை.",
    scanAgain: "மற்றொரு படத்தைப் பரிசோதிக்கவும்",
    photoGuide: "சிறந்த முடிவுகளுக்கு ஒரு இலையை எளிய பின்னணியில் புகைப்படம் எடுக்கவும்.",
    detected: "கண்டறியப்பட்ட நிலை",
  },
};

type Language = keyof typeof translations;

type Prediction = {
  status: "success" | "uncertain" | "rejected" | "error";
  disease?: string;
  confidence?: number;
  message?: string;
};

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("en");
  const [ready, setReady] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");

  const uploadRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const text = translations[language];

  const selectedDisease = prediction?.disease
    ? diseaseInfo[prediction.disease]?.[language] ??
      diseaseInfo[prediction.disease]?.en
    : undefined;

  useEffect(() => {
    const saved = localStorage.getItem("tomato-language");

    if (saved && saved in translations) {
      setLanguage(saved as Language);
    }

    setReady(true);
  }, []);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function changeLanguage(value: string) {
    if (value in translations) {
      const next = value as Language;
      setLanguage(next);
      localStorage.setItem("tomato-language", next);
    }
  }

  function selectFile(nextFile?: File) {
    if (!nextFile) return;

    setError("");
    setPrediction(null);

    if (!nextFile.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    if (nextFile.size > 10 * 1024 * 1024) {
      setError("Please choose an image smaller than 10 MB.");
      return;
    }

    setFile(nextFile);
    setPreview(URL.createObjectURL(nextFile));
  }

  async function scanLeaf() {
    if (!file || scanning) return;

    setScanning(true);
    setPrediction(null);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || text.apiError);
      }

      setPrediction(data as Prediction);
    } catch (err) {
      setError(err instanceof Error ? err.message : text.apiError);
    } finally {
      setScanning(false);
    }
  }

  function resetScan() {
    setFile(null);
    setPreview("");
    setPrediction(null);
    setError("");

    if (uploadRef.current) uploadRef.current.value = "";
    if (cameraRef.current) cameraRef.current.value = "";
  }

  if (!ready) {
    return <main className="min-h-screen bg-[#f5f7ef]" />;
  }

  const confidence = Math.round((prediction?.confidence ?? 0) * 100);

  return (
    <main className="min-h-screen bg-[#f5f7ef] text-[#203b2b]">

      {/* Navigation */}
      <header className="sticky top-0 z-30 border-b border-[#e6ebdf] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1450px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">

          <a href="/home" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f1df] text-2xl">
              🍅
            </div>

            <div>
              <h1 className="text-base font-black tracking-tight sm:text-lg">
                TOMATO PLANT SAFE
              </h1>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#80917d]">
                Intelligent Crop Care
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-2 rounded-full bg-[#f0f6eb] px-4 py-2 text-xs font-bold text-[#477b3e] md:flex">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            AI Plant Protection
          </div>

          <label className="flex items-center gap-2 rounded-xl border border-[#e0e8d9] bg-white px-3 py-2 text-sm font-semibold shadow-sm">
            <span>🌐</span>
            <select
              value={language}
              onChange={(event) => changeLanguage(event.target.value)}
              aria-label={text.language}
              className="max-w-24 bg-transparent outline-none sm:max-w-none"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="te">తెలుగు</option>
              <option value="ta">தமிழ்</option>
            </select>
          </label>

        </div>
      </header>

      <div className="mx-auto max-w-[1450px] px-5 pb-12 pt-7 sm:px-8 lg:px-12">

        {/* Hero */}
        <section className="relative isolate overflow-hidden rounded-[2rem] bg-[#173b25] shadow-xl shadow-green-950/10">

          <img
            src={HERO_IMAGE}
            alt="Tomato plants growing in a green agricultural farm"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />

          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#102f1c]/95 via-[#153b23]/75 to-[#153b23]/20" />

          <div className="grid min-h-[330px] items-center gap-8 p-7 sm:min-h-[380px] sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:p-14">

            <div className="max-w-2xl">

              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
                🌿 {text.status}
              </div>

              <h2 className="mt-6 whitespace-pre-line text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                {text.welcome}
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/85 sm:text-lg">
                {text.subtitle}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
                  🔬 CNN Disease Detection
                </span>
                <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
                  🌍 4 Languages
                </span>
                <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
                  🎙️ Voice Assistant
                </span>
              </div>
            </div>

            <div className="hidden justify-end lg:flex">
              <div className="max-w-[280px] rounded-3xl border border-white/20 bg-white/10 p-6 text-white shadow-xl backdrop-blur-xl">
                <div className="text-4xl">🌱</div>
                <p className="mt-5 text-xl font-bold">
                  {text.healthyBadge}
                </p>
                <p className="mt-3 text-sm leading-6 text-white/75">
                  Detect possible leaf diseases and learn how to care for your tomato plants.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Process steps */}
        <section className="mt-7 grid grid-cols-3 gap-3 sm:gap-5">

          {[
            { number: "01", icon: "📸", title: text.stepOne },
            { number: "02", icon: "🔬", title: text.stepTwo },
            { number: "03", icon: "🌱", title: text.stepThree },
          ].map((step) => (
            <div
              key={step.number}
              className="flex items-center gap-3 rounded-2xl border border-[#e5ebdf] bg-white p-3 shadow-sm sm:p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf5e7] text-xl sm:h-12 sm:w-12">
                {step.icon}
              </div>

              <div>
                <p className="text-[10px] font-bold tracking-wider text-[#91a08c]">
                  STEP {step.number}
                </p>
                <p className="mt-1 text-xs font-extrabold text-[#34553a] sm:text-sm">
                  {step.title}
                </p>
              </div>
            </div>
          ))}

        </section>

        {/* Main dashboard */}
        <div className="mt-7 grid items-start gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.8fr)]">

          {/* Upload and results */}
          <section className="overflow-hidden rounded-[2rem] border border-[#e4ebdd] bg-white shadow-sm">

            <div className="border-b border-[#edf0e9] p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#edf5e7] text-2xl">
                  🌿
                </div>

                <div>
                  <h3 className="text-xl font-black sm:text-2xl">
                    {text.uploadTitle}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#81907c]">
                    {text.uploadSubtitle}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-8">

              <input
                ref={uploadRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(event) => {
                  selectFile(event.target.files?.[0]);
                  event.target.value = "";
                }}
              />

              <input
                ref={cameraRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(event) => {
                  selectFile(event.target.files?.[0]);
                  event.target.value = "";
                }}
              />

              {/* Image upload area */}
              {!preview ? (
                <div className="group relative overflow-hidden rounded-3xl border-2 border-dashed border-[#cbdcc2] bg-[#f8faf5] p-6 text-center transition hover:border-[#6e9a5e] sm:p-10">

                  <img
                    src={LEAF_IMAGE}
                    alt="Green tomato leaf"
                    className="mx-auto h-32 w-32 rounded-2xl object-cover shadow-md transition duration-500 group-hover:scale-105 sm:h-40 sm:w-40"
                  />

                  <h4 className="mt-6 text-lg font-extrabold">
                    {text.scan}
                  </h4>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#879382]">
                    {text.photoGuide}
                  </p>

                  <button
                    type="button"
                    onClick={() => uploadRef.current?.click()}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#477b3e] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-900/10 transition hover:-translate-y-0.5 hover:bg-[#376831]"
                  >
                    <span>📁</span>
                    {text.scan}
                  </button>

                  <p className="mt-4 text-xs text-[#9aa596]">
                    {text.imageNote}
                  </p>

                </div>
              ) : (
                <div className="overflow-hidden rounded-3xl border border-[#e2eadd] bg-[#f8faf5]">

                  <div className="flex items-center justify-between gap-3 border-b border-[#e5ebdf] p-4">
                    <div>
                      <p className="text-sm font-extrabold">
                        {text.preview}
                      </p>
                      <p className="mt-1 text-xs text-[#82917e]">
                        {text.selected}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={resetScan}
                      className="rounded-lg border border-[#dce6d6] bg-white px-3 py-2 text-xs font-semibold text-[#56724f] hover:bg-[#edf5e7]"
                    >
                      {text.retry}
                    </button>
                  </div>

                  <div className="p-4">
                    <img
                      src={preview}
                      alt="Selected tomato leaf"
                      className="mx-auto max-h-[420px] w-full rounded-2xl object-contain"
                    />

                    <button
                      type="button"
                      onClick={scanLeaf}
                      disabled={scanning}
                      className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#315b27] px-5 py-4 font-bold text-white shadow-md transition hover:bg-[#254b21] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {scanning ? (
                        <>
                          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                          {text.scanning}
                        </>
                      ) : (
                        <>
                          🔬 {text.analyze}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Camera and upload options */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => cameraRef.current?.click()}
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#dfe8d7] bg-white px-3 py-4 text-sm font-bold transition hover:border-[#88aa78] hover:bg-[#f8faf5]"
                >
                  <span>📷</span>
                  <span>{text.camera}</span>
                </button>

                <button
                  type="button"
                  onClick={() => uploadRef.current?.click()}
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#dfe8d7] bg-white px-3 py-4 text-sm font-bold transition hover:border-[#88aa78] hover:bg-[#f8faf5]"
                >
                  <span>🖼️</span>
                  <span>{text.upload}</span>
                </button>
              </div>

              {scanning && (
                <div className="mt-5 rounded-xl bg-[#f1f6ec] p-4">
                  <div className="mb-3 flex items-center justify-between text-xs font-semibold text-[#477b3e]">
                    <span>{text.scanning}</span>
                    <span>...</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#dce9d4]">
                    <div className="h-full w-2/3 animate-pulse rounded-full bg-[#477b3e]" />
                  </div>
                </div>
              )}

              {error && (
                <p
                  role="alert"
                  className="mt-5 rounded-xl border border-red-100 bg-red-50 p-4 text-sm leading-6 text-red-700"
                >
                  ⚠️ {error}
                </p>
              )}

              {/* Prediction result */}
              {prediction && (
                <div className="mt-7 overflow-hidden rounded-3xl border border-[#e1e9da]">

                  <div className="flex items-center gap-3 bg-[#edf5e7] p-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl">
                      {prediction.status === "success" ? "🔬" : "⚠️"}
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#6b8b5e]">
                        {text.result}
                      </p>
                      <h3 className="mt-1 text-lg font-black text-[#29482e]">
                        {prediction.status === "success"
                          ? text.success
                          : prediction.status === "uncertain"
                            ? text.uncertain
                            : prediction.status === "rejected"
                              ? text.rejected
                              : text.noResult}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-5 p-5 sm:p-7">

                    {prediction.status === "success" && (
                      <>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-[#82917e]">
                            {text.detected}
                          </p>

                          <h4 className="mt-2 text-2xl font-black text-[#315b27]">
                            {selectedDisease?.title ??
                              prediction.disease?.replaceAll("_", " ")}
                          </h4>
                        </div>

                        {/* Confidence indicator */}
                        <div className="rounded-2xl bg-[#f6f9f2] p-5">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-bold">
                              {text.confidenceLabel}
                            </p>
                            <p className="text-xl font-black text-[#477b3e]">
                              {confidence}%
                            </p>
                          </div>

                          <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#e0ead9]">
                            <div
                              className="h-full rounded-full bg-[#5b914c] transition-all duration-700"
                              style={{
                                width: `${Math.max(0, Math.min(100, confidence))}%`,
                              }}
                            />
                          </div>

                          <p className="mt-2 text-xs text-[#82917e]">
                            {text.confidence}
                          </p>
                        </div>

                        {selectedDisease && (
                          <div className="space-y-4">

                            <section className="rounded-2xl border border-[#e8eee2] bg-white p-5">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">🦠</span>
                                <h4 className="font-extrabold">
                                  {text.causeTitle}
                                </h4>
                              </div>
                              <p className="mt-3 text-sm leading-7 text-[#687867]">
                                {selectedDisease.cause}
                              </p>
                            </section>

                            <section className="rounded-2xl border border-[#e8eee2] bg-white p-5">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">🔍</span>
                                <h4 className="font-extrabold">
                                  {text.symptomsTitle}
                                </h4>
                              </div>

                              <ul className="mt-4 space-y-3">
                                {selectedDisease.symptoms.map((symptom, index) => (
                                  <li key={index} className="flex gap-3 text-sm leading-6 text-[#687867]">
                                    <span className="mt-1 text-[#639653]">●</span>
                                    {symptom}
                                  </li>
                                ))}
                              </ul>
                            </section>

                            <section className="rounded-2xl border border-[#e8eee2] bg-white p-5">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">🛡️</span>
                                <h4 className="font-extrabold">
                                  {text.precautionsTitle}
                                </h4>
                              </div>

                              <ul className="mt-4 space-y-3">
                                {selectedDisease.precautions.map((precaution, index) => (
                                  <li key={index} className="flex gap-3 text-sm leading-6 text-[#687867]">
                                    <span className="mt-1 text-[#639653]">✓</span>
                                    {precaution}
                                  </li>
                                ))}
                              </ul>
                            </section>

                            <section className="rounded-2xl border border-[#d6e6ca] bg-[#edf5e7] p-5">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">🌱</span>
                                <h4 className="font-extrabold text-[#315b27]">
                                  {text.recommendationTitle}
                                </h4>
                              </div>

                              <p className="mt-3 text-sm leading-7 text-[#536b4e]">
                                {selectedDisease.recommendation}
                              </p>
                            </section>

                          </div>
                        )}
                      </>
                    )}

                    {prediction.status === "uncertain" && (
                      <p className="text-sm leading-7 text-[#687867]">
                        {text.uncertain}
                      </p>
                    )}

                    {prediction.status === "rejected" && (
                      <p className="text-sm leading-7 text-[#687867]">
                        {text.rejected}
                      </p>
                    )}

                    {prediction.message && (
                      <p className="text-sm leading-7 text-[#687867]">
                        {prediction.message}
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={resetScan}
                      className="w-full rounded-xl border border-[#b8cfaa] bg-white px-5 py-3 font-bold text-[#477b3e] transition hover:bg-[#f3f8ee]"
                    >
                      {text.scanAgain}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </section>

          {/* Right sidebar */}
          <aside className="flex flex-col gap-5">

            {/* Photo guide */}
            <section className="overflow-hidden rounded-[2rem] border border-[#e5ebdf] bg-white shadow-sm">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={LEAF_IMAGE}
                  alt="Tomato plant leaf close-up"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#173b25]/70 to-transparent" />
                <p className="absolute bottom-4 left-5 text-lg font-extrabold text-white">
                  {text.tipTitle}
                </p>
              </div>

              <div className="p-5">
                <p className="text-sm leading-7 text-[#748271]">
                  {text.tip}
                </p>
              </div>
            </section>

            {/* Photo quality reminder */}
            <section className="rounded-[2rem] border border-[#e8dfc9] bg-[#fffaf0] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f5edda] text-2xl">
                  💡
                </div>

                <div>
                  <h3 className="font-extrabold text-[#554a30]">
                    {text.healthyBadge}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-[#82765c]">
                    {text.photoGuide}
                  </p>
                </div>
              </div>
            </section>

            {/* Voice assistant */}
            <section className="overflow-hidden rounded-[2rem] border border-[#dfe9d8] bg-white shadow-sm">

              <div className="bg-[#315b27] p-5 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl">
                    🎙️
                  </div>

                  <div>
                    <h3 className="font-extrabold">
                      {text.voice}
                    </h3>
                    <p className="mt-1 text-xs text-white/75">
                      English · हिंदी · తెలుగు · தமிழ்
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <VoiceAssistant
                  language={language}
                  detectedDisease={
                    prediction?.status === "success"
                      ? prediction.disease
                      : undefined
                  }
                />
              </div>
            </section>

          </aside>
        </div>

        {/* Footer */}
        <footer className="mt-10 border-t border-[#e3eadd] py-7 text-center">
          <div className="text-2xl">🍃</div>
          <p className="mt-2 text-sm font-semibold text-[#71816e]">
            {text.footer}
          </p>
          <p className="mt-2 text-xs text-[#9ba596]">
            © {new Date().getFullYear()} Tomato Plant Safe · Smart Agriculture
          </p>
        </footer>

      </div>
    </main>
  );
}
