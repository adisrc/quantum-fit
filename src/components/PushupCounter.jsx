import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";

const PushupCounter = ({ webcamRef, canvasRef }) => {
  const [pushupCount, setPushupCount] = useState(0);
  const prevPosition = useRef(null);

  useEffect(() => {
    const runPosenet = async () => {
      const net = await posenet.load({
        inputResolution: { width: 640, height: 480 },
        scale: 0.8,
      });

      setInterval(() => {
        detect(net);
      }, 500);
    };

    runPosenet();
  }, []);

  const detect = async (net) => {
    if (
      webcamRef.current &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      const pose = await net.estimateSinglePose(video);
      const keypoints = pose.keypoints;
      const leftShoulder = keypoints.find(p => p.part === "leftShoulder");
      const rightShoulder = keypoints.find(p => p.part === "rightShoulder");
      const leftElbow = keypoints.find(p => p.part === "leftElbow");
      const rightElbow = keypoints.find(p => p.part === "rightElbow");

      if (leftShoulder && rightShoulder && leftElbow && rightElbow) {
        const avgShoulderY = (leftShoulder.position.y + rightShoulder.position.y) / 2;
        const avgElbowY = (leftElbow.position.y + rightElbow.position.y) / 2;

        if (avgElbowY > avgShoulderY + 20) {
          if (prevPosition.current === "up") {
            setPushupCount(prevCount => prevCount + 1);
          }
          prevPosition.current = "down";
        } else {
          prevPosition.current = "up";
        }
      }
    }
  };

  return (
    <h1 style={{
      position: "absolute",
      top: 10,
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: "24px",
      color: "white",
      backgroundColor: "black",
      padding: "10px",
      borderRadius: "10px"
    }}>
      Push-ups: {pushupCount}
    </h1>
  );
};

export default PushupCounter;
