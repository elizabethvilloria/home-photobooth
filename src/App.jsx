import { useRef, useState } from "react";
import Webcam from "react-webcam";

function App() {
  const webcamRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [countdown, setCountdown] = useState(0);

  const videoConstraints = {
    facingMode: "user",
  };

  const handleTakePhotoStrip = () => {
    let countdownStart = 3;
    let tempPhotos = [];
  
    const takeSinglePhoto = (delay) => {
      setTimeout(() => {
        let count = countdownStart;
        setCountdown(count);
        const countdownInterval = setInterval(() => {
          count--;
          if (count === 0) {
            clearInterval(countdownInterval);
            setCountdown(0);
            const imageSrc = webcamRef.current.getScreenshot();
            tempPhotos.push(imageSrc);
  
            if (tempPhotos.length === 3) {
              setPhotos(tempPhotos);
            }
          } else {
            setCountdown(count);
          }
        }, 1000);
      }, delay);
    };
  
    takeSinglePhoto(0);      // First photo immediately
    takeSinglePhoto(4000);   // Second photo after 4s
    takeSinglePhoto(8000);   // Third photo after 8s
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

      {photos.length === 0 ? (
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
          <div style={{ marginTop: '1rem' }}>
            {photos.map((p, i) => (
              <img
                key={i}
                src={p}
                alt={`Captured ${i + 1}`}
                style={{
                  borderRadius: '10px',
                  margin: '0.5rem 0',
                  width: '100%',
                  maxWidth: '300px',
                  transform: 'scaleX(-1)'
                }}
              />
            ))}
            <div style={{ marginTop: '1rem' }}>
            <button onClick={handleTakePhotoStrip} style={buttonStyle}>
              📸 Take 3-Photo Strip
            </button>

            </div>
          </div>

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
