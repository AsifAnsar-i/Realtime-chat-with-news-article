import { useState, useEffect } from "react";
import io from "socket.io-client";
import ChatCard from "./ChatCard";
import { useAppContext } from "@/contexts/AppContext";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import PulseLoader from "./PulseLoader";

const socket = io("http://localhost:7000");
export type MessagesProps = {
  content: string;
  username: string;
};

const Chat = () => {
  const [room, setRoom] = useState<string>("general");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessagesProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAppContext();
  const username = user?.username || "Anonymous";

  useEffect(() => {
    socket.emit("joinRoom", room);

    socket.on("message", (newMessage: MessagesProps) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    setRoom("general");
    return () => {
      socket.off("message");
    };
  }, [room]);

  const messageData = {
    username: username,
    content: message,
  };

  const mutation = useMutation(apiClient.addMessageData, {
    onSuccess: async () => {},
    onError: () => {},
  });

  const sendMessage = () => {
    if (message.trim() === "") {
      setError("Message cannot be empty");
      return;
    }

    setError(null);
    mutation.mutate(messageData);
    socket.emit("message", { room, content: message, username });
    setMessage("");
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await apiClient.fetchMessageData();
        setMessages(response);
      } catch (error) {
        console.error("Error fetching messages: ", error);
      }
    };

    fetchMessages();
  }, []);

  if (messages.length === 0) {
    return (
      <div className="w-screen flex items-center justify-center -mt-60 -ml-10 lg:-ml-2">
        <PulseLoader />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        {messages.map((msg, index) => (
          <ChatCard msg={msg} index={index} key={index} />
        ))}
      </div>
      {error && <p className="text-red-500 mb-2">{error}</p>}{" "}
      {/* Display error message */}
      <div className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
          className="flex-1 outline-none border-2 w-[10px] sm:w-full border-gray-300 p-2 text-gray-700 font-semibold"
        />
        <button
          className={`py-2.5 border-2 px-3  items-center justify-center text-center ${
            message.trim() === ""
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-pink-400 text-white hover:bg-pink-300"
          }`}
          onClick={sendMessage}
          disabled={message.trim() === ""}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
