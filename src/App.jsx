import { useRef } from "react";
import Webcam from "react-webcam";

function App() {
  const webcamRef = useRef(null);

  return (
    <div style={{
      textAlign: 'center',
      fontFamily: 'cursive',
      padding: '2rem',
      backgroundColor: '#fff0f5',
      minHeight: '100vh'
    }}>
      <h1>📸 Cute Photobooth</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{ borderRadius: '20px', marginTop: '1rem' }}
      />
      <p style={{ marginTop: '1rem' }}>Say cheese! 🧀</p>
    </div>
  );
}

export default App;
