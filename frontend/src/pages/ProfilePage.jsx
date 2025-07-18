import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { Camera, Ellipsis, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const {
    checkAuth,
    authUser,
    isUpdatingProfile,
    updateProfile,
    deleteAccount,
  } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Img = reader.result;
      setSelectedImg(base64Img);
      await updateProfile({ profilePic: base64Img });
    };
  };

  return (
    <div className="min-h-[calc(100vh-56px)]">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold"> Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* Avatar seciton */}
          <div className="flex flex-col items-center gap-4 ">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="profile"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content p-2 rounded-full  cursor-pointer hover:scale-105 transition-all duration-200 ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }
                  
                  
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.email}
              </p>
            </div>
          </div>
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                {!authUser ? (
                  <Ellipsis className="animate-pulse" />
                ) : (
                  <span>{authUser.createdAt?.split("T")[0]}</span>
                )}
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              className="btn btn-error"
              onClick={async () => {
                if (
                  window.confirm(
                    "Are you sure you want to delete your account? This action cannot be undone."
                  )
                ) {
                  await deleteAccount();
                  navigate("/signup");
                }
              }}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
