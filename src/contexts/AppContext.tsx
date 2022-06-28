import { createContext, ReactNode, useState } from "react";

export type AppContextProps = {
  children: ReactNode;
};

export type AppContextType = {
  steps: StepsType[];
  currentStep: number;
  isLoading: boolean;
  updateSteps: (stepNumber: number, stepState: StepsType[]) => StepsType[];
  handleNextStep: () => void;
  handleLoading: (value: boolean) => void;
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
  isLoading: false,
  steps: [
    {
      step: 0,
      description: "Validacao",
      completed: false,
      hightlighted: false,
      selected: false,
    },
    {
      step: 1,
      description: "Hora da Selfie",
      completed: false,
      hightlighted: false,
      selected: false,
    },
    {
      step: 2,
      description: "Confirmacao",
      completed: false,
      hightlighted: false,
      selected: false,
    },
  ],
  updateSteps: () => [],
  handleNextStep: () => {},
  handleLoading: () => {},
};

export const AppContext = createContext<AppContextType>(initialValue);

export const AppContextProvider = ({ children }: AppContextProps) => {
  const [steps, setSteps] = useState(initialValue.steps);
  const [currentStep, setCurrentStep] = useState(initialValue.currentStep);
  const [isLoading, setLoading] = useState(initialValue.isLoading);

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

  const handleLoading = (v: boolean) => {
    setLoading(v);
  };

  return (
    <AppContext.Provider
      value={{
        steps,
        currentStep,
        isLoading,
        updateSteps,
        handleNextStep,
        handleLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
