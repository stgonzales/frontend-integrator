import { useEffect, useRef } from "react";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null!);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 720, height: 480 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video?.play();
      });
  };

  useEffect(() => getVideo(), [videoRef]);

  return (
    <div className="App">
      <div className="camera">
        <video ref={videoRef}></video>
      </div>
    </div>
  );
}

export default App;
