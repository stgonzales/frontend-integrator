import React, { ReactComponentElement } from "react";

export interface StepProps {
  step: number;
  component?: JSX.Element;
  description: string;
  completed: boolean;
  hightlighted: boolean;
  selected: boolean;
}

function Step(props: StepProps) {
  const { step, description, selected, hightlighted, completed } = props;
  return (
    <div className="relative flex flex-col items-center text-teal-600">
      <div
        className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 ${
          selected
            ? "bg-blue-600 text-white font-bold border border-blue-600"
            : ""
        }`}
      >
        {completed ? (
          <span className="text-white font-bold text-xl">&#10003;</span>
        ) : (
          step + 1
        )}
      </div>
      <div
        className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase ${
          hightlighted ? "text-gray-900" : "text-gray-400"
        }`}
      >
        {description}
      </div>
    </div>
  );
}

export default Step;
