import { FormEvent, useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { AtendeeContext } from "../../contexts/AtendeeContext";

export default function Form() {
  const { handleSetAtendee } = useContext(AtendeeContext);
  const { handleNextStep, handleLoading } = useContext(AppContext);
  const [email, setName] = useState("");
  const [orderId, setOrderId] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleLoading(true);
    handleSetAtendee(email, orderId);
    handleLoading(false);
    handleNextStep();
  };

  return (
    <>
      <form
        id="check-details"
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center py-6"
      >
        <div className="w-10/12 flex flex-col">
          <label htmlFor="ticket_number">numero do ticket</label>
          <input
            type="text"
            name="ticket_number"
            id="ticket_number"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="border rounded-lg mb-4 h-12"
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg mb-4 h-12"
          />
        </div>
      </form>
    </>
  );
}
