"use client";
import { useEffect, useMemo, useState } from "react";
import ClientMain from "@/components/ClientMain";

export default function StartupsClient({
  startups,
  user,
  categories,
  statuses,
}: {
  startups: any[];
  user?: { name: string; image: string } | null;
  categories: string[];
  statuses: string[];
}) {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  

  const filteredStartups = useMemo(() => {
    return startups.filter((s: any) =>
      (!category || s.category === category) &&
      (!status || s.status === status)
    );
  }, [category, status, startups]);


  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">All Startups</h1>
          <p className="text-gray-600 text-base max-w-2xl">
            Browse and filter all startups in the directory.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 items-center">
          {categories.length > 0 && (
            <div className="flex items-center gap-2">
              <label htmlFor="category" className="text-gray-700 font-medium">
                Category:
              </label>
              <select
                id="category"
                name="category"
                value={category}
                className="border border-gray-300 rounded-md px-3 py-2 text-base bg-white focus:border-black focus:ring-2 focus:ring-black"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All</option>
                {categories.map((cat: string) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          )}
          {statuses.length > 0 && (
            <div className="flex items-center gap-2">
              <label htmlFor="status" className="text-gray-700 font-medium">
                Status:
              </label>
              <select
                id="status"
                name="status"
                value={status}
                className="border border-gray-300 rounded-md px-3 py-2 text-base bg-white focus:border-black focus:ring-2 focus:ring-black"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All</option>
                {statuses.map((stat: string) => (
                  <option key={stat} value={stat}>
                    {stat}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
      <ClientMain startups={filteredStartups} user={user} />
    </>
  );
}
