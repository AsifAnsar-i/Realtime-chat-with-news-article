
const PulseLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex space-x-2">
        <div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse delay-200"></div>
        <div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse delay-400"></div>
      </div>
    </div>
  );
};

export default PulseLoader;
