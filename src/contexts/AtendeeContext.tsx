import axios from "axios";
import { createContext, FormEvent, ReactNode, useState } from "react";

type AtendeeContextProps = {
  children: ReactNode;
};

type AtendeeContextType = {
  atendee: Atendee;
  validTicket: boolean;
  validImage: boolean;
  image: BufferSource | null;
  handleAtendee: (email: string, orderId: string) => void;
};

type Atendee = {
  name: string;
  email: string;
  order_id: string;
};

const initialValue = {
  atendee: {
    name: "",
    email: "",
    order_id: "",
  },
  validTicket: false,
  validImage: false,
  image: null,
  handleAtendee: () => {},
};

export const AtendeeContext = createContext<AtendeeContextType>(initialValue);

export const AtendeeContextProvider = ({ children }: AtendeeContextProps) => {
  const [validTicket, setValidTicket] = useState(initialValue.validTicket);
  const [validImage, setValidImage] = useState(initialValue.validImage);
  const [atendee, setAtendee] = useState(initialValue.atendee);
  const [image, setImage] = useState(initialValue.image);

  const handleAtendee = async (email: string, orderId: string) => {
    try {
      const res = await axios.post("http://localhost:5000/api/check-details", {
        email,
        ticket_number: orderId,
      });

      setAtendee({
        name: res.data[0].nome,
        email: res.data[0].email,
        order_id: res.data[0].n_folha,
      });

      setValidTicket(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AtendeeContext.Provider
      value={{ validTicket, validImage, atendee, image, handleAtendee }}
    >
      {children}
    </AtendeeContext.Provider>
  );
};
