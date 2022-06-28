import axios from "axios";
import { createContext, ReactNode, useState } from "react";

type AtendeeContextProps = {
  children: ReactNode;
};

type AtendeeContextType = {
  atendee: Atendee;
  validTicket: boolean;
  validImage: boolean;
  imageBlob: Blob;
  handleSetAtendee: (email: string, orderId: string) => void;
  handleSetImage: (blob: Blob) => void;
};

type Atendee = {
  name: string;
  email: string;
  order_id: string;
  id: string;
};

const initialValue = {
  atendee: {
    name: "",
    email: "",
    order_id: "",
    id: "",
  },
  validTicket: false,
  validImage: false,
  imageBlob: new Blob(),
  handleSetAtendee: () => {},
  handleSetImage: () => {},
};

export const AtendeeContext = createContext<AtendeeContextType>(initialValue);

export const AtendeeContextProvider = ({ children }: AtendeeContextProps) => {
  const [validTicket, setValidTicket] = useState(initialValue.validTicket);
  const [validImage, setValidImage] = useState(initialValue.validImage);
  const [atendee, setAtendee] = useState(initialValue.atendee);
  const [imageBlob, setImageBlob] = useState(initialValue.imageBlob);

  const handleSetAtendee = async (email: string, orderId: string) => {
    try {
      const res = await axios.post("http://localhost:5000/api/check-details", {
        email,
        ticket_number: orderId,
      });

      console.log(res);

      setAtendee({
        name: res.data[0].nome,
        email: res.data[0].email,
        order_id: res.data[0].n_folha,
        id: res.data[0].id,
      });

      setValidTicket(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSetImage = (blob: Blob) => {
    setImageBlob(blob);
  };

  return (
    <AtendeeContext.Provider
      value={{
        validTicket,
        validImage,
        atendee,
        imageBlob,
        handleSetAtendee,
        handleSetImage,
      }}
    >
      {children}
    </AtendeeContext.Provider>
  );
};
