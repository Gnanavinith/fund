import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, X, Filter, TrendingUp } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const DonatePage = () => {
  const { startups, deleteStartup, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Filter startups based on search query and selected type
  const filteredStartups = startups
    .filter((startup) => {
      const matchesSearch = startup.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        startup.about1.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = !selectedType || startup.companytype === selectedType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === "amount-high") {
        return Number(b.amount) - Number(a.amount);
      } else if (sortBy === "amount-low") {
        return Number(a.amount) - Number(b.amount);
      }
      return 0;
    });

  const companyTypes = [...new Set(startups.map(startup => startup.companytype))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
          Discover Amazing Startups
        </h1>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white">
              <button className="p-3">
                <Search className="w-5 h-5 text-gray-500" />
              </button>
              <input
                type="text"
                placeholder="Search startups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 focus:outline-none"
              />
              {searchQuery && (
                <button 
                  className="p-3 hover:bg-gray-100" 
                  onClick={() => setSearchQuery("")}
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="p-2 border-none focus:outline-none"
              >
                <option value="">All Types</option>
                {companyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm">
              <TrendingUp className="w-5 h-5 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border-none focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="amount-high">Highest Amount</option>
                <option value="amount-low">Lowest Amount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Startups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStartups.map((startup) => (
            <div
              key={startup.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={startup.image}
                  alt={startup.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-pink-600 text-white px-3 py-1 rounded-full text-sm">
                  {startup.companytype}
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {startup.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {startup.about1}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-pink-600">
                    ${Number(startup.amount).toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(startup.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex gap-3">
                  <Link
                    to={`/cart/${startup.id}`}
                    className="flex-1 bg-pink-600 text-white text-center py-2 rounded-lg hover:bg-pink-700 transition"
                  >
                    View Details
                  </Link>
                  {user && user.id === startup.userId && (
                    <button
                      onClick={() => deleteStartup(startup.id)}
                      className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStartups.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No startups found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonatePage;
