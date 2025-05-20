import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Funding from "../assets/Funding.png";
import { useAuth } from "../context/AuthContext";

//--------------------Slides--------------------------
const slides = [
  "India's Most Affordable And 0% FEES FREE Fundings Plans Platform",
  "3 Easy Steps To Funding Your Fund In Efficient Way On This Platform ",
];

//------------------Reviews-------------------------
const reviews = [
  {
    name: "Ramesh Kumar",
    image:
      "/images/portrait-attractive-young-man-straightening-his-jacket_171337-19813 (1).avif",
    review:
      "This platform transformed my startup journey! The funding process was smooth, and the team was incredibly supportive. I secured the capital I needed to scale my business within weeks",
  },
  {
    name: "Suresh Sharma",
    image:
      "/images/young-indian-man-standing-isolated-grey-wall-approving-doing-positive-gesture-with-hand-thumbs-up-smiling-happy-success_231208-2602.avif",
    review:
      "As a first-time founder, finding investors was overwhelming. This website made the process easy, connecting me with the right people and providing valuable resources. Highly recommended!",
  },
  {
    name: "Anish Varma",
    image:
      "/images/handsome-handsome-guy-posing-against-white-wall_176420-32958.avif",
    review:
      "A game-changer for entrepreneurs! The transparency, quick approvals, and investor network helped me secure funding faster than I ever expected. Thank you for empowering startups",
  },
];

const HeroPage = () => {
  const { startups } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  // Filter startups based on search query
  const filterUsers = startups.filter((f) => 
    f.companytype.toLowerCase().includes(query.toLowerCase())
  );

  // Slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // -----------------------Reviews Concept---------------------
  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar />
        <div className="max-w-7xl mx-auto mt-30 md:mt-30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <img
                className="w-full shadow-2xl rounded-2xl p-5 md:p-0"
                src={Funding}
                alt="Business Project"
              />
            </div>
            <div className=" bg-rose-100  rounded-2xl py-6 px-6 md:py-8 md:px-10 text-center">
              <h1 className="text-4xl md:text-6xl font-bold  text-pink-800">
                Fund Raiser
              </h1>
              <h2 className="text-2xl md:text-4xl text-gray-700 mt-4">
                FEES <span className="text-pink-800">FREE</span> PLATFORM
              </h2>
              <div className="flex flex-col md:flex-row justify-center items-center mt-6 md:mt-10 gap-6">
                <div className="text-3xl md:text-5xl font-bold">
                  0%
                  <p className="text-pink-700 bg-white text-lg md:text-xl border rounded border-pink-800 border-4 border-l-9 px-2 py-1 mt-2">
                    Platform Fee
                  </p>
                </div>
                <div className="text-3xl md:text-5xl font-bold">
                  20Lakh+
                  <p className="text-pink-700 bg-white text-lg md:text-xl border border-4 border-l-9 rounded border-pink-800 px-2 py-1 mt-2">
                    Donors Fundraisers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" bg-rose-100 md:w-full rounded-2xl shadow-2xl mt-12 py-4 px-4 text-center">
          <div className="overflow-hidden bg-rose-100 mt-4 md:max-w-xl mx-auto relative border rounded-lg border-pink-200 p-3">
            <motion.div
              key={currentSlide}
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="text-xl bg-white text-pink-700 md:text-2xl font-semibold bg-gray-100 p-4 rounded-lg shadow-md "
            >
              {slides[currentSlide]}
            </motion.div>
          </div>
          <motion.div
            initial={{ x: -150 }}
            animate={{ x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-white  text-lg md:text-xl font-bold w-48 border rounded-2xl bg-pink-700 mt-4 py-2 mx-auto"
          >
            Fund Rising
          </motion.div>
        </div>
        {/* -------------------------------------Funding Zone----------------------------------- */}
        <div className="max-w-7xl mx-auto mt-12 px-4">
          <h1 className="text-3xl md:text-5xl text-center font-bold text-rose-700">
            FUNDING ZONE
          </h1>

          {/* --------------------------------------SearchBar------------------------------------------ */}

          <div className="relative w-full max-w-md mx-auto p-2 sm:p-4">
            {/* Search Input */}
            <div className="flex items-center rounded-lg overflow-hidden shadow-2xl border w-full max-w-lg mx-auto ">
              <button className="p-2 sm:p-3" onClick={() => setOpen(!open)}>
                <Search className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
              </button>
              <input
                type="text"
                placeholder="Search Below Sectors"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-2 sm:p-3 focus:outline-none text-sm sm:text-base"
              />
              {query && (
                <button className="p-2 sm:p-3" onClick={() => setQuery("")}>
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 p-6">
            {filterUsers.map((startup) => (
              <div
                key={startup.id}
                className="bg-rose-100 p-6 rounded-2xl hover:shadow-2xl transition-transform transform hover:scale-105 backdrop-blur-lg shadow-2xl"
              >
                <img
                  src={startup.image}
                  alt={startup.title}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h1 className="text-2xl text-gray-800 font-bold text-center">
                  <span className="text-rose-800 text-3xl">{startup.title}</span>
                </h1>
                <p className="text-gray-600 mt-2 text-center">{startup.about1}</p>
                <div className="mt-4 text-center">
                  <span className="text-pink-700 font-semibold">Amount: ${startup.amount}</span>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-pink-700 font-semibold">Type: {startup.companytype}</span>
                </div>
                <Link
                  to={`/cart/${startup.id}`}
                  className="block w-full mt-4 bg-pink-700 text-white text-center py-2 rounded-lg hover:bg-pink-800 transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>

          {/* ---------------------------reveiws----------------------------- */}
          <div className="max-w-4xl bg-rose-100 mx-auto mt-10 px-4 text-center relative">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="border border-pink-700 p-6 rounded-lg shadow-lg bg-white flex flex-col items-center"
            >
              <img
                src={reviews[currentIndex].image}
                alt={reviews[currentIndex].name}
                className="w-40 h-40 p-2 rounded-full mb-4 border border-pink-700"
              />
              <h2 className="text-lg font-semibold text-pink-700">
                {reviews[currentIndex].name}
              </h2>
              <p className="text-gray-600 mt-2">
                {reviews[currentIndex].review}
              </p>
            </motion.div>
            <div className="flex justify-between mt-4">
              <button
                onClick={prevReview}
                className="px-4 py-2 bg-pink-700 text-white rounded border border-pink-700"
              >
                Prev
              </button>
              <button
                onClick={nextReview}
                className="px-4 py-2 bg-pink-700 text-white rounded border border-pink-700"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default HeroPage;
