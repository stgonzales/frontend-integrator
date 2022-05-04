import { useEffect, useRef } from "react";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null!);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 720, height: 480 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play().then(_=>{}).catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  useEffect(() => getVideo(), [videoRef]);

  return <video ref={videoRef}></video>
}

export default App;
