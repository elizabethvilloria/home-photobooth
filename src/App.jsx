import { useRef, useState } from "react";
import Webcam from "react-webcam";

function App() {
  const webcamRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [countdown, setCountdown] = useState(0);

  const videoConstraints = {
    facingMode: "user",
  };

  const handleTakePhoto = () => {
    let count = 3;
    setCountdown(count);
    const countdownInterval = setInterval(() => {
      count--;
      if (count === 0) {
        clearInterval(countdownInterval);
        setCountdown(0);
        const imageSrc = webcamRef.current.getScreenshot();
        setPhoto(imageSrc);
      } else {
        setCountdown(count);
      }
    }, 1000);
  };

  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "cursive",
        padding: "2rem",
        backgroundColor: "#fff0f5",
        minHeight: "100vh",
      }}
    >
      <h1>📸 Cute Photobooth</h1>

      {countdown > 0 && (
        <div style={{ fontSize: "3rem", marginTop: "1rem" }}>{countdown}</div>
      )}

      {!photo ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            style={{
              borderRadius: "20px",
              marginTop: "1rem",
              width: "100%",
              maxWidth: "400px",
              transform: "scaleX(-1)", // mirror it!
            }}
          />
          <div style={{ marginTop: "1rem" }}>
            <button onClick={handleTakePhoto} style={buttonStyle}>
              📷 Take Photo
            </button>
          </div>
        </>
      ) : (
        <>
          <img
            src={photo}
            alt="Captured"
            style={{
              borderRadius: "20px",
              marginTop: "1rem",
              width: "100%",
              maxWidth: "400px",
              transform: "scaleX(-1)",
            }}
          />
          <div style={{ marginTop: "1rem" }}>
            <button onClick={() => setPhoto(null)}style={{ ...buttonStyle, marginRight: '1rem' }}> 🔁 Retake</button>
            <a href={photo} download="cute-photo.jpg" style={{ ...buttonStyle, textDecoration: 'none' }}> 💾 Download</a>
          </div>
        </>
      )}
    </div>
  );
}

const buttonStyle = {
  padding: "0.8rem 1.5rem",
  fontSize: "1rem",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#ffb6c1",
  color: "white",
  cursor: "pointer",
};

export default App;
