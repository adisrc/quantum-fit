import React, { useRef, useEffect, useState } from "react";
import { FilesetResolver, PoseLandmarker } from "@mediapipe/tasks-vision";

const MediaPose = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [poseLandmarker, setPoseLandmarker] = useState(null);

  // State variables for activity counting and feedback
  const [squatCount, setSquatCount] = useState(0);
  const [pushUpCount, setPushUpCount] = useState(0);
  const [crunchCount, setCrunchCount] = useState(0);
  const [curlCount, setCurlCount] = useState(0);  // Bicep curl counter
  const [squatState, setSquatState] = useState("Up");
  const [pushUpState, setPushUpState] = useState("Up");
  const [crunchState, setCrunchState] = useState("Up");
  const [curlState, setCurlState] = useState("Down");  // State for curl
  const [feedbackMessage, setFeedbackMessage] = useState("Perform your exercises!");

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

      // Set canvas size based on video dimensions
      canvasElement.width = videoElement.videoWidth;
      canvasElement.height = videoElement.videoHeight;

      const processFrame = async () => {
        if (!videoElement.paused && !videoElement.ended) {
          const results = await poseLandmarker.detectForVideo(videoElement, performance.now());

          if (results.landmarks.length > 0) {
            // User detected in frame
            setFeedbackMessage("Great job! Keep going!");
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            canvasCtx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

            results.landmarks.forEach((landmarks) => {
              // Draw landmarks
              landmarks.forEach((point) => {
                canvasCtx.beginPath();
                canvasCtx.arc(point.x * canvasElement.width, point.y * canvasElement.height, 5, 0, 2 * Math.PI);
                canvasCtx.fillStyle = "red";
                canvasCtx.fill();
              });

              // 🔥 Call activity detection functions
              detectSquats(landmarks);
              detectPushUps(landmarks);
              detectCrunches(landmarks);
              detectCurls(landmarks);  // Detect curls
            });
          } else {
            // User not detected
            setFeedbackMessage("Please make sure you're visible in the frame.");
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

  // Function to detect squats
  const detectSquats = (landmarks) => {
    const hip = landmarks[11]; // Left hip
    const knee = landmarks[13]; // Left knee
    const ankle = landmarks[15]; // Left ankle

    const angle = calculateAngle(hip, knee, ankle);

    if (angle < 90 && squatState === "Up") {
      setSquatState("Down"); // Moving down
    } else if (angle > 160 && squatState === "Down") {
      setSquatState("Up"); // Moving up
      setSquatCount((prev) => prev + 1); // Increment squat count
    }
  };

  // Function to detect push-ups
  const detectPushUps = (landmarks) => {
    const shoulder = landmarks[12]; // Right shoulder
    const elbow = landmarks[14]; // Right elbow
    const wrist = landmarks[16]; // Right wrist

    const angle = calculateAngle(shoulder, elbow, wrist);

    if (angle < 45 && pushUpState === "Up") {
      setPushUpState("Down"); // Moving down
    } else if (angle > 150 && pushUpState === "Down") {
      setPushUpState("Up"); // Moving up
      setPushUpCount((prev) => prev + 1); // Increment push-up count
    }
  };

  // Function to detect crunches
  const detectCrunches = (landmarks) => {
    const shoulder = landmarks[11]; // Left shoulder
    const hip = landmarks[24]; // Left hip

    const angle = calculateAngle(shoulder, hip, { x: shoulder.x, y: shoulder.y + 0.1 }); // Reference point above shoulder
     
    if (angle < 50 && crunchState === "Up") {
      setCrunchState("Down"); // Crunch down
    } else if (angle > 150 && crunchState === "Down") {
      setCrunchState("Up"); // Crunch up
      setCrunchCount((prev) => prev + 1); // Increment crunch count
    }
  };

// Function to detect bicep curls
const detectCurls = (landmarks) => {
    const shoulder = landmarks[12]; // Right shoulder
    const elbow = landmarks[14]; // Right elbow
    const wrist = landmarks[16]; // Right wrist

    const angle = calculateAngle(shoulder, elbow, wrist);

    const thresholdUp = 50;
    const thresholdDown = 100;
 console.log(angle);
 
    setCurlState((prevCurlState) => {
        if (angle < thresholdUp && prevCurlState === "Down") {
            setCurlCount((prev) => prev + 1); // Increment count
            return "Up"; // Update state
        } else if (angle > thresholdDown && prevCurlState === "Up") {
            return "Down"; // Reset state
        }
        return prevCurlState; // Keep current state if no change
    });
};

  

  // Function to calculate angle between three points
  const calculateAngle = (A, B, C) => {
    const radians = Math.atan2(C.y - B.y, C.x - B.x) - Math.atan2(A.y - B.y, A.x - B.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180) angle = 360 - angle;
    return angle;
  };

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <h2>Squat Count: {squatCount}</h2>
      <h2>Push-Up Count: {pushUpCount}</h2>
      <h2>Crunch Count: {crunchCount}</h2>
      <h2>Bicep Curl Count: {curlCount}</h2>
      <h3>{feedbackMessage}</h3>
      <video ref={videoRef} className="input_video" style={{ display: "none" }} />
      <canvas ref={canvasRef} width={1280} height={720} style={{ width: "100%" }} />
    </div>
  );
};

export default MediaPose;
