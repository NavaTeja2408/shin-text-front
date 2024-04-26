import { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export const useAuth = () => {
  return useContext(UserContext);
};

export function UserContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState([]);
  const [convos, SetConvos] = useState([]);
  useEffect(() => {
    console.log(authUser);
  }, [authUser, messages, selectedConversation, convos]);

  return (
    <UserContext.Provider
      value={{
        authUser,
        setAuthUser,
        selectedConversation,
        setSelectedConversation,
        messages,
        setMessages,
        receiver,
        setReceiver,
        convos,
        SetConvos,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
