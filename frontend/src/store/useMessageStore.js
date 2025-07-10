import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useMessageStore = create((set) => ({
  users: [],
  selectedUser: null,
  messages: [],
  draft: "",

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  getUsers: async () => {
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      console.log("error in getUsers store", error);
    }
  },

  setDraft: (text) => set({ draft: text }),

  addMessage: async (content, receiverId) => {
    try {
      await axiosInstance.post("/message/addMessage", {
        content,
        receiverId,
      });
      set({ draft: "" });
    } catch (error) {
      console.log("error in addMessage function in  useMessageStore", error);
    }
  },

  getMessage: async (user) => {
    try {
      const res = await axiosInstance.get(`/message/getMessage/${user._id}`);
      set({ messages: res.data });
    } catch (error) {
      console.log("error in addMessage function in  useMessageStore", error);
    }
  },
}));
