
"use client";

import { useEffect, useRef, useState } from "react";
import type { Language } from "@/data/Diseaseinformations";
import { diseaseInfo } from "@/data/Diseaseinformations";
import {
  fallbackAnswer,
  matchPlantQuestion,
} from "@/data/PlantKnowledge";

type VoiceAssistantProps = {
  language: Language;
  detectedDisease?: string;
};

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

const languageLocales: Record<Language, string> = {
  en: "en-IN",
  hi: "hi-IN",
  te: "te-IN",
  ta: "ta-IN",
};

const uploadPrompt: Record<Language, string> = {
  en: "Please upload a photo of your tomato leaf and scan it first. Then I can check its condition and explain the result.",
  hi: "कृपया पहले अपने टमाटर के पत्ते की तस्वीर अपलोड करके जाँच करें। उसके बाद मैं उसकी स्थिति बता सकता हूँ।",
  te: "దయచేసి ముందుగా మీ టమాటా ఆకు ఫోటోను అప్‌లోడ్ చేసి స్కాన్ చేయండి. ఆ తర్వాత దాని పరిస్థితిని వివరిస్తాను.",
  ta: "முதலில் உங்கள் தக்காளி இலையின் புகைப்படத்தைப் பதிவேற்றி ஸ்கேன் செய்யவும். அதன் பிறகு அதன் நிலையை விளக்குகிறேன்.",
};

const uiText: Record<
  Language,
  {
    title: string;
    listening: string;
    idle: string;
    question: string;
    response: string;
    repeat: string;
    unsupported: string;
    recognitionError: string;
    microphoneError: string;
    speechError: string;
  }
> = {
  en: {
    title: "Tomato Plant Voice Assistant",
    listening: "Listening... Speak now",
    idle: "Ask me about tomato plant health",
    question: "YOUR QUESTION",
    response: "ASSISTANT RESPONSE",
    repeat: "🔊 Repeat Answer",
    unsupported: "Speech recognition is not supported by this browser.",
    recognitionError: "Could not recognize your voice. Please try again.",
    microphoneError: "Could not start the microphone. Please try again.",
    speechError: "Speech output could not be generated. Please try again.",
  },
  hi: {
    title: "टमाटर पौधा वॉयस असिस्टेंट",
    listening: "सुन रहा है... अब बोलें",
    idle: "टमाटर के पौधों के बारे में पूछें",
    question: "आपका प्रश्न",
    response: "सहायक का उत्तर",
    repeat: "🔊 उत्तर दोबारा सुनें",
    unsupported: "इस ब्राउज़र में आवाज़ पहचान उपलब्ध नहीं है।",
    recognitionError: "आवाज़ पहचान नहीं हो सकी। कृपया दोबारा प्रयास करें।",
    microphoneError: "माइक्रोफ़ोन शुरू नहीं हो सका।",
    speechError: "आवाज़ आउटपुट तैयार नहीं हो सका। कृपया पुनः प्रयास करें।",
  },
  te: {
    title: "టమాటా మొక్క వాయిస్ అసిస్టెంట్",
    listening: "వింటున్నాము... ఇప్పుడు మాట్లాడండి",
    idle: "టమాటా మొక్కల ఆరోగ్యం గురించి అడగండి",
    question: "మీ ప్రశ్న",
    response: "సహాయకుడి సమాధానం",
    repeat: "🔊 సమాధానాన్ని మళ్లీ వినండి",
    unsupported: "ఈ బ్రౌజర్‌లో వాయిస్ గుర్తింపు అందుబాటులో లేదు.",
    recognitionError: "మీ వాయిస్‌ను గుర్తించలేకపోయాము. మళ్లీ ప్రయత్నించండి.",
    microphoneError: "మైక్రోఫోన్ ప్రారంభం కాలేదు.",
    speechError: "వాయిస్ రూపొందించలేకపోయాము. దయచేసి మళ్లీ ప్రయత్నించండి.",
  },
  ta: {
    title: "தக்காளி செடி குரல் உதவியாளர்",
    listening: "கேட்கிறது... இப்போது பேசவும்",
    idle: "தக்காளி செடி ஆரோக்கியம் பற்றி கேளுங்கள்",
    question: "உங்கள் கேள்வி",
    response: "உதவியாளரின் பதில்",
    repeat: "🔊 பதிலை மீண்டும் கேட்கவும்",
    unsupported: "இந்த உலாவியில் குரல் அடையாளம் ஆதரிக்கப்படவில்லை.",
    recognitionError: "உங்கள் குரலை அடையாளம் காண முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
    microphoneError: "மைக்ரோஃபோனைத் தொடங்க முடியவில்லை.",
    speechError: "குரலை உருவாக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
  },
};

// Normalize recognized text before keyword matching.
function normalizeTranscript(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFC")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Keywords for questions about the user's detected tomato leaf condition.
const leafConditionKeywords: Record<Language, string[]> = {
  en: [
    "leaf condition",
    "plant condition",
    "condition of my plant",
    "condition of my leaf",
    "condition of my tomato leaf",
    "condition of my tomato plant",
    "how is my plant",
    "how is my tomato plant",
    "how is my tomato leaf",
    "what is wrong with my plant",
    "what is wrong with my leaf",
    "what is wrong with my tomato",
    "what happened to my plant",
    "what happened to my tomato",
    "what happened to the tomato",
    "what happened to my tomato plant",
    "what happened to my tomato leaf",
    "what disease does my plant have",
    "what disease is on my leaf",
    "what disease is affecting my tomato",
    "what disease does my tomato have",
    "what problem does my tomato plant have",
    "what problem does my tomato have",
    "is my plant healthy",
    "is my tomato plant healthy",
    "check my plant",
    "check my leaf",
    "check my tomato plant",
    "check my tomato leaf",
    "my tomato plant condition",
    "my tomato leaf condition",
    "my tomato plant leaf",
    "leaf health",
  ],

  hi: [
    "मेरे पौधे की स्थिति",
    "मेरे पौधे को क्या हुआ",
    "मेरे पत्ते में क्या बीमारी है",
    "मेरे टमाटर के पौधे",
    "मेरे टमाटर के पौधे को क्या हुआ",
    "मेरे टमाटर के पत्ते को क्या हुआ",
    "मेरे पौधे में क्या समस्या है",
    "मेरे पौधे में कौन सी बीमारी है",
    "मेरे टमाटर के पौधे की हालत",
    "क्या मेरा पौधा स्वस्थ है",
    "मेरे पत्ते की स्थिति",
    "इस पौधे को क्या बीमारी है",
  ],

  te: [
    // Telugu script
    "నా మొక్క పరిస్థితి",
    "నా టమాటా మొక్క",
    "నా టమోటా మొక్క",
    "నా ఆకు పరిస్థితి",
    "నా టమాటా ఆకు",
    "నా టమోటా ఆకు",
    "నా ఆకుకు ఏమైంది",
    "నా మొక్కకు ఏమైంది",
    "నా టమాటా మొక్కకు ఏమైంది",
    "నా టమోటా మొక్కకు ఏమైంది",
    "నా టమాటా ఆకుకు ఏమైంది",
    "నా మొక్కకు ఏ తెగులు ఉంది",
    "నా మొక్కకి ఏ తెగులు ఉంది",
    "నా మొక్కకి ఏమి తెగులు ఉంది",
    "నా మొక్కలో ఏ సమస్య ఉంది",
    "నా ఆకులో ఏ వ్యాధి ఉంది",
    "నా మొక్క ఆరోగ్యంగా ఉందా",
    "నా టమాటా మొక్క పరిస్థితి ఏమిటి",
    "నా మొక్క పరిస్థితి ఎలా ఉంది",
    "ఈ మొక్కకు ఏ తెగులు వచ్చింది",
    "టమాటా మొక్కకు ఏ జబ్బు వచ్చింది",
    "టమాటా ఆకుకు ఏమైంది",
    "ఇప్పుడు నా మొక్కకి ఏ తెగులు ఉంది",
    "ఇప్పుడు నా మొక్కకు ఏ తెగులు ఉంది",

    // Telugu spoken using English letters
    "ippudu naa mokkaki em tegulu undhi",
    "ippudu naa mokkaku em tegulu undhi",
    "naa mokkaki em tegulu undhi",
    "naa mokkaku em tegulu undi",
    "naa mokkaki em ayyindhi",
    "naa mokkaku em ayyindi",
    "naa tomato mokkaki em ayyindhi",
    "naa tamata mokkaki em tegulu undhi",
    "naa tomato aakuki em ayyindhi",
    "naa aakuki em ayyindhi",
    "naa mokka paristhithi enti",
    "naa mokka paristhithi ela undhi",
    "naa tomato mokka paristhithi enti",
    "naa tomato aaku paristhithi enti",
    "naa mokkalo em problem undhi",
    "naa mokkalo em disease undhi",
    "ee mokkaki em tegulu vachindhi",
    "tomato mokkaki em ayyindhi",
    "tomato aakuki em ayyindhi",
    "naa mokka healthy ga undha",
  ],

  ta: [
    "என் தக்காளி செடி",
    "என் செடியின் நிலை",
    "என் இலையில் என்ன நோய்",
    "என் தக்காளி செடிக்கு என்ன ஆனது",
    "என் தக்காளி இலையின் நிலை என்ன",
    "என் செடியில் என்ன பிரச்சனை உள்ளது",
    "என் செடிக்கு என்ன நோய் வந்துள்ளது",
    "தக்காளி இலைக்கு என்ன ஆனது",
    "என் செடி ஆரோக்கியமாக உள்ளதா",
    "என் தக்காளி செடியின் நிலை என்ன",
    "என் இலைக்கு என்ன பாதிப்பு ஏற்பட்டுள்ளது",
    "இந்த செடிக்கு என்ன நோய் வந்துள்ளது",
    "இப்போது என் செடிக்கு என்ன நோய் உள்ளது",
    "என் தக்காளி செடியில் என்ன பிரச்சனை",
    "என் தக்காளி செடிக்கு என்ன நோய்",
    "என் செடியின் ஆரோக்கிய நிலை என்ன",
  ],
};

export default function VoiceAssistant({
  language,
  detectedDisease,
}: VoiceAssistantProps) {
  const [listening, setListening] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  const labels = uiText[language];

  // Stop currently playing browser or generated audio.
  function stopCurrentSpeech() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }

    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
  }

  // Generate and play speech in the selected language.
  async function speak(text: string) {
    if (!text.trim()) return;

    stopCurrentSpeech();
    setError("");

    // Telugu and Tamil use the FastAPI Edge TTS endpoint.
    if (language === "te" || language === "ta") {
      try {
        const response = await fetch("http://127.0.0.1:8000/tts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            language,
          }),
        });

        if (!response.ok) {
          const errorDetails = await response.text();

          console.error("TTS API Status:", response.status);
          console.error("TTS API Response:", errorDetails);

          throw new Error(
            `TTS request failed: ${response.status} - ${errorDetails}`
          );
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        audioUrlRef.current = audioUrl;

        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onended = () => {
          if (audioUrlRef.current === audioUrl) {
            URL.revokeObjectURL(audioUrl);
            audioUrlRef.current = null;
            audioRef.current = null;
          }
        };

        audio.onerror = () => {
          if (audioUrlRef.current === audioUrl) {
            URL.revokeObjectURL(audioUrl);
            audioUrlRef.current = null;
            audioRef.current = null;
          }

          setError(labels.speechError);
        };

        await audio.play();
        return;
      } catch (err) {
        console.error("Telugu/Tamil TTS error:", err);
        setError(labels.speechError);
        return;
      }
    }

    // English and Hindi continue using browser speech synthesis.
    if (!("speechSynthesis" in window)) {
      setError(labels.speechError);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageLocales[language];
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onerror = () => {
      setError(labels.speechError);
    };

    window.speechSynthesis.speak(utterance);
  }

  // Identify questions asking about the user's actual leaf condition.
  function isLeafConditionQuestion(transcript: string): boolean {
    const normalized = normalizeTranscript(transcript);

    const keywords = leafConditionKeywords[language];

    return keywords.some((keyword) => {
      const normalizedKeyword = normalizeTranscript(keyword);
      return normalized.includes(normalizedKeyword);
    });
  }

  // Get disease information using the currently detected disease.
  function getDetectedDiseaseAnswer(): string | null {
    if (!detectedDisease) return null;

    const disease = diseaseInfo[detectedDisease]?.[language];

    if (!disease) return null;

    return [
      disease.title,
      disease.cause,
      disease.symptoms.join(". "),
      disease.precautions.join(". "),
      disease.recommendation,
    ].join(". ");
  }

  function findAnswer(transcript: string): string {
    const normalized = normalizeTranscript(transcript);

    // 1. Check whether the user wants their actual leaf condition.
    if (isLeafConditionQuestion(transcript)) {
      const diseaseAnswer = getDetectedDiseaseAnswer();

      if (diseaseAnswer) {
        return diseaseAnswer;
      }

      return uploadPrompt[language];
    }

    // 2. Search the existing disease database.
    for (const [diseaseKey, translations] of Object.entries(diseaseInfo)) {
      const disease = translations[language];

      const possibleNames = [
        diseaseKey.replaceAll("_", " ").toLowerCase(),
        normalizeTranscript(disease.title),
      ];

      if (
        possibleNames.some((name) =>
          normalized.includes(normalizeTranscript(name))
        )
      ) {
        return [
          disease.title,
          disease.cause,
          disease.symptoms.join(". "),
          disease.precautions.join(". "),
          disease.recommendation,
        ].join(". ");
      }
    }

    // 3. Answer general tomato farming questions.
    const plantAnswer = matchPlantQuestion(transcript, language);

    if (plantAnswer) {
      return plantAnswer;
    }

    // 4. Return the fallback answer.
    return fallbackAnswer[language];
  }

  function startListening() {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    const speechWindow = window as typeof window & {
      SpeechRecognition?: new () => SpeechRecognitionLike;
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    };

    const SpeechRecognition =
      speechWindow.SpeechRecognition ??
      speechWindow.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError(labels.unsupported);
      return;
    }

    stopCurrentSpeech();

    const recognition = new SpeechRecognition();

    recognition.lang = languageLocales[language];
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim();

      if (!transcript) return;

      setQuestion(transcript);

      const response = findAnswer(transcript);

      setAnswer(response);
      setError("");

      void speak(response);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
      setError(labels.recognitionError);
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
      setListening(true);
      setError("");
    } catch {
      setListening(false);
      setError(labels.microphoneError);
    }
  }

  // Stop audio and microphone when the component is removed.
  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();

      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }

      audioRef.current?.pause();

      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }
    };
  }, []);

  return (
    <section className="flex flex-col items-center rounded-[2rem] border border-[#e4ebdd] bg-white p-6 text-center shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#edf5e7] text-3xl">
        🌱
      </div>

      <h3 className="mt-3 text-lg font-extrabold text-[#233c2b]">
        {labels.title}
      </h3>

      <p className="mt-2 text-sm text-[#71816e]">
        {listening ? labels.listening : labels.idle}
      </p>

      <button
        type="button"
        onClick={startListening}
        aria-label={listening ? "Stop microphone" : "Start microphone"}
        aria-pressed={listening}
        className={`mt-5 flex h-16 w-16 items-center justify-center rounded-full text-2xl text-white shadow-lg transition ${
          listening
            ? "animate-pulse bg-red-600"
            : "bg-[#477b3e] hover:bg-[#376831]"
        }`}
      >
        {listening ? "■" : "🎙️"}
      </button>

      {question && (
        <div className="mt-5 w-full rounded-xl bg-[#f7faf3] p-4 text-left">
          <p className="text-xs font-bold text-[#71816e]">
            {labels.question}
          </p>

          <p className="mt-2 text-sm text-[#233c2b]">
            {question}
          </p>
        </div>
      )}

      {answer && (
        <div className="mt-3 w-full rounded-xl border border-[#dfe8d7] p-4 text-left">
          <p className="text-xs font-bold text-[#477b3e]">
            {labels.response}
          </p>

          <p className="mt-2 text-sm leading-6 text-[#233c2b]">
            {answer}
          </p>

          <button
            type="button"
            onClick={() => void speak(answer)}
            className="mt-3 rounded-lg bg-[#edf5e7] px-4 py-2 text-sm font-semibold text-[#315b27]"
          >
            {labels.repeat}
          </button>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}
    </section>
  );
}
