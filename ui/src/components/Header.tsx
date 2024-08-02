import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useEffect } from "react";

const Header = () => {
  const { isLoggedIn, saveUser } = useAppContext();
  const { data: user } = useQuery("currentUser", apiClient.fetchCurrentUser);

  useEffect(() => {
    if (user) {
      saveUser(user);
    }
  }, [user, saveUser]);

  return (
    <div className="bg-[#d6bfdd] py-4 md:py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <span className="text-2xl md:text-3xl text-[#60269e] font-bold tracking-tight mb-2 md:mb-0">
          <Link to="/dashboard">PulseChat</Link>
        </span>
        <span className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          {isLoggedIn ? (
            <>
              <h2 className="text-base md:text-lg text-white font-bold">
                Welcome, {user?.username || "Guest"}!
              </h2>
              <Link
                className="bg-blue-200 text-[#60269e] px-3 py-1 rounded font-bold hover:bg-[#60269e] hover:text-white"
                to="/chat"
              >
                Chat
              </Link>
              <Link
                className="bg-blue-200 text-[#60269e] px-3 py-1 rounded font-bold hover:bg-[#60269e] hover:text-white"
                to="/news"
              >
                News
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="bg-white text-[#60269e] px-3 py-1 rounded font-bold hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
