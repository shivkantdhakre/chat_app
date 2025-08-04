import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send, ArrowLeft, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import MessageBubble from "../components/MessageBubble";
import TypingIndicator from "../components/TypingIndicator";

const ChatRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    // Connect to WebSocket
    const ws = new WebSocket(`ws://localhost:4000`);

    ws.onopen = () => {
      setIsConnected(true);
      ws.send(
        JSON.stringify({
          type: "join_room",
          room: roomId,
          username: user?.username,
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "message") {
        setMessages((prev) => [...prev, data]);
      } else if (data.type === "typing") {
        if (data.isTyping) {
          setTypingUsers((prev) => [
            ...prev.filter((u) => u !== data.username),
            data.username,
          ]);
        } else {
          setTypingUsers((prev) => prev.filter((u) => u !== data.username));
        }
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [roomId, user]);

  const sendMessage = () => {
    if (!newMessage.trim() || !socket) return;

    const messageData = {
      type: "message",
      room: roomId,
      username: user?.username,
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    socket.send(JSON.stringify(messageData));
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleTyping = () => {
    if (socket && !isTyping) {
      setIsTyping(true);
      socket.send(
        JSON.stringify({
          type: "typing",
          room: roomId,
          username: user?.username,
          isTyping: true,
        })
      );

      setTimeout(() => {
        setIsTyping(false);
        if (socket) {
          socket.send(
            JSON.stringify({
              type: "typing",
              room: roomId,
              username: user?.username,
              isTyping: false,
            })
          );
        }
      }, 3000);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="btn-ghost p-2 rounded-lg hover:bg-card-bg"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
              <span className="text-indigo-500 text-lg font-bold">#</span>
            </div>
            <div>
              <h2 className="font-semibold text-white">{roomId}</h2>
              <p className="text-sm text-gray-400">
                {isConnected ? "Connected" : "Connecting..."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Welcome to #{roomId}
              </h3>
              <p className="text-gray-400">
                Start the conversation by sending a message
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <MessageBubble
                key={index}
                message={msg}
                isOwnMessage={msg.username === user?.username}
                username={msg.username}
              />
            ))}
            {typingUsers.length > 0 && (
              <TypingIndicator
                isTyping={true}
                username={typingUsers.join(", ")}
              />
            )}
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="chat-input">
        <div className="flex gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping();
            }}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="input-modern flex-1"
            disabled={!isConnected}
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim() || !isConnected}
            className="btn-modern btn-primary px-6"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
