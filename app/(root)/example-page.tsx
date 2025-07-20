'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar-new';
import SearchBar from '@/components/SearchBar';
import StartupCard from '@/components/StartupCard-new';

// Mock data for startups
const mockStartups = [
  {
    id: '1',
    title: 'EcoTrack - Sustainable Living Assistant',
    description: 'A comprehensive platform that helps users track their carbon footprint, find eco-friendly alternatives, and connect with local sustainability initiatives. Perfect for environmentally conscious individuals.',
    category: 'Climate Tech',
    image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=500',
    author: {
      name: 'Sarah Chen',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'MindfulAI - Personal Wellness Coach',
    description: 'An AI-powered mental health companion that provides personalized meditation sessions, mood tracking, and wellness recommendations based on your daily patterns.',
    category: 'Health Tech',
    image: 'https://images.pexels.com/photos/3777564/pexels-photo-3777564.jpeg?auto=compress&cs=tinysrgb&w=500',
    author: {
      name: 'Marcus Johnson',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    createdAt: '2024-01-12T14:20:00Z'
  },
  {
    id: '3',
    title: 'LocalMarket - Community Commerce Platform',
    description: 'Connecting local farmers and artisans directly with consumers. Features include local produce delivery, farmer profiles, and community event coordination.',
    category: 'E-commerce',
    image: 'https://images.pexels.com/photos/2292837/pexels-photo-2292837.jpeg?auto=compress&cs=tinysrgb&w=500',
    author: {
      name: 'Emily Rodriguez',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    createdAt: '2024-01-10T09:45:00Z'
  },
  {
    id: '4',
    title: 'CodeMentor Pro - Developer Learning Platform',
    description: 'Interactive coding tutorials with real-time mentorship. Features include live coding sessions, project-based learning, and career guidance for aspiring developers.',
    category: 'EdTech',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=500',
    author: {
      name: 'David Kim',
      image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    createdAt: '2024-01-08T16:15:00Z'
  },
  {
    id: '5',
    title: 'FinanceFlow - Small Business Analytics',
    description: 'Simplified financial analytics for small businesses. Track expenses, generate reports, and get AI-powered insights to optimize cash flow and growth.',
    category: 'FinTech',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=500',
    author: {
      name: 'Lisa Wang',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    createdAt: '2024-01-05T11:30:00Z'
  },
  {
    id: '6',
    title: 'FitConnect - Community Fitness Platform',
    description: 'Join local fitness groups, find workout buddies, and discover new fitness activities in your area. Includes group challenges and progress tracking.',
    category: 'Health Tech',
    image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=500',
    author: {
      name: 'Alex Thompson',
      image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    createdAt: '2024-01-03T13:20:00Z'
  }
];

export default function Home() {
  const [startups, setStartups] = useState(mockStartups);
  const [filteredStartups, setFilteredStartups] = useState(mockStartups);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Mock user data - you can toggle this to test logged in/out states
  const mockUser = {
    name: 'John Doe',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
  };

  // For demo purposes, randomly set login status
  useEffect(() => {
    // You can change this logic based on your auth implementation
    setIsLoggedIn(Math.random() > 0.5);
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredStartups(startups);
      return;
    }

    const filtered = startups.filter(startup =>
      startup.title.toLowerCase().includes(query.toLowerCase()) ||
      startup.description.toLowerCase().includes(query.toLowerCase()) ||
      startup.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredStartups(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={isLoggedIn ? mockUser : null} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Amazing Startups
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Explore innovative startups from entrepreneurs around the world. Find the next big thing or share your own startup idea.
          </p>
          
          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Latest Startups
          </h2>
          <p className="text-gray-600">
            {filteredStartups.length} startup{filteredStartups.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Startup Grid */}
        {filteredStartups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStartups.map(startup => (
              <StartupCard key={startup.id} startup={startup} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No startups found matching your search.</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search terms.</p>
          </div>
        )}

        {/* Load More Button (for future pagination) */}
        {filteredStartups.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              Load More Startups
            </button>
          </div>
        )}
      </main>

      {/* Simple Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 StartupHub. Built with ❤️ for entrepreneurs.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}