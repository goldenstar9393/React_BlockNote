import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-dark text-neutrals-7">
      <span className="text-9xl">😢</span>
      <h1 className="text-4xl font-bold mt-4">Page Not Found</h1>
      <p className="text-lg mt-2">We can't find the page you're looking for.</p>
      <a href="/" className="mt-6 text-primaryPurple-500 hover:underline">
        Go back home
      </a>
    </div>
  );
};

export default ErrorPage;
