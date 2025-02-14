import React, { useRef, useEffect, useState } from "react";
import { FilesetResolver, PoseLandmarker } from "@mediapipe/tasks-vision";

const MediaPose = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [poseLandmarker, setPoseLandmarker] = useState(null);

  useEffect(() => {
    const initializePoseLandmarker = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
      );

      const landmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-assets/pose_landmarker.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numPoses: 1,
      });
      

      setPoseLandmarker(landmarker);
    };

    initializePoseLandmarker();
  }, []);

  useEffect(() => {
    if (!poseLandmarker) return;

    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    const detectPose = async () => {
        if (!poseLandmarker || !videoElement) return;
      
        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement.getContext("2d");
      
        // Set canvas size based on video dimensions
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
      
        const processFrame = async () => {
          if (!videoElement.paused && !videoElement.ended) {
            const results = await poseLandmarker.detectForVideo(videoElement, performance.now());
      
            if (results.landmarks.length > 0) {
              canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
              canvasCtx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
      
              results.landmarks.forEach((landmarks) => {
                landmarks.forEach((point) => {
                  canvasCtx.beginPath();
                  canvasCtx.arc(point.x * canvasElement.width, point.y * canvasElement.height, 5, 0, 2 * Math.PI);
                  canvasCtx.fillStyle = "red";
                  canvasCtx.fill();
                });
              });
            }
          }
          requestAnimationFrame(processFrame);
        };
      
        requestAnimationFrame(processFrame);
      };
      

    const startCamera = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoElement.srcObject = stream;
        videoElement.onloadedmetadata = () => {
          videoElement.play();
          detectPose();
        };
      };
      

    startCamera();
  }, [poseLandmarker]);

  return (
    <div style={{ position: "relative" }}>
      <video ref={videoRef} className="input_video" style={{ display: "none" }} />
      <canvas ref={canvasRef} width={1280} height={720} style={{ width: "100%" }} />
    </div>
  );
};

export default MediaPose;
