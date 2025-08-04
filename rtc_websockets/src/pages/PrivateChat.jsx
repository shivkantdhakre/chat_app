import { useEffect, useState, useRef } from "react";
import { Send, ArrowLeft } from "lucide-react";
import io from "socket.io-client";

export default function PrivateChat({ currentUser, selectedUser }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser || !currentUser) return;

    // Create socket connection
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      setIsConnected(true);
      const privateRoomId = [currentUser._id, selectedUser._id].sort().join(":");
      newSocket.emit("join_room", privateRoomId);
    });

    newSocket.on("receive_message", (data) => {
      setChat((prev) => [
        ...prev,
        { 
          ...data, 
          sender: data.sender === currentUser._id ? "me" : "them",
          username: data.sender === currentUser._id ? currentUser.username : selectedUser.username
        },
      ]);
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [selectedUser, currentUser]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleSend = () => {
    if (message.trim() === "" || !socket || !isConnected) return;
    
    const privateRoomId = [currentUser._id, selectedUser._id].sort().join(":");
    const msgData = {
      roomId: privateRoomId,
      content: message,
      timestamp: new Date().toISOString(),
      sender: currentUser._id,
      receiver: selectedUser._id,
    };
    
    socket.emit("send_message", msgData);
    setChat((prev) => [...prev, { 
      ...msgData, 
      sender: "me",
      username: currentUser.username
    }]);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="avatar avatar-sm">
              {selectedUser.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-semibold text-white">{selectedUser.username}</h2>
              <p className="text-sm text-gray-400">
                {isConnected ? "Online" : "Connecting..."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="chat-messages">
        {chat.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Start chatting with {selectedUser.username}
              </h3>
              <p className="text-gray-400">
                Send a message to begin your conversation
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {chat.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div className={`message-bubble ${
                  msg.sender === "me" ? "message-sent" : "message-received"
                } max-w-xs lg:max-w-md`}>
                  {msg.sender !== "me" && (
                    <div className="text-xs text-gray-400 mb-1 font-medium">
                      {msg.username}
                    </div>
                  )}
                  <div className="text-sm leading-relaxed">{msg.content}</div>
                  <div className="text-xs text-gray-400 mt-2 text-right">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="chat-input">
        <div className="flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message ${selectedUser.username}...`}
            className="input-modern flex-1"
            disabled={!isConnected}
          />
          <button
            onClick={handleSend}
            disabled={!message.trim() || !isConnected}
            className="btn-modern btn-primary px-6"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
