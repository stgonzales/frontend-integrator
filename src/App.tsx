import "@tensorflow/tfjs-backend-webgl"
import * as blazeface from '@tensorflow-models/blazeface'
import { useEffect, useRef } from "react";
import styles from "./App.module.css";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null!);
  const canvasRef = useRef<HTMLCanvasElement>(null!)

  const detectFaces = async () => {
    const model = await blazeface.load()
    const predictions = await model.estimateFaces(videoRef.current, false)
    const ctx = canvasRef.current.getContext("2d")

    const { videoWidth, videoHeight } = videoRef.current

    videoRef.current.width = videoWidth
    videoRef.current.height = videoHeight

    if(ctx){

      ctx.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight)
      
      predictions.forEach( prediction => {
        const start: any = prediction.topLeft;
        const end: any = prediction.bottomRight;
        const size = [end[0] - start[0], end[1] - start[1]];
        
        ctx.beginPath()
        ctx.lineWidth = 4
        ctx.strokeStyle = "green"
        ctx.rect(
          start[0] - 10, start[1] - 70, size[0] + 10, size[1] + 70
        )
        ctx.stroke()
      })
    }
  }

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", async () => {
          video.play();          
          setInterval(() => detectFaces(), 100)
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => getVideo(), [videoRef]);

  return (
    <div className={styles.webcam}>
      <video ref={videoRef} style={{display: "none"}}></video>
      <canvas ref={canvasRef} width={640} height={480}></canvas>
    </div>
  );
}

export default App;
