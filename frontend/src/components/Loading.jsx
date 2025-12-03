import React from "react";
import { CgSpinner } from "react-icons/cg";

const Loading = () => {
  return (
    <div>
      <div
        role="status"
        aria-label="loading"
        className="flex justify-center items-center min-h-screen"
      >
        <CgSpinner className="animate-spin text-black w-10 h-10" />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
