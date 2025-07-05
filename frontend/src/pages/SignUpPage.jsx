import { Key, Mail, MessagesSquare, User, Eye, EyeOff } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => e.preventDefault();

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side */}
      <div className="flex flex-col items-center justify-center px-8 py-12 lg:px-24 space-y-13">
        {/* Logo & Heading */}
        <div className="flex flex-col items-center gap-2">
          <MessagesSquare className="size-15 text-primary" />
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-base-content/60">
            Get started with your free account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          {/* Full Name */}
          <div>
            <label className="label mb-1">
              <span>Full Name</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 ">
                <User className="size-6 text-base-content/60" />
              </div>
              <input
                type="text"
                className="input input-bordered w-full pl-11 focus:outline-none focus:ring-0 focus:border-primary"
                placeholder="Nick Dada"
              />
            </div>
          </div>

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
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center z-20"
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
          <button type="submit" className="btn btn-primary w-full ">
            Create Account
          </button>
        </form>

        {/* Footer link */}
        <p className="text-base-content/60 mt-8">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
