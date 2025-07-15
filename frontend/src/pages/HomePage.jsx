import { Users, MessagesSquare } from "lucide-react";
import React, { useEffect } from "react";
import { useMessageStore } from "../store/useMessageStore";
import ChatPage from "../components/ChatPage";

const HomePage = () => {
  const { users, getUsers, selectedUser, setSelectedUser, getMessage } =
    useMessageStore();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-base-100">
      <div className="max-w-7xl mx-auto h-[calc(100vh-64px)] flex flex-col">
        <div className="flex flex-1 overflow-hidden rounded-xl shadow-lg border border-base-200 m-4">
          {/* Sidebar */}
          <div className="bg-base-200 w-64 flex flex-col p-4 border-r border-base-200">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-base font-semibold text-base-content">
                <Users size={20} />
                Contacts
              </div>
            </div>
            <ul className="mt-4 flex-1 overflow-y-auto space-y-1">
              {users.map((user) => (
                <li key={user._id}>
                  <button
                    className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-base-300 transition-colors cursor-pointer ${
                      selectedUser?._id === user._id ? "bg-base-300" : ""
                    }`}
                    onClick={() => {
                      setSelectedUser(user);
                      getMessage(user);
                    }}
                  >
                    <img
                      src={user.profilePic || "/avatar.png"}
                      alt="Avatar"
                      className="size-8 rounded-full border border-base-300 object-cover"
                    />
                    <span className="text-sm font-medium text-base-content">
                      {user.fullName}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Chat Area */}
          <div className=" h-full flex flex-col">
            {selectedUser ? (
              <ChatPage />
            ) : (
              <div className="flex-1 flex items-center justify-center bg-base-100">
                <div className="text-center space-y-3">
                  <MessagesSquare className="mx-auto size-16 text-base-content/50" />
                  <h2 className="text-lg font-semibold text-base-content">
                    Welcome to Chatty
                  </h2>
                  <p className="text-sm text-base-content/70">
                    Select a contact to start chatting
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
