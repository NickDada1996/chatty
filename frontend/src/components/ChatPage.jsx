import React, { useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { useMessageStore } from "../store/useMessageStore";
import { socket } from "../lib/socket";
import { useAuthStore } from "../store/useAuthStore";

const ChatPage = () => {
  const { selectedUser, draft, setDraft, addMessage, messages, getMessage } =
    useMessageStore();

  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (authUser?._id) {
      socket.emit("join", authUser._id);
    }
  }, [authUser]);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessage(selectedUser);
    }
  }, [selectedUser, getMessage]);

  useEffect(() => {
    socket.on("receive-message", () => {
      if (selectedUser?._id) {
        getMessage(selectedUser);
      }
    });
    return () => {
      socket.off("receive-message");
    };
  }, [selectedUser, getMessage]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (draft.trim()) {
      await addMessage(draft, selectedUser._id);
      const senderId = authUser?._id;
      socket.emit("send-message", {
        content: draft,
        sender: senderId,
        receiver: selectedUser._id,
      });

      getMessage(selectedUser);
    }
  };

  return (
    <div className=" flex h-screen flex-col bg-base-100">
      <div className=" flex flex-col rounded-xl shadow-sm overflow-hidden border border-base-300">
        {/* Chat Header */}
        <div className="px-4 py-3 border-b border-base-300 bg-base-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
              {selectedUser?.fullName?.[0] || "N"}
            </div>
            <div>
              <h3 className="font-medium text-sm">
                {selectedUser?.fullName || "User"}
              </h3>
            </div>
          </div>
        </div>

        <div className="h-full p-4 space-y-4 overflow-y-auto bg-base-100">
          {messages.map((message, index) => {
            const isSent = message.sender !== selectedUser._id;
            return (
              <div
                key={index}
                className={`flex ${isSent ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl p-3 shadow-sm ${
                    isSent
                      ? "bg-primary text-primary-content"
                      : "bg-base-200 text-base-content"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-base-300 bg-base-100 shrink-0">
          <div className="flex gap-2 h-35">
            <input
              type="text"
              className="input input-bordered flex-1 text-sm h-10"
              placeholder="Type a message..."
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <button
              className="btn btn-primary h-10 min-h-0"
              onClick={handleSendMessage}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
