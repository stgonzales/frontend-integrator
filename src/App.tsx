import { useContext } from "react";

import { AppContext } from "./contexts/AppContext";
import { AtendeeContext } from "./contexts/AtendeeContext";

import Controls from "./components/Controls";
import Steps from "./components/Steps";
import { Form, MediaInput } from "./components/forms";
import Loading from "./components/Loading";
import Confirmation from "./components/Confirmation";

function App() {
  const { steps, currentStep, isLoading } = useContext(AppContext);

  const displayStep = (step: number) => {
    if (step === 0) return <Form />;
    if (step === 1) return <MediaInput />;
    if (step === 2) return <Confirmation />;
  };

  return (
    <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
      {currentStep <= steps.length && (
        <div className="container horizontal mt-5">
          <Steps />
        </div>
      )}
      <div className="container mx-auto uppercase text-gray-600 font-semibold">
        {isLoading ? <Loading /> : displayStep(currentStep)}
      </div>
      {currentStep !== 1 && <Controls />}
    </div>
  );
}

export default App;
