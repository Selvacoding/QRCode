import React, { useState } from "react";
import axios from "axios";
import './App.css'; // Import the CSS file for styling

function App() {
  const [text, setText] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleGenerateQR = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", text);

    try {
      // Post the form data to the backend to generate the QR code
      const response = await axios.post("http://localhost:8000/generate_qr/", formData, {
        responseType: "blob", // Expecting the image blob
      });

      // Create an object URL for the generated QR code image
      const imageUrl = URL.createObjectURL(new Blob([response.data]));
      setQrCodeUrl(imageUrl);
      setIsGenerated(true);  // Set flag to true when QR code is generated
    } catch (error) {
      console.error("Error generating QR code", error);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <button className="toggle-switch" onClick={toggleDarkMode}>
        Toggle Dark/Light Mode
      </button>
      <div className="content">
        <h1>QR Code Generator</h1>
        <form onSubmit={handleGenerateQR}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text for QR code"
            required
          />
          <button type="submit">
            Generate
          </button>
        </form>

        {/* Display the QR code and download link if generated */}
        {isGenerated && qrCodeUrl && (
          <div className="qr-result">
            <h3>QR Code:</h3>
            <img src={qrCodeUrl} alt="Generated QR Code" />
            <a href={qrCodeUrl} download="qr_code.png" className="download-link">
              Download QR Code
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
