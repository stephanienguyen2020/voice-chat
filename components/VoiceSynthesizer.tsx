"use client";

import { useEffect, useRef, useState } from "react";
import { textToSpeech } from "@/actions/elevenlabs";

type Props = {
  state: {
    sender: string;
    response: string | null | undefined;
  };
  displaySettings?: boolean;
};

export default function VoiceSynthesizer({
  state,
  displaySettings = false,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (state.response) {
      handleSpeak(state.response);
    }
  }, [state.response]);

  const handleSpeak = async (text: string) => {
    try {
      setError(null);
      const base64Audio = await textToSpeech(text);

      if (audioRef.current) {
        audioRef.current.src = `data:audio/mpeg;base64,${base64Audio}`;
        audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      setError("Failed to generate speech");
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          setIsPlaying(false);
          setError("Failed to play audio");
        }}
      />

      {error && <div className="text-red-500 text-sm">{error}</div>}

      {displaySettings && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Voice Settings</h3>
          {/* Add voice selection and other settings here */}
        </div>
      )}
    </div>
  );
}
