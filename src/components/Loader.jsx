import logo from "../assets/mishmash-logo.png";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="relative">
        <div className="absolute inset-0 rounded-full animate-ping bg-blue-400 opacity-75"></div>
        <div className="absolute inset-0 rounded-full animate-pulse bg-blue-500 opacity-75"></div>
        <img
          src={logo}
          alt="Loading"
          className="relative w-24 h-24 p-4 rounded-full z-10"
        />
        <div className="absolute top-0 right-0 w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
      </div>
      <p className="mt-4 text-blue-500 text-lg font-semibold animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default Loader;
