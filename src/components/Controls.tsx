import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function Controls() {
  const { currentStep, steps } = useContext(AppContext);
  return (
    <div className="container flex justify-around mt-4 mb8">
      <button
        form="check-details"
        type="submit"
        className="bg-blue-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
      >
        {currentStep <= steps.length - 1 ? "Next" : "Finish"}
      </button>
    </div>
  );
}

export default Controls;
