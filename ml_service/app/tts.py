
import edge_tts

VOICE_MAP = {
    "te": "te-IN-ShrutiNeural",
    "ta": "ta-IN-PallaviNeural",
}


async def generate_speech(text: str, language: str) -> bytes:
    voice = VOICE_MAP.get(language)

    if not voice:
        raise ValueError("Unsupported TTS language")

    communicate = edge_tts.Communicate(
        text=text,
        voice=voice,
        rate="+0%",
    )

    audio_data = bytearray()

    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            audio_data.extend(chunk["data"])

    if not audio_data:
        raise RuntimeError("Speech generation returned no audio")

    return bytes(audio_data)
