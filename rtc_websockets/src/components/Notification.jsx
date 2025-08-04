import React, { useEffect } from "react";
import { X, MessageCircle, Bell } from "lucide-react";

const Notification = ({ message, type = "info", onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case "message":
        return <MessageCircle size={16} />;
      case "notification":
        return <Bell size={16} />;
      default:
        return <Bell size={16} />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500/20 border-green-500/30 text-green-400";
      case "error":
        return "bg-red-500/20 border-red-500/30 text-red-400";
      case "warning":
        return "bg-yellow-500/20 border-yellow-500/30 text-yellow-400";
      default:
        return "bg-indigo-500/20 border-indigo-500/30 text-indigo-400";
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 animate-slide-in-right`}>
      <div
        className={`modern-card p-4 border ${getBgColor()} backdrop-blur-sm`}
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">{getIcon()}</div>
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
