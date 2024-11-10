"use server";

export async function textToSpeech(text: string) {
  const ELEVEN_LABS_API_KEY = process.env.ELEVEN_LABS_API_KEY;
  const VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // default voice ID, you can change this

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVEN_LABS_API_KEY!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const audioBlob = await response.blob();
    // Convert blob to base64
    const buffer = await audioBlob.arrayBuffer();
    const base64Audio = Buffer.from(buffer).toString("base64");

    return base64Audio;
  } catch (error) {
    console.error("Error calling Eleven Labs:", error);
    throw error;
  }
}
