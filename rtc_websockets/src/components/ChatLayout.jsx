import React from "react";
import { Menu, Search, Plus, LogOut, Settings, User } from "lucide-react";

const ChatLayout = ({
  children,
  sidebarContent,
  headerContent,
  onToggleSidebar,
  isSidebarOpen = true,
}) => {
  return (
    <div className="chat-layout">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-border-color">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold gradient-text">Web Chat</h1>
            <button
              onClick={onToggleSidebar}
              className="btn-ghost p-2 rounded-lg hover:bg-card-bg"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto">{sidebarContent}</div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="chat-header">{headerContent}</div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default ChatLayout;
