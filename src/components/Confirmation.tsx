import { image } from "@tensorflow/tfjs-core";
import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { AtendeeContext } from "../contexts/AtendeeContext";

function Confirmation() {
  const { imageBlob, atendee } = useContext(AtendeeContext);
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const img = new Image();

    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
    };

    img.src = URL.createObjectURL(imageBlob);
  }, []);

  const handleSubmitFile = async () => {
    const formData = new FormData();

    formData.append("photo", imageBlob);
    formData.set("fileName", `${atendee.id}-1`);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/save-file",
        formData,
        {}
      );

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="my-8 p-10">
      <div className="my-4 p-5 flex flex-col gap-2 border rounded-xl">
        <p>
          ticket: <span className="ml-2">{atendee.order_id}</span>
        </p>
        <p>
          nome: <span className="ml-2">{atendee.name}</span>
        </p>
        <p>
          email: <span className="ml-2">{atendee.email}</span>
        </p>
      </div>
      {/* <img className="border rounded-xl" src={image.src} alt={image.alt} /> */}
      <canvas ref={canvasRef}></canvas>
      <div className="my-5 flex flex-col justify-center items-center gap-6">
        <button
          onClick={handleSubmitFile}
          className="bg-blue-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
        >
          Finalizar
        </button>
      </div>
    </div>
  );
}

export default Confirmation;
