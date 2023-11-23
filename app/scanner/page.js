"use client";

import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

const QrScanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [scannedData, setScannedData] = useState([]);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const startScanning = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        videoRef.current.srcObject = stream;

        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          requestAnimationFrame(scan);
        };

        setScanning(true);
      } catch (error) {
        console.error("Error accessing the camera", error);
      }
    };

    const scan = () => {
      if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        canvasRef.current.height = videoRef.current.videoHeight;
        canvasRef.current.width = videoRef.current.videoWidth;

        const context = canvasRef.current.getContext("2d");
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const imageData = context.getImageData(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          // Append new scanned data
          setScannedData((prevData) => [...prevData, code.data]);
        }

        // Continue scanning
        requestAnimationFrame(scan);
      } else {
        requestAnimationFrame(scan);
      }
    };

    startScanning();

    return () => {
      if (videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  console.log(scannedData);

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%" }} muted autoPlay />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div>
        {scannedData.length > 0 && (
          <div>
            <h2>Scanned Data:</h2>
            <ul>
              {scannedData.map((data, index) => (
                <li key={index}>{data}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default QrScanner;
