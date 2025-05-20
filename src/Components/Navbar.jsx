import React, { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full p-4 z-50 shadow-lg border-b border-pink-200 bg-white">
      <div className="max-w-[1200px] mx-auto container flex justify-between items-center">
        <Link to="/homepage" className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold font-serif text-pink-700">
            FUND RAISER
          </h1>
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 hover:bg-pink-50 rounded-lg transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`md:flex items-center space-x-2 absolute md:static top-16 left-0 w-full bg-white md:w-auto transition-all border rounded-lg shadow-lg md:shadow-none ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li>
            <Link
              to="/homepage"
              className="block md:inline-block text-gray-700 p-4 hover:bg-pink-50 rounded-lg transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/overallcarts"
              className="block md:inline-block text-gray-700 p-4 hover:bg-pink-50 rounded-lg transition"
            >
              Funding
            </Link>
          </li>
          <li>
            <Link
              to="/Pricing"
              className="block md:inline-block text-gray-700 p-4 hover:bg-pink-50 rounded-lg transition"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              to="/Contactus"
              className="block md:inline-block text-gray-700 p-4 hover:bg-pink-50 rounded-lg transition"
            >
              Contact Us
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link
                  to="/poststartup"
                  className="block md:inline-block bg-pink-700 text-white p-4 rounded-lg hover:bg-pink-800 transition"
                >
                  Post Startup
                </Link>
              </li>
              <li className="relative group">
                <button className="flex items-center space-x-2 p-4 text-gray-700 hover:bg-pink-50 rounded-lg transition">
                  <User size={20} />
                  <span>{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 hidden group-hover:block">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full p-4 text-gray-700 hover:bg-pink-50 rounded-lg transition"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="block md:inline-block bg-pink-700 text-white p-4 rounded-lg hover:bg-pink-800 transition"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
