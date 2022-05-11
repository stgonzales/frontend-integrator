import { useContext, useEffect, useRef, useState } from "react";
import { AppContext, StepsType } from "../contexts/AppContext";
import Step from "./Step";

function Steps() {
  const { steps, currentStep, updateSteps } = useContext(AppContext);
  const [newSteps, setNewSteps] = useState<StepsType[]>([]);
  const stepsRef = useRef<StepsType[]>();

  useEffect(() => {
    const stepsState = steps.map((step, index) => {
      if (index === 0) {
        step.hightlighted = true;
        step.selected = true;
        return step;
      } else {
        step.hightlighted = false;
        step.selected = false;
        return step;
      }
    });

    stepsRef.current = stepsState;
    const current = updateSteps(currentStep - 1, stepsRef.current);
    setNewSteps(current);
  }, [steps, currentStep]);

  return (
    <div className="mx-4 p-4 flex justify-between items-center">
      {newSteps.map((step, idx) => (
        <div
          key={idx}
          className={
            idx !== newSteps.length - 1
              ? "w-full flex items-center"
              : "flex items-center"
          }
        >
          <Step {...step} />
          <div
            className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
              step.completed
                ? "border-blue-600 border-solid"
                : "border-gray-300 border-dashed"
            }`}
          ></div>
        </div>
      ))}
    </div>
  );
}

export default Steps;
