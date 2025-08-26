import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [qrCode, setQrCode] = useState("");
  const navigate = useNavigate();

  const generateQRCode = async () => {
    try {
      const response = await axios.post("http://localhost:3000/generate-qr", {
        userId,
        name,
      });
      setQrCode(response.data.qrCodeImage);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  return (
    <div className="home-container">
      <div className="form-card">
        <h1 className="title">✨ QR Code Generator ✨</h1>

        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={generateQRCode} className="btn">Generate QR Code</button>

        {qrCode && (
          <div className="qr-container">
            <h2>✅ Generated QR Code:</h2>
            <img src={qrCode} alt="QR Code" />
          </div>
        )}

        <button onClick={() => navigate("/scan")} className="btn scan-btn">
          Go to QR Scanner 🚀
        </button>
      </div>
    </div>
  );
};

export default Home;
