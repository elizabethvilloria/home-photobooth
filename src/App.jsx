import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { toPng } from "html-to-image";
import confetti from "canvas-confetti";

function App() {
  const webcamRef = useRef(null);
  const stripRef = useRef(null);
  const [photos, setPhotos] = useState([null, null, null]);
  const [countdown, setCountdown] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShooting, setIsShooting] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  
  const videoConstraints = {
    facingMode: "user",
  };

  const handleTakePhotoStrip = () => {
    setPhotos([null, null, null]);
    setIsShooting(true);
    let count = 3;

    const snapNextPhoto = (index) => {
      setCountdown(3);

      const countdownInterval = setInterval(() => {
        count--;

        if (count > 0) {
          setCountdown(count);
        } else {
          clearInterval(countdownInterval);
          setCountdown(0);

          setShowFlash(true);
          setTimeout(() => setShowFlash(false), 100);

          const imageSrc = webcamRef.current.getScreenshot();
          setPhotos((prev) => {
            const updated = [...prev];
            updated[index] = imageSrc;
            return updated;
          });

          if (index < 2) {
            setTimeout(() => {
              setCurrentIndex((i) => i + 1);
              snapNextPhoto(index + 1);
            }, 1000);
          } else {
            setIsShooting(false);

            // 🎉 Confetti!
            confetti();
            setTimeout(() => confetti(), 300);
            setTimeout(() => confetti(), 600);
          }
        }
      }, 1000);
    };

    setCurrentIndex(0);
    snapNextPhoto(0);
  };

  const handleDownloadStrip = () => {
    if (stripRef.current) {
      toPng(stripRef.current).then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "cute-photobooth-strip.png";
        link.href = dataUrl;
        link.click();
      });
    }
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

      {photos.every((p) => p === null) || isShooting ? (
        <>
          <div style={{ position: "relative", display: "inline-block" }}>
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
            {showFlash && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "white",
                  opacity: 0.7,
                  borderRadius: "20px",
                }}
              />
            )}
          </div>

          {!isShooting && (
            <div style={{ marginTop: "1rem" }}>
              <button onClick={handleTakePhotoStrip} style={buttonStyle}>
                📷 Take 3-Photo Strip
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <div ref={stripRef} style={{ marginTop: "1rem" }}>
            <h2
              style={{
                marginBottom: "1rem",
                fontFamily: "cursive",
                color: "#ff69b4",
              }}
            >
              Cute Photobooth 💕
            </h2>
            {photos.map((p, i) => (
              <div
                key={i}
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  margin: "0.5rem auto",
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                  boxShadow: "0 0 8px rgba(0,0,0,0.1)",
                }}
              >
                {p ? (
                  <img
                    src={p}
                    alt={`Photo ${i + 1}`}
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      transform: "scaleX(-1)",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      padding: "4rem 0",
                      color: "#aaa",
                      fontStyle: "italic",
                    }}
                  >
                    Waiting...
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: "1rem" }}>
            <button onClick={handleTakePhotoStrip} style={buttonStyle}>
              🔁 Retake Strip
            </button>
            <button
              onClick={handleDownloadStrip}
              style={{ ...buttonStyle, marginLeft: "1rem" }}
            >
              💾 Download Strip
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
