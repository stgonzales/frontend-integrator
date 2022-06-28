import axios from "axios";
import {
  BaseSyntheticEvent,
  SyntheticEvent,
  useContext,
  useRef,
  useState,
} from "react";
import { AppContext } from "../../contexts/AppContext";
import { AtendeeContext } from "../../contexts/AtendeeContext";
import { BlobToHTMLImageEl, FileToBlob, validateMedia } from "../../utils";

function MediaInput() {
  const { handleNextStep, handleLoading } = useContext(AppContext);
  const { handleSetImage } = useContext(AtendeeContext);

  const handleFileUpload = async (e: BaseSyntheticEvent) => {
    handleLoading(true);
    const blob = await FileToBlob(e.target.files[0]);
    const imageEl = await BlobToHTMLImageEl(blob);
    const result = await validateMedia(imageEl);

    if (result.length === 1) {
      if (result[0].probability[0] >= 0.99) {
        handleSetImage(blob);
        handleNextStep();
        handleLoading(false);
      }
    }
  };

  return (
    <div className="my-10 p-10 flex flex-col justify-center items-center gap-6">
      <div className="p-4 relative w-60 text-center mx-auto bg-blue-500 border rounded-xl">
        <span className="relative z-0 inline-block w-full cursor-pointer text-white">
          Selecione uma foto
        </span>
        <input
          className="inline-block absolute z-10 w-full h-12 top-0 left-0 cursor-pointer opacity-0"
          type="file"
          name="upload"
          id="upload"
          accept="image/*"
          onChange={handleFileUpload}
        />
      </div>
      <span>ou</span>
      <button className="bg-blue-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out">
        tire uma selfie
      </button>
    </div>
  );
}

export default MediaInput;
