import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./css/chat.css";
import Header from "./Header";
import { jwtDecode } from "jwt-decode";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3001", {
  autoConnect: false,
});

const Chat = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const [chatList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUserData(decoded);

      socket.auth = { token };
      socket.connect();

      const fetchChatData = async () => {
        try {
          const res = await axios.get("http://localhost:3001/api/my-chats", {
            headers: { Authorization: token },
          });
          setChatList(res.data);
        } catch (error) {
          console.error("Error cargando lista de chats:", error);
        }
      };

      fetchChatData();

      return () => {
        socket.disconnect();
      };
    } catch (e) {
      console.log("Token inválido o expiró");
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (message) => {
      if (message.chatId === selectedChat?.id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    // Registrar el listener
    socket.on("receive_message", handleReceiveMessage);

    // Elimina el listener anterior al cambiar de chat
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [selectedChat]); // Se re-registra el listener cuando el chat cambia

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const Return = () => {
    if (userData && userData.role === "jefe") {
      navigate("/main");
    } else {
      navigate("/mainU");
    }
  };

  const handleSelectChat = async (user) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3001/api/chat/find-or-create",
        { otherUserId: user.id },
        { headers: { Authorization: token } }
      );

      const { chatId } = res.data;

      setSelectedChat({
        id: chatId,
        userId: user.id,
        name: `${user.nombre} ${user.apellido}`,
      });

      setMessages([]);
      socket.emit("join_room", chatId);

      const messagesRes = await axios.get(
        `http://localhost:3001/api/chat/${chatId}/messages`,
        {
          headers: { Authorization: token },
        }
      );
      setMessages(messagesRes.data);
    } catch (error) {
      console.error("Error al abrir el chat:", error);
      alert("No se pudo iniciar el chat.");
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !selectedChat) return;

    socket.emit("send_message", {
      chatId: selectedChat.id,
      contMen: newMessage,
    });

    setNewMessage("");
  };

  if (!userData) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="chatMainCont">
        <button className="return" onClick={Return}>
          Volver
        </button>
        <div className="chatCont">
          {/* --- Panel de Usuarios/Chats --- */}
          <div className="users">
            <div className="users-list-header">Contactos</div>
            {chatList.map((user) => (
              <div
                key={user.id}
                className={`user-item ${
                  selectedChat?.userId === user.id ? "selected" : ""
                }`}
                onClick={() => handleSelectChat(user)}
              >
                {user.nombre} {user.apellido}
              </div>
            ))}
          </div>

          {/* --- Área de Chat Principal --- */}
          <div className="chatArea">
            {/* Mensajes */}
            <div className="messages-list">
              {selectedChat ? (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`message-bubble ${
                      msg.remitenteId === userData.id ? "me" : "them"
                    }`}
                  >
                    <div className="message-sender">
                      {msg.remitente?.nombre || "Usuario"}
                    </div>
                    <div className="message-content">{msg.contMen}</div>
                  </div>
                ))
              ) : (
                <div className="no-chat-selected">
                  Selecciona un chat para comenzar a hablar
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chatInputArea">
              <img
                src="https://i.imgur.com/fYLdolN.png"
                alt="Agregar archivo"
                id="addFile"
                className="chat-icon"
              />
              <input
                type="text"
                name="chatInput"
                id="chatBar"
                placeholder={
                  selectedChat ? "Escribe aquí..." : "Selecciona un chat"
                }
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={!selectedChat}
              />
              <img
                src="https://i.imgur.com/442CuF9.png"
                alt="Enviar"
                id="sendMessage"
                className="chat-icon"
                onClick={handleSendMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
