
"use client";

import { useState } from "react";

const languages = [
  {
    code: "en",
    name: "English",
    native: "English",
    greeting: "Healthy leaves. Healthier harvest.",
    description:
      "Detect tomato leaf diseases and learn how to protect your plants.",
    choose: "Choose your language",
    subtitle: "Select the language you're comfortable with.",
    badge: "Your plant care companion",
    button: "Continue",
    footer: "Simple plant care for every farmer.",
    account: "No account needed.",
    selected: "Selected",
    select: "Select",
  },
  {
    code: "hi",
    name: "Hindi",
    native: "हिंदी",
    greeting: "स्वस्थ पत्तियाँ। बेहतर फसल।",
    description:
      "टमाटर की पत्तियों की बीमारियों को पहचानें और पौधों की सुरक्षा करना सीखें।",
    choose: "अपनी भाषा चुनें",
    subtitle: "वह भाषा चुनें जिसमें आप सहज महसूस करते हैं।",
    badge: "आपका पौधों की देखभाल का साथी",
    button: "आगे बढ़ें",
    footer: "हर किसान के लिए आसान पौधों की देखभाल।",
    account: "खाते की आवश्यकता नहीं है।",
    selected: "चुना गया",
    select: "चुनें",
  },
  {
    code: "te",
    name: "Telugu",
    native: "తెలుగు",
    greeting: "ఆరోగ్యకరమైన ఆకులు. మెరుగైన దిగుబడి.",
    description:
      "టమాటా ఆకుల వ్యాధులను గుర్తించి, మొక్కలను ఎలా రక్షించాలో తెలుసుకోండి.",
    choose: "మీ భాషను ఎంచుకోండి",
    subtitle: "మీకు సౌకర్యంగా ఉండే భాషను ఎంచుకోండి.",
    badge: "మీ మొక్కల సంరక్షణ సహాయకుడు",
    button: "కొనసాగించండి",
    footer: "ప్రతి రైతు కోసం సులభమైన మొక్కల సంరక్షణ.",
    account: "ఖాతా అవసరం లేదు.",
    selected: "ఎంచుకున్నారు",
    select: "ఎంచుకోండి",
  },
  {
    code: "ta",
    name: "Tamil",
    native: "தமிழ்",
    greeting: "ஆரோக்கியமான இலைகள். சிறந்த விளைச்சல்.",
    description:
      "தக்காளி இலை நோய்களைக் கண்டறிந்து, செடிகளைப் பாதுகாப்பது எப்படி என்று அறியுங்கள்.",
    choose: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
    subtitle: "உங்களுக்கு வசதியான மொழியைத் தேர்ந்தெடுக்கவும்.",
    badge: "உங்கள் செடி பராமரிப்புத் துணை",
    button: "தொடரவும்",
    footer: "ஒவ்வொரு விவசாயிக்கும் எளிய செடி பராமரிப்பு.",
    account: "கணக்கு தேவையில்லை.",
    selected: "தேர்ந்தெடுக்கப்பட்டது",
    select: "தேர்ந்தெடுக்கவும்",
  },
];

export default function Home() {
  const [selected, setSelected] = useState("en");

  const language = languages.find((item) => item.code === selected)!;

  function handleContinue() {
    localStorage.setItem("tomato-language", selected);
    window.location.href = "/home";
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f6f8ef] px-4 py-8 text-[#233c2b] sm:py-12">
      {/* Soft background decoration */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#dcebcf] opacity-70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#f7dfc9] opacity-60 blur-3xl" />

      <section className="relative w-full max-w-lg rounded-[2rem] border border-white bg-white/95 p-6 shadow-xl shadow-green-950/5 sm:p-10">
        {/* Brand */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9f3df] text-3xl">
            🍅
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight">
              TOMATO PLANT SAFE
            </h1>
            <p className="text-xs font-medium tracking-wide text-[#71816e]">
              Smart care for Healthier plants
            </p>
          </div>
        </div>

        {/* Welcome section */}
        <div className="mb-8 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#edf5e7] px-4 py-2 text-sm font-semibold text-[#47723e]">
            <span aria-hidden="true">🌿</span>
            {language.badge}
          </div>

          <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {language.greeting}
          </h2>

          <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-[#6b796b]">
            {language.description}
          </p>
        </div>

        {/* Language selection */}
        <div className="mb-7">
          <div className="mb-5 text-center">
            <h3 className="text-xl font-bold tracking-tight">
              {language.choose}
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#788575]">
              {language.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {languages.map((item) => {
              const isSelected = selected === item.code;

              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setSelected(item.code)}
                  aria-pressed={isSelected}
                  className={`min-h-28 rounded-2xl border-2 p-4 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-[#58864b] bg-[#eff6e9] shadow-sm"
                      : "border-[#edf0e9] bg-white hover:border-[#b8cfaa]"
                  }`}
                >
                  <span className="mb-2 block text-xs font-medium text-[#849080]">
                    {item.name}
                  </span>

                  <span className="block text-xl font-bold">
                    {item.native}
                  </span>

                  <span
                    className={`mt-3 block text-sm ${
                      isSelected
                        ? "font-semibold text-[#477b3e]"
                        : "text-[#788575]"
                    }`}
                  >
                    {isSelected ? `✓ ${item.selected}` : item.select}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Continue */}
        <button
          type="button"
          onClick={handleContinue}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#477b3e] px-6 py-4 font-bold text-white shadow-lg shadow-green-900/10 transition hover:bg-[#376831] active:scale-[0.99]"
        >
          {language.button}
          <span aria-hidden="true">→</span>
        </button>

        {/* Footer */}
        <p className="mt-5 text-center text-xs leading-6 text-[#8b9586]">
          {language.footer}
          <br />
          {language.account}
        </p>
      </section>
    </main>
  );
}
