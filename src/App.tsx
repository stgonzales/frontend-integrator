import "@tensorflow/tfjs-backend-webgl"
import * as blazeface from '@tensorflow-models/blazeface'
import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null!);
  const canvasRef = useRef<HTMLCanvasElement>(null!)
  const [accuracy, setAccuracy] = useState([])

  const detectFaces = async () => {
    //load model
    const model = await blazeface.load()
    const predictions = await model.estimateFaces(videoRef.current, false)
    
    //create canvas context
    const { videoWidth, videoHeight } = videoRef.current
    canvasRef.current.width = videoWidth
    canvasRef.current.height = videoHeight
    const ctx = canvasRef.current.getContext("2d")

    //draw face marks where exists
    if(ctx){

      ctx.rect(0, 0, videoWidth, videoHeight)

      if(predictions.length > 1) {
        ctx.fillStyle = "rgba(250, 37, 37, 0.2)"
        ctx.fillRect(0, 0, videoWidth, videoHeight)
      }else {
        ctx.clearRect(0, 0, videoWidth, videoHeight)
      }
      
      predictions.forEach( prediction => {
        const start: any = prediction.topLeft;
        const end: any = prediction.bottomRight;
        const size = [end[0] - start[0], end[1] - start[1]];
        
        ctx.beginPath()
        ctx.lineWidth = 4
        ctx.strokeStyle = predictions.length > 1 ? 'red' : 'green'
        ctx.rect(
          start[0] - 10, start[1] - 70, size[0] + 10, size[1] + 70
        )
        ctx.stroke()
      })
    }
  }

  //load webcam
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", async () => {
          video.play();          
          setInterval(() => detectFaces(), 100)
        });
      })
      .catch((err) => alert('Sorry, video device not detected or permission denied!'));
  };

  useEffect(() => getVideo(), []);

  return (
    <div className={styles.webcam}>
      <video ref={videoRef}></video>
      <canvas ref={canvasRef}></canvas>
      <p>{}</p>
    </div>
  );
}

export default App;
