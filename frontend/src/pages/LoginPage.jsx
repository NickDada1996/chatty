import { Eye, EyeOff, Key, Mail, MessagesSquare, Ellipsis } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import RightPage from "../components/RightPage.jsx";

const LoginPage = () => {
  const { isLoggingIng, login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-[calc(100vh-64px)]  grid lg:grid-cols-2 ">
      {/* Left Side */}
      <div className="flex flex-col items-center justify-center px-8 py-12 lg:px-24 space-y-13">
        {/* Logo & Heading */}
        <div className="flex flex-col items-center gap-2">
          <MessagesSquare className="size-15 text-primary" />
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-base-content/60">Sign in to access your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          {/* Email */}
          <div>
            <label className="label mb-1">
              <span>Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Mail className="size-6 text-base-content/60" />
              </div>
              <input
                type="email"
                className="input input-bordered w-full pl-11 focus:outline-none focus:ring-0 focus:border-primary"
                placeholder="abc@gmail.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, email: e.target.value }));
                }}
              />
            </div>
          </div>
          {/* Password */}
          <div>
            <label className="label mb-1">
              <span>Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Key className="size-6 text-base-content/60" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-11 focus:outline-none focus:ring-0 focus:border-primary"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
              />
              <button
                type="button"
                className="hover:cursor-pointer absolute inset-y-0 right-0 pr-3 flex items-center z-20"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <EyeOff className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>
          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-full "
            disabled={isLoggingIng}
          >
            {isLoggingIng ? <Ellipsis /> : "Login"}
          </button>
        </form>
        {/* Footer link */}
        <p className="text-base-content/60 mt-8">
          New to here?{" "}
          <Link to="/signup" className="link link-primary">
            Sign up
          </Link>
        </p>
      </div>
      {/*right side*/}
      <RightPage
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default LoginPage;
