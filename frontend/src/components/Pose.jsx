import React, { useRef, useEffect, useState } from "react";
import { FilesetResolver, PoseLandmarker } from "@mediapipe/tasks-vision";
import { useLocation } from "react-router-dom";
import { useWorkout } from "../contexts/WorkoutContext";

const MediaPose = () => {
  const location = useLocation();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [poseLandmarker, setPoseLandmarker] = useState(null);
  const { workoutType, setWorkoutType } = useWorkout();

  // State for exercise tracking
  const [exerciseCounts, setExerciseCounts] = useState({
    squats: 0,
    pushups: 0,
    crunches: 0,
    curls: 0,
  });

  // State to track user's presence in the frame
  const [userInFrame, setUserInFrame] = useState(true);
  const hasSpokenOutRef = useRef(false);
  const hasSpokenInRef = useRef(false);

  // Speech feedback function
  const speakFeedback = (message) => {
    const synth = window.speechSynthesis;
    synth.cancel(); // Stop any previous speech
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-US";
    synth.speak(utterance);
  };

  useEffect(() => {
    if (location.state?.exerciseName) {
      setWorkoutType(location.state.exerciseName);
    }
  }, [location, setWorkoutType]);

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

      canvasElement.width = videoElement.videoWidth;
      canvasElement.height = videoElement.videoHeight;

      const processFrame = async () => {
        if (!videoElement.paused && !videoElement.ended) {
          const results = await poseLandmarker.detectForVideo(
            videoElement,
            performance.now()
          );

          if (results.landmarks.length > 0) {
            // ✅ User detected
            if (!userInFrame) {
              setUserInFrame(true);
              hasSpokenOutRef.current = false;
              if (!hasSpokenInRef.current) {
                speakFeedback("Best of luck with your workout!");
                hasSpokenInRef.current = true;
              }
            }

            // Draw pose on canvas
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            canvasCtx.drawImage(
              videoElement,
              0,
              0,
              canvasElement.width,
              canvasElement.height
            );

            results.landmarks.forEach((landmarks) => {
              landmarks.forEach((point) => {
                canvasCtx.beginPath();
                canvasCtx.arc(
                  point.x * canvasElement.width,
                  point.y * canvasElement.height,
                  5,
                  0,
                  2 * Math.PI
                );
                canvasCtx.fillStyle = "red";
                canvasCtx.fill();
              });

              // Detect exercises
              if (workoutType === "Squats") detectSquats(landmarks);
              if (workoutType === "Push Ups") detectPushUps(landmarks);
              if (workoutType === "Crunches") detectCrunches(landmarks);
              if (workoutType === "Bicep Curls") detectCurls(landmarks);
            });

          } else {
            // ❌ User out of frame
            if (userInFrame) {
              setUserInFrame(false);
              hasSpokenInRef.current = false;
              if (!hasSpokenOutRef.current) {
                speakFeedback("Please ensure you are visible in the frame.");
                hasSpokenOutRef.current = true;
              }
            }
          }
        }
        requestAnimationFrame(processFrame);
      };

      requestAnimationFrame(processFrame);
    };

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoElement.srcObject = stream;
        videoElement.onloadedmetadata = () => {
          videoElement.play();
          detectPose();
        };
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startCamera();
  }, [poseLandmarker, workoutType]);

  // Dummy exercise detection functions (replace with actual logic)
  const detectSquats = (landmarks) => {
    setExerciseCounts((prev) => ({ ...prev, squats: prev.squats + 1 }));
  };

  const detectPushUps = (landmarks) => {
    setExerciseCounts((prev) => ({ ...prev, pushups: prev.pushups + 1 }));
  };

  const detectCrunches = (landmarks) => {
    setExerciseCounts((prev) => ({ ...prev, crunches: prev.crunches + 1 }));
  };

  const detectCurls = (landmarks) => {
    setExerciseCounts((prev) => ({ ...prev, curls: prev.curls + 1 }));
  };

  // Handle form submission (dummy function)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Workout submitted:", exerciseCounts);
  };

  return (
    <div className="text-center flex flex-col md:flex-row">
      <video ref={videoRef} className="input_video" hidden />
      <canvas ref={canvasRef} className="w-full h-full max-w-[800px] m-4 border-2 border-green-200 rounded-xl mx-auto" />

      <form onSubmit={handleSubmit} className="my-4 mx-8">
        <select
          value={workoutType}
          onChange={(e) => setWorkoutType(e.target.value)}
        >
          <option value="Bicep Curls">Bicep Curls</option>
          <option value="Push Ups">Push-Ups</option>
          <option value="Squats">Squats</option>
          <option value="Crunches">Crunches</option>
        </select>

        <h2>Squats: {exerciseCounts.squats}</h2>
        <h2>Push-Ups: {exerciseCounts.pushups}</h2>
        <h2>Crunches: {exerciseCounts.crunches}</h2>
        <h2>Bicep Curls: {exerciseCounts.curls}</h2>

        <button type="submit" className="border-2 border-black rounded-full px-2">Submit</button>
      </form>
    </div>
  );
};

export default MediaPose;
