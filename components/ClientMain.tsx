"use client";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import StartupCard from "@/components/StartupCard-new";

export default function ClientMain({ startups }: { startups: any[] }) {
  const [filteredStartups, setFilteredStartups] = useState(startups);
  const [loading, setLoading] = useState(false);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredStartups(startups);
      return;
    }
    setFilteredStartups(
      startups.filter((startup) =>
        (startup.title || "").toLowerCase().includes(query.toLowerCase()) ||
        (startup.description || "").toLowerCase().includes(query.toLowerCase()) ||
        (startup.category || "").toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Discover Amazing Startups
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Explore innovative startups from entrepreneurs around the world. Find the next big thing or share your own startup idea.
        </p>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Latest Startups
        </h2>
        <p className="text-gray-600">
          {filteredStartups.length} startup{filteredStartups.length !== 1 ? "s" : ""} found
        </p>
      </div>
      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading...</div>
      ) : filteredStartups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStartups.map((startup) => (
            <StartupCard key={startup._id || startup.id} startup={{
              id: startup._id || startup.id,
              title: startup.title,
              description: startup.description,
              category: startup.category,
              image: startup.image,
              author: {
                name: startup.author?.name || "Unknown",
                image: startup.author?.image || ""
              },
              createdAt: startup._createdAt || startup.createdAt
            }} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No startups found matching your search.</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your search terms.</p>
        </div>
      )}
      {filteredStartups.length > 0 && !loading && (
        <div className="text-center mt-12">
          <button className="bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
            Load More Startups
          </button>
        </div>
      )}
    </main>
  );
} 