import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto gap-6 p-4 text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Welcome to Your Dashboard
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Choose an option below to start exploring your favorite features.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center w-full gap-6">
        <Link to="/chat" className="w-full max-w-xs">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/6146929/pexels-photo-6146929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="w-full h-[200px] object-cover rounded-lg hover:opacity-70 cursor-pointer"
              alt="Chat"
            />
            <span className="absolute top-2 left-2 text-xl font-semibold text-gray-800">
              Chat
            </span>
          </div>
          <p className="mt-2 text-lg text-gray-700">
            Connect and chat with friends in real-time.
          </p>
        </Link>
        <Link to="/news" className="w-full max-w-xs">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="w-full h-[200px] object-cover rounded-lg hover:opacity-70 cursor-pointer"
              alt="News"
            />
            <span className="absolute top-2 left-2 text-xl font-semibold text-gray-800">
              News
            </span>
          </div>
          <p className="mt-2 text-lg text-gray-700">
            Stay updated with the latest news articles.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
