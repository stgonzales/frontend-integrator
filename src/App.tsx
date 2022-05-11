import { useContext } from "react";

import { AppContext } from "./contexts/AppContext";
import { AtendeeContext } from "./contexts/AtendeeContext";

import Controls from "./components/Controls";
import Steps from "./components/Steps";
import { Form, MediaInput } from "./components/forms";

function App() {
  const { steps, currentStep } = useContext(AppContext);
  const { atendee, validTicket } = useContext(AtendeeContext);

  const displayStep = (step: number) => {
    if (step === 0) return <Form />;
    if (step === 1 && validTicket) return <MediaInput />;
  };

  return (
    <>
      <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
        {currentStep <= steps.length && (
          <div className="container horizontal mt-5">
            <Steps />
          </div>
        )}
        <div className="container mx-auto uppercase text-gray-600 font-semibold">
          {displayStep(currentStep)}
        </div>
        {currentStep <= steps.length && <Controls />}
      </div>
      <p>{atendee.name}</p>
      <p>{atendee.email}</p>
      <p>{atendee.order_id}</p>
    </>
  );
}

export default App;
