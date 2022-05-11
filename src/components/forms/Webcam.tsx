import { useCallback, useEffect, useRef, useState } from "react";
import * as blazeface from "@tensorflow-models/blazeface";
import { div } from "@tensorflow/tfjs-core";

function Webcam() {
  const videoRef = useRef<HTMLVideoElement>(null!);
  const faceRef = useRef<HTMLCanvasElement>(null!);
  const photoRef = useRef<HTMLCanvasElement>(null!);
  const [hasPhoto, setHasPhoto] = useState();
  const [hasWebcam, setHasWebcam] = useState(true);

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("photo", data.file[0]);

    const res = await axios.post(
      "http://localhost:5000/api/save-file",
      formData,
      {}
    );
    console.log(res);
  };

  const detectFaces = async () => {
    //load model
    const model = await blazeface.load();
    const predictions = await model.estimateFaces(videoRef.current, false);

    //create canvas context
    const { videoWidth, videoHeight } = videoRef.current;
    faceRef.current.width = videoWidth;
    faceRef.current.height = videoHeight;
    const ctx = faceRef.current.getContext("2d");

    //draw face marks where exists
    if (ctx) {
      ctx.rect(0, 0, videoWidth, videoHeight);

      if (predictions.length > 1) {
        ctx.fillStyle = "rgba(250, 37, 37, 0.2)";
        ctx.fillRect(0, 0, videoWidth, videoHeight);
      } else {
        ctx.clearRect(0, 0, videoWidth, videoHeight);
      }

      predictions.forEach((prediction) => {
        const start: any = prediction.topLeft;
        const end: any = prediction.bottomRight;
        const size = [end[0] - start[0], end[1] - start[1]];

        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = predictions.length > 1 ? "red" : "green";
        ctx.rect(start[0] - 10, start[1] - 70, size[0] + 10, size[1] + 70);
        ctx.stroke();
      });
    }
  };

  //load webcam
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", async () => {
          video.play();
          setInterval(() => detectFaces(), 100);
        });
      })
      .catch((err) => setHasWebcam(false));
  };

  const captureSelfie = () => {
    const canvasWidth = videoRef.current.width;
    const canvasHeight = videoRef.current.height;
    const ctx = faceRef.current.getContext("2d");
    ctx?.drawImage(videoRef.current, 0, 0, canvasWidth, canvasHeight);
  };

  useEffect(() => getVideo(), []);

  return (
    <>
      {hasWebcam ? (
        <div>
          {hasPhoto ? (
            <div>
              <canvas ref={photoRef}></canvas>
            </div>
          ) : (
            <div>
              <video ref={videoRef}></video>
              <canvas ref={faceRef}></canvas>

              <button
                onClick={() => {
                  captureSelfie();
                }}
              >
                /
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>
          Oops, parece que voce nao tem um dispositivo de video ou esta pagina
          nao tem autorizacao!
        </p>
      )}
    </>
  );
}

export default Webcam;
