"use client";

import React, { useState, useEffect } from "react";
import saveAs from "file-saver";
import QRCode from "react-qr-code";
import JSZip from "jszip";
import ReactDOM from "react-dom";

interface InfoType {
  name: string;
  age: string;
  affiliation: string;
}

const QRGenerator = () => {
  const [jsonData, setJsonData] = useState<InfoType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/convert");
        if (response.ok) {
          const data = await response.json();
          setJsonData(data);
          console.log("데이터", data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // QR 코드를 문자열로 반환
  const generateQRCodeSVG = (name: string) => {
    const qrCode = <QRCode value={name} />;
    const container = document.createElement("div");

    ReactDOM.render(qrCode, container);

    return container.innerHTML;
  };

  // 문자열로 된 QR 코드를 Blob으로 반환
  const saveQRCode = (name: string) => {
    const svgString = generateQRCodeSVG(name);

    if (!svgString) return;

    return new Blob([svgString], { type: "image/svg+xml" });
  };

  // svg 파일들을 zip 파일로 저장
  const saveAsZip = async () => {
    if (!jsonData || jsonData.length === 0) {
      return;
    }

    const zip = new JSZip();

    for (let index = 0; index < jsonData.length; index++) {
      const el = jsonData[index];
      const file = await saveQRCode(el.name);

      if (file) {
        zip.file(`qrcode_${index}.svg`, file);
      }
    }

    const content = await zip.generateAsync({ type: "blob" });

    saveAs(content, "qrcodes.zip");
  };

  return (
    <div>
      {jsonData && (
        <div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {jsonData.map((el, index) => (
              <QRCode
                key={index}
                value={el.name}
                style={{ margin: "10px", width: "100px" }}
              />
            ))}
          </div>
          <button
            onClick={saveAsZip}
            className="bg-black text-white p-5 rounded-lg"
          >
            Save QR Codes as Zip
          </button>
        </div>
      )}
    </div>
  );
};

export default QRGenerator;
