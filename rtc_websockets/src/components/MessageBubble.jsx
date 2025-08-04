import React from "react";

const MessageBubble = ({ message, isOwnMessage, username }) => {
  const messageTime = new Date(message.timestamp);
  const formattedTime = messageTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`message-bubble ${
          isOwnMessage ? "message-sent" : "message-received"
        } max-w-xs lg:max-w-md`}
      >
        {!isOwnMessage && (
          <div className="text-xs text-gray-400 mb-1 font-medium">
            {username}
          </div>
        )}
        <div className="text-sm leading-relaxed">{message.message}</div>
        <div className="text-xs text-gray-400 mt-2 text-right">
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
