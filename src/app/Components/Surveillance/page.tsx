"use client";
import React, { useRef, useEffect, useState } from "react";
import type { FaceLandmarksDetector } from "@tensorflow-models/face-landmarks-detection";

const SurveillanceWithLandmarks: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [alert, setAlert] = useState<string | null>(null);
  const lookingAwayStart = useRef<number | null>(null);
  const modelRef = useRef<FaceLandmarksDetector | null>(null);

  useEffect(() => {
    let animationFrameId: number;

    const init = async () => {
      try {
        const tf = await import("@tensorflow/tfjs-core");
        await import("@tensorflow/tfjs-backend-webgl");
        const { createDetector, SupportedModels } = await import(
          "@tensorflow-models/face-landmarks-detection"
        );

        await tf.setBackend("webgl");
        await tf.ready();

        const model = await createDetector(SupportedModels.MediaPipeFaceMesh, {
          runtime: "mediapipe",
          solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh",
          refineLandmarks: true,
          maxFaces: 5,
        });
        modelRef.current = model;

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        const detect = async () => {
          if (!videoRef.current || !modelRef.current || !canvasRef.current) return;

          const faces = await modelRef.current.estimateFaces(videoRef.current, {
            flipHorizontal: true,
          });

          const ctx = canvasRef.current.getContext("2d");
          if (!ctx) return;

          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

          if (faces.length === 0) {
            setAlert("⚠️ No face detected.");
            lookingAwayStart.current = null;
            return;
          }

          if (faces.length > 1) {
            setAlert("🚨 Multiple faces detected!");
            lookingAwayStart.current = null;
          } else {
            setAlert(null);
          }

          // Draw all faces
          faces.forEach((face) => {
            const { box, keypoints } = face;
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.strokeRect(box.xMin, box.yMin, box.xMax - box.xMin, box.yMax - box.yMin);

            ctx.fillStyle = "lime";
            keypoints.forEach((point) => {
              ctx.beginPath();
              ctx.arc(point.x, point.y, 1.5, 0, 2 * Math.PI);
              ctx.fill();
            });
          });

          // 👁️ Looking away logic — check only for the first face
          if (faces.length === 1) {
            const keypoints = faces[0].keypoints;
            const leftEye = keypoints[33];
            const rightEye = keypoints[263];
            const noseTip = keypoints[1];

            if (!leftEye || !rightEye || !noseTip) return;

            const eyeMidX = (leftEye.x + rightEye.x) / 2;
            const eyeMidY = (leftEye.y + rightEye.y) / 2;
            const offsetX = noseTip.x - eyeMidX;
            const offsetY = noseTip.y - eyeMidY;

            console.log(offsetX, offsetY)

            const isLookingAway = Math.abs(offsetX) > 25 || Math.abs(offsetY) > 65;

            if (isLookingAway) {
              if (!lookingAwayStart.current) {
                lookingAwayStart.current = Date.now();
              } else if (Date.now() - lookingAwayStart.current > 3000) {
                setAlert("⚠️ Please keep looking at the screen.");
              }
            } else {
              lookingAwayStart.current = null;
              if (faces.length === 1) {
                setAlert(null);
              }
            }
          }
        };


        const loop = async () => {
          await detect();
          animationFrameId = requestAnimationFrame(loop);
        };
        loop();
      } catch (err) {
        console.error(err);
        setAlert("⚠️ Failed to initialize surveillance.");
      }
    };

    init();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", width: 640, height: 480 }}>
      <video
        ref={videoRef}
        width="640"
        height="480"
        autoPlay
        muted
        style={{ position: "absolute", top: 0, left: 0 }}
      />
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 50 }}
      />
      {alert && (
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            backgroundColor: "rgba(255, 0, 0, 0.8)",
            padding: "8px 12px",
            borderRadius: "6px",
            fontWeight: "bold",
            zIndex: 10,
          }}
        >
          {alert}
        </div>
      )}

    </div>
  );
};

export default SurveillanceWithLandmarks;
