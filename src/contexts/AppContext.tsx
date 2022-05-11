import { createContext, ReactNode, useState } from "react";

export type AppContextProps = {
  children: ReactNode;
};

export type AppContextType = {
  steps: StepsType[];
  currentStep: number;
  updateSteps: (stepNumber: number, stepState: StepsType[]) => StepsType[];
  handleNextStep: () => void;
};

export type StepsType = {
  step: number;
  description: string;
  completed: boolean;
  hightlighted: boolean;
  selected: boolean;
};

const initialValue = {
  currentStep: 0,
  steps: [
    {
      step: 0,
      description: "Check Details",
      completed: false,
      hightlighted: false,
      selected: false,
    },
    {
      step: 1,
      description: "Selfie Time",
      completed: false,
      hightlighted: false,
      selected: false,
    },
    {
      step: 2,
      description: "Confirmation",
      completed: false,
      hightlighted: false,
      selected: false,
    },
  ],
  updateSteps: () => [],
  handleNextStep: () => {},
};

export const AppContext = createContext<AppContextType>(initialValue);

export const AppContextProvider = ({ children }: AppContextProps) => {
  const [steps, setSteps] = useState(initialValue.steps);
  const [currentStep, setCurrentStep] = useState(initialValue.currentStep);

  const updateSteps = (stepNumber: number, stepState: StepsType[]) => {
    const newSteps = stepState;
    for (let i = 0; i < newSteps.length; i++) {
      if (i === stepNumber) {
        newSteps[i] = {
          ...newSteps[i],
          hightlighted: true,
          selected: true,
          completed: true,
        };
      } else if (i < stepNumber) {
        newSteps[i] = {
          ...newSteps[i],
          hightlighted: false,
          selected: true,
          completed: true,
        };
      } else {
        newSteps[i] = {
          ...newSteps[i],
          hightlighted: false,
          selected: false,
          completed: false,
        };
      }
    }

    return newSteps;
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <AppContext.Provider
      value={{ steps, currentStep, updateSteps, handleNextStep }}
    >
      {children}
    </AppContext.Provider>
  );
};
