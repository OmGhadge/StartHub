'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search startups by name, category, or description..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-20 h-12 text-lg border-2 border-gray-200 focus:border-blue-500 transition-colors"
          />
          <Button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
            size="sm"
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
}