import { useRef, useState } from "react";
import Webcam from "react-webcam";

function App() {
  const webcamRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [countdown, setCountdown] = useState(0);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [showFlash, setShowFlash] = useState(false);

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

          // Blink!
          setShowFlash(true);
          setTimeout(() => setShowFlash(false), 100);

          if (count === 0) {
            clearInterval(countdownInterval);
            setCountdown(0);
            const imageSrc = webcamRef.current.getScreenshot();
            tempPhotos.push(imageSrc);
            setCurrentPhoto(imageSrc);

            setTimeout(() => {
              setCurrentPhoto(null);
              if (tempPhotos.length === 3) {
                setPhotos(tempPhotos);
              }
            }, 1000);
          } else {
            setCountdown(count);
          }
        }, 1000);
      }, delay);
    };

    takeSinglePhoto(0);
    takeSinglePhoto(4000);
    takeSinglePhoto(8000);
  };

  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "cursive",
        padding: "2rem",
        backgroundColor: "#fff0f5",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <h1>📸 Cute Photobooth</h1>

      {showFlash && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "white",
            opacity: 0.7,
            zIndex: 999,
          }}
        />
      )}

      {currentPhoto && (
        <img
          src={currentPhoto}
          alt="Preview"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) scaleX(-1)",
            borderRadius: "10px",
            width: "100%",
            maxWidth: "300px",
            zIndex: 1000,
          }}
        />
      )}

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
              transform: "scaleX(-1)",
            }}
          />
          <div style={{ marginTop: "1rem" }}>
            <button onClick={handleTakePhotoStrip} style={buttonStyle}>
              📷 Take 3-Photo Strip
            </button>
          </div>
        </>
      ) : (
        <>
          <div style={{ marginTop: "1rem" }}>
            {photos.map((p, i) => (
              <img
                key={i}
                src={p}
                alt={`Captured ${i + 1}`}
                style={{
                  borderRadius: "10px",
                  margin: "0.5rem 0",
                  width: "100%",
                  maxWidth: "300px",
                  transform: "scaleX(-1)",
                }}
              />
            ))}
          </div>

          <div style={{ marginTop: "1rem" }}>
            <button onClick={() => setPhotos([])} style={buttonStyle}>
              🔁 Retake Strip
            </button>
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
