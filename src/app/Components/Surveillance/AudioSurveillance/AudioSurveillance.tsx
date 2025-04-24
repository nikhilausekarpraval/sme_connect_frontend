"use client";
import React, { useEffect, useRef, useState } from "react";

const AudioSurveillance: React.FC = () => {
  const [alert, setAlert] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const initAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;

        const dataArray = new Uint8Array(analyser.fftSize);
        source.connect(analyser);

        const freqData = new Float32Array(analyser.frequencyBinCount);
        analyser.getFloatFrequencyData(freqData);

        // Count how many freq bands are "loud"
        const activeBands = freqData.filter(v => v > -60).length;

        if (activeBands > 50) {
        setAlert("🚨 Multiple people may be speaking.");
        }


        const threshold = 5; // Adjust as needed

        const detect = () => {
          analyser.getByteTimeDomainData(dataArray);
          const volume =
            dataArray.reduce((sum, val) => sum + Math.abs(val - 128), 0) / dataArray.length;

            console.log(volume)
          if (volume > threshold) {
            setAlert("🎤 Audio detected: Someone is speaking.");
          } else {
            setAlert(null);
          }

          animationFrameIdRef.current = requestAnimationFrame(detect);
        };

        detect();
      } catch (err) {
        console.error("Audio init error:", err);
        setAlert("⚠️ Microphone access denied.");
      }
    };

    initAudio();

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <>
      {alert && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "8px 12px",
            borderRadius: "8px",
            fontWeight: "bold",
            zIndex: 9999,
          }}
        >
          {alert}
        </div>
      )}
    </>
  );
};

export default AudioSurveillance;
