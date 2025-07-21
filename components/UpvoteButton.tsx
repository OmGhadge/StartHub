"use client";
import { useState } from "react";
import { upvoteStartup } from "@/lib/actions";
import { ThumbsUp } from "lucide-react";

export default function UpvoteButton({ startupId, initialUpvotes }: { startupId: string; initialUpvotes: number }) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [loading, setLoading] = useState(false);
  const [voted, setVoted] = useState(false);

  const handleUpvote = async () => {
    if (loading || voted) return;
    setLoading(true);
    try {
      const newUpvotes = await upvoteStartup(startupId);
      setUpvotes(newUpvotes);
      setVoted(true);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleUpvote}
      disabled={loading || voted}
      className={`flex items-center gap-1 px-2 py-1 rounded-full border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 transition text-xs font-semibold disabled:opacity-60 ${voted ? 'bg-gray-200' : ''}`}
      aria-label="Upvote"
    >
      <ThumbsUp className="w-4 h-4" />
      <span>{upvotes}</span>
      {voted ? <span className="sr-only">Voted</span> : null}
    </button>
  );
} 