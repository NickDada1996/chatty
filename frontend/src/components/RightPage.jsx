// components/RightPage.jsx
import React from "react";

const RightPage = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base px-12">
      <div className="relative w-full max-w-md text-center space-y-6">
        <div className="absolute inset-0 flex justify-center items-center -z-10">
          <div className="w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <h2 className="text-3xl font-bold text-base-content">{title}</h2>
        <p className="text-base text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default RightPage;
