import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import jsQR from "jsqr";
import "./QRScanner.css";

const QRScanner = () => {
  const webcamRef = useRef(null);
  const [result, setResult] = useState("No result");

  const scanQR = () => {
    const video = webcamRef.current?.video;
    if (video && video.readyState === 4) {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        setResult(`QR Code: ${code.data}`);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(scanQR, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="scanner-container">
      <h1>📸 QR Code Scanner</h1>
      <Webcam ref={webcamRef} className="webcam" />
      <p>Result: <strong>{result}</strong></p>
    </div>
  );
};

export default QRScanner;
