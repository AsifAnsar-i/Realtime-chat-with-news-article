import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col gap-y-6 w-full max-w-xs mx-auto items-center justify-center mt-10 px-4">
      <h2 className="w-screen text-center text-3xl md:text-5xl text-wrap gap-y-3 text-gray-950 font-semibold leading-tight">
        Stay Connected & <span className="text-blue-600">Informed</span>
      </h2>
      <p className="text-center text-lg md:text-xl text-wrap text-gray-500 leading-relaxed">
        Seamlessly chat in real-time and stay up-to-date with the latest news
        articles.
      </p>
      <Link to="/register">
        <button
          type="submit"
          className="bg-blue-600 rounded text-white p-2 md:p-3 font-bold hover:bg-blue-500 text-base md:text-xl w-full max-w-xs"
        >
          Sign Up for Free
        </button>
      </Link>
    </div>
  );
};

export default Home;
