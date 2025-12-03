import { CgSpinner } from "react-icons/cg";
const LoadingIndicator = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white  z-50">
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

export default LoadingIndicator;
