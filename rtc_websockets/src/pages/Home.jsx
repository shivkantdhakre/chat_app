import { useEffect, useState } from "react";
import { Search, Users, Plus, DoorOpen, MessageCircle } from "lucide-react";

const Home = ({ currentUser, onSelectUser, onJoinRoom }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("users"); // "users" or "rooms"

  useEffect(() => {
    fetch("http://localhost:4000/api/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then(setUsers)
      .catch((err) => setError(err.message));

    fetch("http://localhost:4000/api/rooms")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch rooms");
        return res.json();
      })
      .then(setRooms)
      .catch((err) => setError(err.message));
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) &&
      user.username !== currentUser.username
  );

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          size={18}
        />
        <input
          type="text"
          placeholder="Search users or rooms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-modern pl-10"
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="modern-card p-4 border-red-500/20 bg-red-500/10">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
        <button
          onClick={() => setActiveTab("users")}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === "users"
              ? "bg-indigo-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Users ({filteredUsers.length})
        </button>
        <button
          onClick={() => setActiveTab("rooms")}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === "rooms"
              ? "bg-indigo-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Rooms ({filteredRooms.length})
        </button>
      </div>

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
            Online Users
          </h3>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="mx-auto text-gray-500 mb-2" size={24} />
              <p className="text-gray-500 text-sm">
                {search ? "No users found" : "No users available"}
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredUsers.map((user) => (
                <button
                  key={user._id}
                  onClick={() => onSelectUser(user)}
                  className="w-full text-left p-3 rounded-lg hover:bg-card-bg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="avatar avatar-sm">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">
                        {user.username}
                      </p>
                      <p className="text-xs text-gray-400">Click to chat</p>
                    </div>
                    <div className="status-online"></div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Rooms Tab */}
      {activeTab === "rooms" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
              Chat Rooms
            </h3>
            {filteredRooms.length === 0 ? (
              <div className="text-center py-8">
                <Users className="mx-auto text-gray-500 mb-2" size={24} />
                <p className="text-gray-500 text-sm">
                  {search ? "No rooms found" : "No rooms available"}
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredRooms.map((room) => (
                  <button
                    key={room._id}
                    onClick={() => onJoinRoom(room)}
                    className="w-full text-left p-3 rounded-lg hover:bg-card-bg transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-indigo-500 text-sm font-bold">
                          #
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white truncate">
                          {room.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          Join conversation
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Create/Join Room Form */}
          <div className="modern-card p-4">
            <h4 className="text-sm font-medium text-white mb-3">
              Create or Join Room
            </h4>
            <form
              className="space-y-3"
              onSubmit={async (e) => {
                e.preventDefault();
                const name = e.target.roomName.value.trim();
                if (!name) return;

                try {
                  const res = await fetch("http://localhost:4000/api/rooms", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name }),
                  });

                  if (res.ok) {
                    const newRoom = await res.json();
                    setRooms((prev) => [...prev, newRoom]);
                    onJoinRoom(newRoom);
                  } else {
                    const data = await res.json();
                    alert(data.message || "Room already exists or is invalid.");
                  }
                } catch (error) {
                  alert("Failed to create room. Please try again.");
                }

                e.target.reset();
              }}
            >
              <input
                type="text"
                name="roomName"
                placeholder="Enter room name"
                className="input-modern"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="btn-modern btn-secondary flex-1"
                >
                  <Plus size={16} /> Create
                </button>
                <button
                  type="button"
                  onClick={async (e) => {
                    e.preventDefault();
                    const form = e.target.form;
                    const name = form.roomName.value.trim();
                    if (!name) return;

                    try {
                      const res = await fetch(
                        "http://localhost:4000/api/rooms"
                      );
                      const allRooms = await res.json();
                      const found = allRooms.find((r) => r.name === name);
                      if (found) {
                        onJoinRoom(found);
                      } else {
                        alert("Room not found.");
                      }
                    } catch (error) {
                      alert("Failed to join room. Please try again.");
                    }
                  }}
                  className="btn-modern btn-primary flex-1"
                >
                  <DoorOpen size={16} /> Join
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
