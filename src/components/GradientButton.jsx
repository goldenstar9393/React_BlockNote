import React from "react";
import gradientButton from "../assets/gradientButton.svg";

const GradientButton = ({ text }) => {
  return (
    <div className="col-span-2 flex justify-start">
      <button
        type="button"
        className="relative bg-dark text-neutrals-5 rounded-2xl w-full hover:scale-[1.06] ease-in-out active:scale-[0.98] active:duration-75 transition-all"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-neutrals-5">{text}</span>
        </div>
        <img src={gradientButton} alt={text} className="w-full" />
      </button>
    </div>
  );
};

export default GradientButton;
