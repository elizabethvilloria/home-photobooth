import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

function App() {
  const webcamRef = useRef(null);
  const [facingMode, setFacingMode] = useState("user"); // 'user' = front cam, 'environment' = back cam
  const [photo, setPhoto] = useState(null);

  const videoConstraints = {
    facingMode: facingMode,
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
  }, [webcamRef]);

  const flipCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  return (
    <div style={{
      textAlign: 'center',
      fontFamily: 'cursive',
      padding: '2rem',
      backgroundColor: '#fff0f5',
      minHeight: '100vh'
    }}>
      <h1>📸 Cute Photobooth</h1>

      {!photo ? (
        <>
          <Webcam
              key={facingMode}  // 👈 this forces re-render
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode }}
              style={{ borderRadius: '20px', marginTop: '1rem', width: '100%', maxWidth: '400px' }}
            />

          <div style={{ marginTop: '1rem' }}>
            <button onClick={capture} style={buttonStyle}>📷 Take Photo</button>
            <button onClick={flipCamera} style={{ ...buttonStyle, marginLeft: '1rem' }}>
              🔄 Flip Camera
            </button>
          </div>
        </>
      ) : (
        <>
          <img src={photo} alt="Captured" style={{ borderRadius: '20px', marginTop: '1rem', width: '100%', maxWidth: '400px' }} />
          <div style={{ marginTop: '1rem' }}>
            <button onClick={() => setPhoto(null)} style={buttonStyle}>🔁 Retake</button>
          </div>
        </>
      )}
    </div>
  );
}

const buttonStyle = {
  padding: '0.8rem 1.5rem',
  fontSize: '1rem',
  borderRadius: '10px',
  border: 'none',
  backgroundColor: '#ffb6c1',
  color: 'white',
  cursor: 'pointer'
};

export default App;
