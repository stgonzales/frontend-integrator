import { useEffect, useRef } from "react";
import styles from "./App.module.css";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null!);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", () => {
          video.play();
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => getVideo(), [videoRef]);

  return (
    <div className={styles.webcam}>
      <video ref={videoRef}></video>
    </div>
  );
}

export default App;
