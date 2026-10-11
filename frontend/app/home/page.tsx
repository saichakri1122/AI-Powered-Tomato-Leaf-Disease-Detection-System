"use client";

import { useEffect, useRef, useState } from "react";
import { diseaseInfo } from "@/data/Diseaseinformations";

const API_URL = "http://127.0.0.1:8000/predict";

const translations = {
  en: {
    welcome: "Welcome, Plant Protector!",
    subtitle: "Let's keep your tomato plants healthy.",
    status: "Your plant care companion",
    healthy: "Healthy plants start with early detection.",
    description: "Choose a tomato leaf photo to check for possible diseases.",
    scan: "Check My Leaf",
    camera: "Take a Photo",
    upload: "Upload from Device",
    tipTitle: "A little tip for better results",
    tip: "Use a clear photo of a single leaf with good lighting.",
    language: "Change language",
    preview: "Selected leaf",
    analyze: "Scan Leaf Now",
    scanning: "Scanning your leaf...",
    result: "Scan Result",
    retry: "Choose Another Photo",
    voice: "Tap the microphone to speak",
    listening: "Listening... Speak now",
    voiceUnsupported: "Voice input is not supported by this browser.",
    cameraError: "Could not open the camera or image picker.",
    apiError: "Could not connect to the prediction service. Check that your backend is running.",
    uncertain: "The result is uncertain. Please try a clearer photo.",
    rejected: "This image was not identified as a tomato leaf.",
    success: "Prediction completed",
    confidence: "Model confidence",
    causeTitle: "Why it happens",
    symptomsTitle: "Symptoms",
    precautionsTitle: "Precautions",
    recommendationTitle: "Recommended action",
    footer: "Growing healthier tomato plants, together.",
  },

  hi: {
    welcome: "स्वागत है, पौधों के रक्षक!",
    subtitle: "आइए अपने टमाटर के पौधों को स्वस्थ रखें।",
    status: "पौधों की देखभाल में आपका साथी",
    healthy: "समय पर पहचान से पौधे स्वस्थ रहते हैं।",
    description: "संभावित बीमारी की जाँच के लिए टमाटर की पत्ती की तस्वीर चुनें।",
    scan: "मेरी पत्ती जाँचें",
    camera: "तस्वीर लें",
    upload: "डिवाइस से तस्वीर चुनें",
    tipTitle: "बेहतर परिणाम के लिए सुझाव",
    tip: "अच्छी रोशनी में एक पत्ती की साफ तस्वीर लें।",
    language: "भाषा बदलें",
    preview: "चुनी गई पत्ती",
    analyze: "अभी जाँचें",
    scanning: "पत्ती की जाँच हो रही है...",
    result: "जाँच का परिणाम",
    retry: "दूसरी तस्वीर चुनें",
    voice: "बोलने के लिए माइक्रोफ़ोन दबाएँ",
    listening: "सुन रहा है... अब बोलें",
    voiceUnsupported: "इस ब्राउज़र में आवाज़ से इनपुट उपलब्ध नहीं है।",
    cameraError: "कैमरा या तस्वीर चयन नहीं खुल सका।",
    apiError: "जाँच सेवा से कनेक्ट नहीं हो सका। बैकएंड चालू है या नहीं, जाँचें।",
    uncertain: "परिणाम स्पष्ट नहीं है। कृपया साफ तस्वीर आज़माएँ।",
    rejected: "इस तस्वीर की पहचान टमाटर की पत्ती के रूप में नहीं हुई।",
    success: "जाँच पूरी हुई",
    confidence: "मॉडल का विश्वास स्तर",
    causeTitle: "यह रोग क्यों होता है",
    symptomsTitle: "लक्षण",
    precautionsTitle: "सावधानियाँ",
    recommendationTitle: "क्या करें",
    footer: "आइए, टमाटर की फसल को स्वस्थ बनाएँ।",
  },

  te: {
    welcome: "స్వాగతం, మొక్కల సంరక్షకులారా!",
    subtitle: "మీ టమాటా మొక్కలను ఆరోగ్యంగా ఉంచుకుందాం.",
    status: "మీ మొక్కల సంరక్షణ సహాయకుడు",
    healthy: "ముందస్తు గుర్తింపు మొక్కలను ఆరోగ్యంగా ఉంచుతుంది.",
    description: "సాధ్యమైన వ్యాధులను పరీక్షించడానికి టమాటా ఆకు ఫోటోను ఎంచుకోండి.",
    scan: "నా ఆకును పరీక్షించండి",
    camera: "ఫోటో తీయండి",
    upload: "పరికరం నుండి ఎంచుకోండి",
    tipTitle: "మెరుగైన ఫలితాల కోసం సూచన",
    tip: "మంచి వెలుతురులో ఒక ఆకు స్పష్టంగా ఫోటో తీయండి.",
    language: "భాష మార్చండి",
    preview: "ఎంచుకున్న ఆకు",
    analyze: "ఇప్పుడే పరీక్షించండి",
    scanning: "ఆకును పరీక్షిస్తున్నాము...",
    result: "పరీక్ష ఫలితం",
    retry: "మరో ఫోటో ఎంచుకోండి",
    voice: "మాట్లాడటానికి మైక్రోఫోన్ నొక్కండి",
    listening: "వింటున్నాము... ఇప్పుడు మాట్లాడండి",
    voiceUnsupported: "ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ అందుబాటులో లేదు.",
    cameraError: "కెమెరా లేదా ఫోటో ఎంపికను తెరవలేకపోయాము.",
    apiError: "పరీక్ష సేవకు కనెక్ట్ కాలేకపోయాము. బ్యాకెండ్ నడుస్తోందో చూడండి.",
    uncertain: "ఫలితం స్పష్టంగా లేదు. దయచేసి మరింత స్పష్టమైన ఫోటోను ప్రయత్నించండి.",
    rejected: "ఈ చిత్రం టమాటా ఆకుగా గుర్తించబడలేదు.",
    success: "పరీక్ష పూర్తయింది",
    confidence: "మోడల్ విశ్వాస స్థాయి",
    causeTitle: "వ్యాధి రావడానికి కారణం",
    symptomsTitle: "లక్షణాలు",
    precautionsTitle: "జాగ్రత్తలు",
    recommendationTitle: "చేయవలసిన పని",
    footer: "కలిసి ఆరోగ్యకరమైన టమాటా మొక్కలను పెంచుదాం.",
  },

  ta: {
    welcome: "வரவேற்கிறோம், செடி பாதுகாவலரே!",
    subtitle: "உங்கள் தக்காளி செடிகளை ஆரோக்கியமாக வைத்திருப்போம்.",
    status: "உங்கள் செடி பராமரிப்புத் துணை",
    healthy: "ஆரம்பத்திலேயே கண்டறிவது செடிகளை ஆரோக்கியமாக வைத்திருக்கும்.",
    description: "சாத்தியமான நோய்களைச் சரிபார்க்க தக்காளி இலையின் புகைப்படத்தைத் தேர்ந்தெடுக்கவும்.",
    scan: "என் இலையைச் சரிபார்க்கவும்",
    camera: "புகைப்படம் எடுக்கவும்",
    upload: "சாதனத்திலிருந்து தேர்ந்தெடுக்கவும்",
    tipTitle: "சிறந்த முடிவுக்கான குறிப்பு",
    tip: "நல்ல வெளிச்சத்தில் ஒரு இலையின் தெளிவான புகைப்படத்தை எடுக்கவும்.",
    language: "மொழியை மாற்றவும்",
    preview: "தேர்ந்தெடுத்த இலை",
    analyze: "இப்போது ஸ்கேன் செய்யவும்",
    scanning: "இலை ஸ்கேன் செய்யப்படுகிறது...",
    result: "ஸ்கேன் முடிவு",
    retry: "வேறு புகைப்படத்தைத் தேர்ந்தெடுக்கவும்",
    voice: "பேச மைக்ரோஃபோனைத் தட்டவும்",
    listening: "கேட்கிறது... இப்போது பேசவும்",
    voiceUnsupported: "இந்த உலாவியில் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை.",
    cameraError: "கேமரா அல்லது படத் தேர்வைத் திறக்க முடியவில்லை.",
    apiError: "கணிப்பு சேவையுடன் இணைக்க முடியவில்லை. பின்புற சேவை இயங்குகிறதா எனச் சரிபார்க்கவும்.",
    uncertain: "முடிவு தெளிவாக இல்லை. தெளிவான புகைப்படத்தை முயற்சிக்கவும்.",
    rejected: "இந்தப் படம் தக்காளி இலையாக அடையாளம் காணப்படவில்லை.",
    success: "கணிப்பு முடிந்தது",
    confidence: "மாதிரியின் நம்பிக்கை அளவு",
    causeTitle: "நோய் ஏற்படுவதற்கான காரணம்",
    symptomsTitle: "அறிகுறிகள்",
    precautionsTitle: "முன்னெச்சரிக்கைகள்",
    recommendationTitle: "பரிந்துரைக்கப்படும் நடவடிக்கை",
    footer: "ஒன்றாக ஆரோக்கியமான தக்காளி செடிகளை வளர்ப்போம்.",
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
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");

  const uploadRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<{ stop: () => void } | null>(null);

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

    return () => {
      recognitionRef.current?.stop();
    };
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
    if (!file) {
      uploadRef.current?.click();
      return;
    }

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

  function toggleVoice() {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    type SpeechRecognitionLike = {
      lang: string;
      continuous: boolean;
      interimResults: boolean;
      onresult: ((event: {
        results: ArrayLike<ArrayLike<{ transcript: string }>>;
      }) => void) | null;
      onend: (() => void) | null;
      onerror: (() => void) | null;
      start: () => void;
      stop: () => void;
    };

    const speechWindow = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionLike;
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    };

    const SpeechRecognition =
      speechWindow.SpeechRecognition ||
      speechWindow.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError(text.voiceUnsupported);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang =
      language === "hi"
        ? "hi-IN"
        : language === "te"
          ? "te-IN"
          : language === "ta"
            ? "ta-IN"
            : "en-IN";

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript;

      if (transcript && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(transcript);
        utterance.lang = recognition.lang;
        window.speechSynthesis.speak(utterance);
      }
    };

    recognition.onend = () => setListening(false);

    recognition.onerror = () => {
      setListening(false);
      setError(text.voiceUnsupported);
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
      setListening(true);
      setError("");
    } catch {
      setListening(false);
      setError(text.voiceUnsupported);
    }
  }

  if (!ready) {
    return <main className="min-h-screen bg-[#f6f8ef]" />;
  }
    return (
    <main className="min-h-screen bg-[#f6f8ef] px-4 py-5 text-[#233c2b] sm:px-8 sm:py-8">
      <div className="mx-auto max-w-5xl">
        <header className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e3efd9] text-3xl">
              🍅
            </div>

            <div>
              <h1 className="text-lg font-extrabold sm:text-xl">
                Tomato Plant Safe
              </h1>
              <p className="text-xs text-[#71816e]">{text.status}</p>
            </div>
          </div>

          <label className="flex items-center gap-2 rounded-xl border border-[#dfe8d7] bg-white px-3 py-2 text-sm font-semibold">
            <span aria-hidden="true">🌐</span>

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
        </header>

        <section
          className="relative mt-8 overflow-hidden rounded-[2rem] bg-[#315b27] bg-cover bg-center text-white shadow-lg sm:mt-10"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(30,65,24,0.92), rgba(30,65,24,0.55)), url('/tomato-hero.jpg')",
          }}
        >
          <div className="flex min-h-[260px] items-center p-6 sm:min-h-[300px] sm:p-10">
            <div className="max-w-xl">
              <span className="inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                🌿 {text.status}
              </span>

              <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-5xl">
                {text.welcome}
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/90 sm:text-lg">
                {text.subtitle}
              </p>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <section className="rounded-[2rem] border border-[#e4ebdd] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#edf5e7] text-2xl">
                🌱
              </div>

              <div>
                <h3 className="text-xl font-extrabold">{text.healthy}</h3>
                <p className="mt-2 text-sm leading-6 text-[#71816e]">
                  {text.description}
                </p>
              </div>
            </div>

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

            <button
              type="button"
              onClick={() => uploadRef.current?.click()}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#477b3e] px-5 py-4 font-bold text-white transition hover:bg-[#376831] active:scale-[0.99]"
            >
              🔎 {text.scan}
            </button>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => cameraRef.current?.click()}
                className="flex items-center justify-center gap-2 rounded-2xl border-2 border-[#dfe8d7] bg-[#fbfcf8] px-4 py-4 text-sm font-semibold transition hover:border-[#8bb27b]"
              >
                📷 {text.camera}
              </button>

              <button
                type="button"
                onClick={() => uploadRef.current?.click()}
                className="flex items-center justify-center gap-2 rounded-2xl border-2 border-[#dfe8d7] bg-[#fbfcf8] px-4 py-4 text-sm font-semibold transition hover:border-[#8bb27b]"
              >
                🖼️ {text.upload}
              </button>
            </div>

            {preview && (
              <div className="mt-6 rounded-2xl border border-[#e4ebdd] p-4">
                <h3 className="mb-3 font-bold">{text.preview}</h3>

                <img
                  src={preview}
                  alt="Selected tomato leaf"
                  className="max-h-80 w-full rounded-xl object-contain"
                />

                <button
                  type="button"
                  onClick={scanLeaf}
                  disabled={scanning}
                  className="mt-4 w-full rounded-xl bg-[#315b27] px-4 py-3 font-bold text-white disabled:opacity-60"
                >
                  {scanning ? text.scanning : text.analyze}
                </button>
              </div>
            )}

            {scanning && (
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e7efdf]">
                <div className="h-full w-2/3 animate-pulse rounded-full bg-[#477b3e]" />
              </div>
            )}

            {error && (
              <p
                role="alert"
                className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            {prediction && (
              <div className="mt-5 rounded-2xl border border-[#dfe8d7] bg-[#f7faf3] p-5">
                <h3 className="text-lg font-extrabold">{text.result}</h3>

                {prediction.status === "success" && (
                  <>
                    <p className="mt-3 text-xl font-bold">
                      {selectedDisease?.title ??
                        prediction.disease?.replaceAll("_", " ")}
                    </p>

                    <p className="mt-2 text-sm text-[#71816e]">
                      {text.confidence}:{" "}
                      {Math.round((prediction.confidence ?? 0) * 100)}%
                    </p>

                    {selectedDisease && (
                      <div className="mt-5 space-y-4">
                        <section className="rounded-xl bg-white p-4">
                          <h4 className="font-bold">{text.causeTitle}</h4>
                          <p className="mt-2 text-sm leading-6">
                            {selectedDisease.cause}
                          </p>
                        </section>

                        <section className="rounded-xl bg-white p-4">
                          <h4 className="font-bold">{text.symptomsTitle}</h4>

                          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6">
                            {selectedDisease.symptoms.map((symptom, index) => (
                              <li key={index}>{symptom}</li>
                            ))}
                          </ul>
                        </section>

                        <section className="rounded-xl bg-white p-4">
                          <h4 className="font-bold">
                            {text.precautionsTitle}
                          </h4>

                          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6">
                            {selectedDisease.precautions.map(
                              (precaution, index) => (
                                <li key={index}>{precaution}</li>
                              )
                            )}
                          </ul>
                        </section>

                        <section className="rounded-xl border border-[#d6e6ca] bg-[#edf5e7] p-4">
                          <h4 className="font-bold">
                            {text.recommendationTitle}
                          </h4>

                          <p className="mt-2 text-sm leading-6">
                            {selectedDisease.recommendation}
                          </p>
                        </section>
                      </div>
                    )}
                  </>
                )}

                {prediction.status === "uncertain" && (
                  <p className="mt-3 text-sm leading-6">{text.uncertain}</p>
                )}

                {prediction.status === "rejected" && (
                  <p className="mt-3 text-sm leading-6">{text.rejected}</p>
                )}

                {prediction.message && (
                  <p className="mt-2 text-sm leading-6">
                    {prediction.message}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => uploadRef.current?.click()}
                  className="mt-4 rounded-xl border border-[#b8cfaa] px-4 py-3 text-sm font-semibold"
                >
                  {text.retry}
                </button>
              </div>
            )}
          </section>

          <aside className="flex flex-col gap-5">
            <section className="rounded-[2rem] border border-[#e8dfc9] bg-[#fffaf0] p-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">💡</span>

                <div>
                  <h3 className="font-bold text-[#554a30]">{text.tipTitle}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#82765c]">
                    {text.tip}
                  </p>
                </div>
              </div>
            </section>

            <section className="flex flex-1 flex-col items-center justify-center rounded-[2rem] border border-[#e4ebdd] bg-white p-6 text-center">
              <h3 className="font-bold">Plant Voice Assistant</h3>

              <p className="mt-2 text-sm text-[#71816e]">
                {listening ? text.listening : text.voice}
              </p>

              <button
                type="button"
                onClick={toggleVoice}
                aria-label={listening ? "Stop microphone" : "Activate microphone"}
                aria-pressed={listening}
                className={`mt-5 flex h-16 w-16 items-center justify-center rounded-full text-2xl text-white shadow-lg transition ${
                  listening
                    ? "animate-pulse bg-red-600"
                    : "bg-[#477b3e] hover:bg-[#376831]"
                }`}
              >
                {listening ? "■" : "🎙️"}
              </button>
            </section>
          </aside>
        </div>

        <footer className="py-8 text-center text-xs text-[#899484]">
          🍃 {text.footer}
        </footer>
      </div>
    </main>
  );
}