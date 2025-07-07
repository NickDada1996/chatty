import React from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { MessagesSquare, LogOut, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <nav className="h-14 px-4 flex items-center justify-between ">
      {/* Left side */}
      <Link to="/" className=" flex items-center gap-2">
        <MessagesSquare className="size-6 text-primary" />
        <h1 className="text-lg font-bold">Chatty</h1>
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <Link
          to={"/settings"}
          className={`
              btn btn-sm gap-2 transition-colors
              
              `}
        >
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline"> Settings</span>
        </Link>
        {authUser && (
          <>
            <Link to={"/profile"} className={`btn btn-sm gap-2`}>
              <User className="size-5" />
              <span className="hidden sm:inline">Profile</span>
            </Link>

            <button className="btn btn-sm gap-2 " onClick={logout}>
              <LogOut className="size-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
