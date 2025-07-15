import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIng: false,
  isUpdateingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
    } catch (error) {
      console.log("error in checkAuthStore", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (formData) => {
    set({ isSigningUp: true });

    try {
      const response = await axiosInstance.post("/auth/signup", formData);
      set({ authUser: response.data });
      toast.success("Sign up successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!");
    } catch (error) {
      set({ authUser: null });
      toast.error(error.response.data.message);
    }
  },

  login: async (formData) => {
    set({ isLoggingIng: true });
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      set({ authUser: res.data });
      toast.success("Log in successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIng: false });
    }
  },

  updateProfile: async (image) => {
    set({ isUpdateingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", image);
      set({ authUser: res.data });
      toast.success("Update avatar successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdateingProfile: false });
    }
  },

  deleteAccount: async () => {
    try {
      await axiosInstance.delete("/auth/delete-account");
      set({ authUser: null });
      toast.success("Account deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete account");
    }
  },
}));
