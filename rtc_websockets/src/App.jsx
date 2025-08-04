import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import ChatLayout from "./components/ChatLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChatRoom from "./pages/ChatRoom";
import LoadingSpinner from "./components/LoadingSpinner";
import ParticleBackground from "./components/ParticleBackground";
import { useState } from "react";
import { LogOut, User, Settings } from "lucide-react";

function PrivateChatWrapper() {
  const { user, logout, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" text="Loading your chat..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <ChatLayout
      isSidebarOpen={isSidebarOpen}
      onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      headerContent={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="avatar avatar-sm">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-semibold text-white">{user.username}</h2>
              <p className="text-sm text-gray-400">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-ghost p-2 rounded-lg">
              <Settings size={20} />
            </button>
            <button
              onClick={logout}
              className="btn-ghost p-2 rounded-lg text-red-500 hover:bg-red-500/10"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      }
      sidebarContent={
        <div className="p-6">
          <Home
            currentUser={user}
            onSelectUser={(user) => {
              // Handle user selection
              console.log("Selected user:", user);
            }}
            onJoinRoom={(room) => {
              // Handle room joining
              console.log("Joining room:", room);
            }}
          />
        </div>
      }
    >
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 glow-effect">
            <User size={48} className="text-indigo-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2 gradient-text">
            Welcome to Web Chat
          </h3>
          <p className="text-gray-400">
            Select a user or room to start chatting
          </p>
        </div>
      </div>
    </ChatLayout>
  );
}

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="min-h-screen relative bg-gray-900 text-white">
            <ParticleBackground />
            <div className="particle-overlay"></div>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/chat/:roomId" element={<ChatRoom />} />
              <Route path="/" element={<PrivateChatWrapper />} />
            </Routes>
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
