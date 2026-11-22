
"use client";

import { useEffect, useState } from "react";

const languages = [
  {
    code: "en",
    name: "English",
    native: "English",
    flag: "🇬🇧",
    greeting: "Healthy leaves.\nHealthier harvest.",
    description:
      "Detect tomato leaf diseases early and discover smarter ways to protect your crops.",
    choose: "Choose your language",
    subtitle: "Select the language you're most comfortable with.",
    badge: "SMART FARMING COMPANION",
    button: "Get Started",
    footer: "Technology that grows with every farmer.",
    account: "Free to use · No account required",
    selected: "Selected",
    select: "Select language",
  },
  {
    code: "hi",
    name: "Hindi",
    native: "हिंदी",
    flag: "🇮🇳",
    greeting: "स्वस्थ पत्तियाँ।\nबेहतर फसल।",
    description:
      "टमाटर की पत्तियों की बीमारियों को जल्दी पहचानें और अपनी फसल को सुरक्षित रखें।",
    choose: "अपनी भाषा चुनें",
    subtitle: "वह भाषा चुनें जिसमें आप सहज महसूस करते हैं।",
    badge: "स्मार्ट खेती सहायक",
    button: "शुरू करें",
    footer: "हर किसान के साथ बढ़ती तकनीक।",
    account: "मुफ़्त उपयोग · खाते की आवश्यकता नहीं",
    selected: "चुना गया",
    select: "भाषा चुनें",
  },
  {
    code: "te",
    name: "Telugu",
    native: "తెలుగు",
    flag: "🇮🇳",
    greeting: "ఆరోగ్యకరమైన ఆకులు.\nమెరుగైన దిగుబడి.",
    description:
      "టమాటా ఆకుల వ్యాధులను ముందుగానే గుర్తించి మీ పంటను రక్షించుకోండి.",
    choose: "మీ భాషను ఎంచుకోండి",
    subtitle: "మీకు సౌకర్యంగా ఉండే భాషను ఎంచుకోండి.",
    badge: "స్మార్ట్ వ్యవసాయ సహాయకుడు",
    button: "ప్రారంభించండి",
    footer: "ప్రతి రైతుతో అభివృద్ధి చెందే సాంకేతికత.",
    account: "ఉచిత వినియోగం · ఖాతా అవసరం లేదు",
    selected: "ఎంచుకున్నారు",
    select: "భాషను ఎంచుకోండి",
  },
  {
    code: "ta",
    name: "Tamil",
    native: "தமிழ்",
    flag: "🇮🇳",
    greeting: "ஆரோக்கியமான இலைகள்.\nசிறந்த விளைச்சல்.",
    description:
      "தக்காளி இலை நோய்களை முன்கூட்டியே கண்டறிந்து உங்கள் பயிர்களைப் பாதுகாக்கவும்.",
    choose: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
    subtitle: "உங்களுக்கு வசதியான மொழியைத் தேர்ந்தெடுக்கவும்.",
    badge: "ஸ்மார்ட் விவசாய உதவியாளர்",
    button: "தொடங்குங்கள்",
    footer: "ஒவ்வொரு விவசாயியுடனும் வளரும் தொழில்நுட்பம்.",
    account: "இலவச பயன்பாடு · கணக்கு தேவையில்லை",
    selected: "தேர்ந்தெடுக்கப்பட்டது",
    select: "மொழியைத் தேர்ந்தெடுக்கவும்",
  },
];

export default function Home() {
  const [selected, setSelected] = useState("en");
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  const language = languages.find(
    (item) => item.code === selected
  )!;

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  function handleContinue() {
    localStorage.setItem("tomato-language", selected);
    window.location.href = "/home";
  }

  return (
    <main className="min-h-screen bg-[#f7f8f1] text-[#193b27]">
      {/* Navigation */}
      <nav className="relative z-10 mx-auto flex max-w-[1500px] items-center justify-between px-5 py-5 sm:px-10 lg:px-16">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e4efdc] text-2xl">
            🍅
          </div>

          <div>
            <h1 className="text-lg font-black tracking-tight sm:text-xl">
              TOMATO PLANT SAFE
            </h1>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7c907c]">
              Intelligent Crop Care
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-[#dce7d6] bg-white px-4 py-2 text-xs font-semibold text-[#54734e] sm:flex">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          AI Powered Plant Protection
        </div>
      </nav>

      {/* Main content */}
      <section className="mx-auto grid max-w-[1500px] gap-8 px-5 pb-12 pt-5 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:px-16 lg:py-12">
        {/* Left hero section */}
        <div className="flex flex-col">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#dce8d5] bg-white px-4 py-2 text-xs font-bold tracking-wide text-[#54734e]">
            <span className="text-base">🌱</span>
            {language.badge}
          </div>

          <h2 className="whitespace-pre-line text-4xl font-black leading-[1.13] tracking-tight sm:text-5xl lg:text-6xl">
            {language.greeting}
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-[#71816e] sm:text-lg">
            {language.description}
          </p>

          {/* Hero image */}
          <div className="group relative mt-8 overflow-hidden rounded-[2rem] shadow-xl shadow-[#25442a]/10">
            <img
              src="https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=1400&q=85"
              alt="Healthy tomato plants growing in a farm"
              className="h-[300px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[380px]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#102d1b]/85 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c9e5b8]">
                Grow smarter. Grow healthier.
              </p>

              <h3 className="mt-2 max-w-md text-2xl font-bold leading-tight text-white sm:text-3xl">
                Protect your tomato crops with intelligent disease detection.
              </h3>
            </div>

            <div className="absolute right-5 top-5 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
              🌿 Smart Agriculture
            </div>
          </div>

          {/* Feature highlights */}
          <div className="mt-7 grid grid-cols-3 gap-3">
            {[
              { icon: "🔬", title: "AI Detection", desc: "Leaf analysis" },
              { icon: "🌍", title: "4 Languages", desc: "Local support" },
              { icon: "🎙️", title: "Voice Assistant", desc: "Ask questions" },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-[#e4eadf] bg-white p-3 sm:p-4"
              >
                <span className="text-xl sm:text-2xl">
                  {feature.icon}
                </span>

                <p className="mt-2 text-xs font-extrabold text-[#25452d] sm:text-sm">
                  {feature.title}
                </p>

                <p className="mt-1 text-[10px] text-[#879283] sm:text-xs">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right language selection panel */}
        <div className="relative">
          <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-[#e0ebd7] blur-3xl" />

          <div className="relative rounded-[2rem] border border-white bg-white p-6 shadow-xl shadow-[#25442a]/5 sm:p-9 lg:p-10">
            <div className="mb-7">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf5e7] text-3xl">
                🌾
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#719367]">
                Welcome to Tomato Plant Safe
              </p>

              <h3 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                {language.choose}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#829080]">
                {language.subtitle}
              </p>
            </div>

            {/* Language cards */}
            <div className="grid grid-cols-2 gap-3">
              {languages.map((item) => {
                const isSelected = selected === item.code;

                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => setSelected(item.code)}
                    aria-pressed={isSelected}
                    className={`group relative flex min-h-[135px] flex-col items-start justify-between rounded-2xl border-2 p-4 text-left transition-all duration-200 hover:-translate-y-1 ${
                      isSelected
                        ? "border-[#477b3e] bg-[#f0f6eb] shadow-md shadow-green-900/5"
                        : "border-[#edf0e9] bg-[#fcfdf9] hover:border-[#b9cfae] hover:bg-[#f7faf3]"
                    }`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="text-2xl">
                        {item.flag}
                      </span>

                      {isSelected && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#477b3e] text-xs font-bold text-white">
                          ✓
                        </span>
                      )}
                    </div>

                    <div className="mt-5">
                      <p className="text-xs font-medium text-[#879283]">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xl font-extrabold text-[#25452d]">
                        {item.native}
                      </p>

                      <p
                        className={`mt-2 text-[10px] font-bold ${
                          isSelected
                            ? "text-[#477b3e]"
                            : "text-[#9ba495]"
                        }`}
                      >
                        {isSelected ? item.selected : item.select}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected language preview */}
            <div className="mt-6 rounded-2xl bg-[#f7f9f3] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#8b9786]">
                    Your selected language
                  </p>

                  <p className="mt-1 text-base font-extrabold text-[#315b37]">
                    {language.native}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e5efdc] text-lg">
                  🌿
                </div>
              </div>
            </div>

            {/* Continue button */}
            <button
              type="button"
              onClick={handleContinue}
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#477b3e] px-6 py-4 font-bold text-white shadow-lg shadow-green-900/10 transition duration-200 hover:-translate-y-0.5 hover:bg-[#376831] hover:shadow-xl active:scale-[0.99]"
            >
              {language.button}
              <span className="text-xl">→</span>
            </button>

            <p className="mt-5 text-center text-xs text-[#929b8d]">
              {language.footer}
            </p>

            <p className="mt-2 text-center text-[10px] font-medium text-[#a0a99b]">
              {language.account}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e5eadf] px-5 py-6 text-center">
        <p className="text-xs font-medium text-[#8a9685]">
          © {currentYear ?? 2026} Tomato Plant Safe · Smart Agriculture for Everyone
        </p>
      </footer>
    </main>
  );
}
