import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-bgTwo flex flex-col">
      <nav className="flex items-center bg-bgFive p-4 justify-end md:text-lg border-b-black border-b-[1px] fixed top-0 z-50 w-full text-white">
        <div className="flex items-center gap-3 md:gap-5 lg:gap-7 capitalize">
          <Link to="/">Home</Link>
          <Link to="/videos">All videos</Link>
          <Link to="/sign-in">SignIn</Link>
        </div>
      </nav>
      <main className="flex-1 flex flex-col items-center w-full mt-16">{children}</main>
      <footer className="bg-bgFive">
        <div className="w-full flex justify-center items-center">
          <a href="" className="text-center">
            <FaGithub
              size={24}
              className="m-4 text-white hover:text-gray-400"
            />
          </a>
          <a href="" className="text-center">
            <FaLinkedin
              size={24}
              className="m-4 text-white hover:text-gray-400"
            />
          </a>{" "}
          <a href="" className="text-center">
            <FaTwitter
              size={24}
              className="m-4 text-white hover:text-gray-400"
            />
          </a>
        </div>
        <div>
          <p className="text-center p-4  text-white">
            &copy; {new Date().getFullYear()} My Website. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
