import React, { useRef, useEffect, useState } from "react";
import { FilesetResolver, PoseLandmarker } from "@mediapipe/tasks-vision";
import { useLocation } from "react-router-dom";
import { useWorkout } from "../contexts/WorkoutContext";
import { USER_API_END_POINT } from "../utils/constant"
import axios from "axios";
import Footer from "./footer";

const MediaPose = () => {
  const location = useLocation();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [poseLandmarker, setPoseLandmarker] = useState(null);
  const [startClick, setStartClick] = useState(false);
  const [timeStamp, setTimeStamp] = useState("");
  const [duration, setDuration] = useState();
  const [startTime, setStartTime] = useState(null); // To store the start time
  const [elapsedTime, setElapsedTime] = useState(0); // To store the elapsed time

  //FORMDATA
  // const [workoutType, setWorkoutType] = useState("None");
  const { workoutType, setWorkoutType, isSignedIn, user } = useWorkout();

  // State variables for activity counting and feedback
  const [squatCount, setSquatCount] = useState(0);
  const [pushUpCount, setPushUpCount] = useState(0);
  const [crunchCount, setCrunchCount] = useState(0);
  const [curlCount, setCurlCount] = useState(0); // Bicep curl counter
  const [squatState, setSquatState] = useState("Up");
  const [pushUpState, setPushUpState] = useState("Up");
  const [crunchState, setCrunchState] = useState("Up");
  const [curlState, setCurlState] = useState("Down"); // State for curl
  const [feedbackMessage, setFeedbackMessage] = useState(
    "Perform your exercises!"
  );
  const [isError, setIsError] = useState(false);


  useEffect(() => {
    if (location.state?.exerciseName) {
      setWorkoutType(location.state.exerciseName);
      console.log(workoutType);
    }
  }, [location]);

  useEffect(() => {
    if (startClick) {
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
        setStartTime(Date.now()); // Record the start time when workout begins
      };

      initializePoseLandmarker();
    }
  }, [startClick]);

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
          const results = await poseLandmarker.detectForVideo(
            videoElement,
            performance.now()
          );

          if (results.landmarks.length > 0) {
            // User detected in frame
            setFeedbackMessage("Great job! Keep going!");
            setIsError(false);
            canvasCtx.clearRect(
              0,
              0,
              canvasElement.width,
              canvasElement.height
            );
            canvasCtx.drawImage(
              videoElement,
              0,
              0,
              canvasElement.width,
              canvasElement.height
            );

            results.landmarks.forEach((landmarks) => {
              // Draw landmarks
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

              // 🔥 Call activity detection functions
              if (workoutType == "Squats") detectSquats(landmarks);
              if (workoutType == "Push Ups") detectPushUps(landmarks);
              if (workoutType == "Crunches") detectCrunches(landmarks);
              if (workoutType == "Bicep Curls") detectCurls(landmarks); // Detect curls
            });
          } else {
            // User not detected
            setFeedbackMessage("Please make sure you're visible in the frame.");
            // Optionally, you could also set a state for error detection to dynamically adjust the styling
            setIsError(true);  // Add a state to manage error styling
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
  }, [poseLandmarker, workoutType]);

  // HANDLE SUBMIT

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Stop the camera stream
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop()); // Stop each track
      videoRef.current.srcObject = null; // Clear the source object
    }

    // Clear the PoseLandmarker
    setPoseLandmarker(null);
    setStartClick(false);

    const endTime = Date.now(); // Capture the time when the workout ends
    const duration = (endTime - startTime) / 1000; // Calculate elapsed time in seconds
    setElapsedTime(duration); // Update elapsed time state

    // Log the workout data
    let reps;
    switch (workoutType) {
      case "Squats":
        reps = squatCount;
        break;
      case "Bicep Curls":
        reps = curlCount;
        break;
      case "Push Ups":
        reps = pushUpCount;
        break;
      case "Crunches":
        reps = crunchCount;
        break;
      default:
        reps = 0;
        console.warn("Unknown workout type:", workoutType);
    }
    const response = await axios.post(
      `${USER_API_END_POINT}/workout`,
      {
        userId: user.id,
        workoutType,
        duration,
        reps,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log(reps, workoutType, duration);
    console.log(response.data);
  };

  // Function to detect squats
  const detectSquats = (landmarks) => {
    const hip = landmarks[23]; // Left hip
    const knee = landmarks[25]; // Left knee
    const ankle = landmarks[27]; // Left ankle
    // console.log(landmarks);

    const angle = calculateAngle(hip, knee, ankle);

    setSquatState((prev) => {
      if (angle < 90 && prev === "Up") {
        return "Down"; // Update state
      } else if (angle > 100 && prev === "Down") {
        setSquatCount((prev) => prev + 1); // Increment count
        return "Up"; // Reset state
      }
      return prev;
    });
  };

  // Function to detect push-ups
  const detectPushUps = (landmarks) => {
    const shoulder = landmarks[12]; // Right shoulder
    const elbow = landmarks[14]; // Right elbow
    const wrist = landmarks[16]; // Right wrist

    const angle = calculateAngle(shoulder, elbow, wrist);

    setPushUpState((prev) => {
      if (angle < 90 && prev === "Up") {
        return "Down"; // Detect push-up down position
      } else if (angle > 160 && prev === "Down") {
        setPushUpCount((prev) => prev + 1); // Increment push-up count
        return "Up"; // Reset state
      }
      return prev;
    });
  };

  const detectCrunches = (landmarks) => {
    const shoulder = landmarks[11]; // Left shoulder
    const hip = landmarks[24]; // Left hip
    const knee = landmarks[26]; // Left knee

    // Calculate the angle between shoulder, hip, and knee
    const angle = calculateAngle(shoulder, hip, knee);

    setCrunchState((prev) => {
      if (angle < 90 && prev === "Up") {
        return "Down"; // Crunch down
      } else if (angle > 100 && prev === "Down") {
        setCrunchCount((prev) => prev + 1); // Increment crunch count
        return "Up"; // Reset state
      }
      return prev; // Keep the current state if no change
    });
  };

  // Function to detect bicep curls
  const detectCurls = (landmarks) => {
    const shoulder = landmarks[12]; // Right shoulder
    const elbow = landmarks[14]; // Right elbow
    const wrist = landmarks[16]; // Right wrist

    const angle = calculateAngle(shoulder, elbow, wrist);

    const thresholdUp = 50;
    const thresholdDown = 100;
    //console.log(angle,      curlState);

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
    const radians =
      Math.atan2(C.y - B.y, C.x - B.x) - Math.atan2(A.y - B.y, A.x - B.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180) angle = 360 - angle;
    return angle;
  };

  return (
    <>
    
    <div className="bg-gradient-to-bl from-gray-600 to-gray-900">
      <div className="text-center flex flex-col">
      <div className="flex flex-row">
        <video ref={videoRef} className="input_video" hidden />
        {
          <canvas
            ref={canvasRef}
            className=" h-[600px] w-[800px] m-4 border-2 border-green-200 rounded-xl mx-auto"
          />
        }

<div className="relative m-auto  bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600  rounded-3xl p-6 shadow-2xl backdrop-blur-lg">
          <form onSubmit={handleSubmit} className="my-4 mx-8">
            <select
  className="bg-gradient-to-r from-gray-800 to-blue-900 text-white font-bold text-lg py-3 px-6 rounded-lg "
  value={workoutType}
              onChange={(e) => setWorkoutType(e.target.value)}
            >
              <option className="bg-black" value="Bicep Curls">Bicep Curls</option>
              <option className="bg-black" value="Push Ups">Push-Ups</option>
              <option className="bg-black" value="Squats">Squats</option>
              <option className="bg-black" value="Crunches">Crunches</option>
            </select>


            <h2 className="text-2xl font-semibold text-gray-800 dark:text-black mb-4">
              Workout Time:{" "}
              <span className={`font-bold ${elapsedTime ? 'text-green-500' : 'text-red-500'}`}>
                {elapsedTime ? `${elapsedTime.toFixed(2)} seconds` : "N/A"}
              </span>
            </h2>

            {workoutType == "Squats" && (
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-black mb-4">
                Squat Count:{" "}
                <span className="text-blue-900 font-bold text-2xl">{squatCount}</span>
              </h2>
            )}

            {workoutType == "Push Ups" && (
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-black mb-4">
                Push-Up Count:{" "}
                <span className="text-blue-900 font-bold text-2xl">{pushUpCount}</span>
              </h2>
            )}

            {workoutType == "Crunches" && (
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-black mb-4">
                Crunch Count:{" "}
                <span className="text-blue-900 font-bold text-2xl">{crunchCount}</span>
              </h2>
            )}

            {workoutType == "Bicep Curls" && (
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-black mb-4">
                Bicep Curl Count:{" "}
                <span className="text-blue-900 font-bold text-2xl">{curlCount}</span>
              </h2>
            )}

            <h3
              className={`text-xl font-semibold mt-4 p-4 rounded-lg border-2 border-solid ${isError ? "text-black  border-red-500 bg-red-500" : "text-white border-green-500 bg-green-500"
                } bg-opacity-20 w-full max-w-xs`}
            >
              {feedbackMessage}
            </h3>


          </form>
          <div className="">
      {!poseLandmarker ? (
        <button
          onClick={() => setStartClick(true)}
          className="w-auto mx-auto border-2 border-blue-500 bg-blue-500 text-white rounded-full px-6 py-3 text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
        >
          Start
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          className="w-[100px] mx-auto border-2 border-red-500 bg-red-500 text-white rounded-full px-6 py-3 text-lg font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300"
        >
          End
        </button>
      )}{" "}
      </div>
        </div>


      </div>
      
      
    </div>
    </div>
    <Footer />
    </>
  );
};

export default MediaPose;
