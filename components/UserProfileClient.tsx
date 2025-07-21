"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Mail, Twitter, Linkedin, Globe, ArrowLeft, Pencil, LogOut } from "lucide-react";
import { Modal, ModalTrigger, ModalContent, ModalTitle, ModalClose } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Suspense } from "react";
import { StartupCardSkeleton } from "@/components/StartupCard";
import UserStartups from "@/components/UserStartups";
import { updateAuthor } from "@/lib/actions";
import { toast } from "sonner";
import { serverSignOut } from "@/components/auth-actions";

export default function UserProfileClient({ user, session, id }: {
  user: any;
  session: any;
  id: string;
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: user.name || "",
    bio: user.bio || "",
    twitter: user.twitter || "",
    linkedin: user.linkedin || "",
    website: user.website || "",
  });

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await updateAuthor(user._id, profile);
    setSaving(false);
    if (res.status === "SUCCESS") {
      toast("Profile updated successfully");
      setEditOpen(false);
      // Optionally update UI with new values
      setProfile((prev) => ({ ...prev }));
      window.location.reload(); // For now, reload to reflect changes everywhere
    } else {
      toast.error("Failed to update profile: " + (res.error || "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center mb-12 relative">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => (window.history.length > 1 ? window.history.back() : window.location.assign("/"))}
          className="absolute left-4 top-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-black"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        {/* Edit Profile Button (only for self) */}
        {session?.id === id && (
          <Modal open={editOpen} onOpenChange={setEditOpen}>
            <ModalTrigger>
              <button
                type="button"
                className="absolute right-4 top-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-black flex items-center gap-1"
                aria-label="Edit Profile"
              >
                <Pencil className="w-5 h-5 text-gray-700" />
                <span className="sr-only">Edit Profile</span>
              </button>
            </ModalTrigger>
            <ModalContent>
              <ModalTitle>Edit Profile</ModalTitle>
              <form className="space-y-4" onSubmit={handleEditSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <Input name="name" value={profile.name} onChange={handleEditChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <Textarea name="bio" value={profile.bio} onChange={handleEditChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                  <Input name="twitter" value={profile.twitter} onChange={handleEditChange} placeholder="https://twitter.com/username" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                  <Input name="linkedin" value={profile.linkedin} onChange={handleEditChange} placeholder="https://linkedin.com/in/username" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <Input name="website" value={profile.website} onChange={handleEditChange} placeholder="https://yourwebsite.com" />
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <ModalClose>
                    <button type="button" className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700">Cancel</button>
                  </ModalClose>
                  <button type="submit" className="px-4 py-2 rounded-md bg-black text-white font-semibold hover:bg-gray-900" disabled={saving}>
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </ModalContent>
          </Modal>
        )}
        {/* Logout Button (only for self) */}
        {session?.id === id && (
          <form action={serverSignOut} className="absolute right-4 top-4">
            <button
              type="submit"
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-black flex items-center gap-1"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5 text-red-500" />
              <span className="sr-only">Logout</span>
            </button>
          </form>
        )}
        <Image
          src={user.image}
          alt={user.name}
          width={128}
          height={128}
          className="rounded-full border-4 border-gray-200 shadow mb-4 object-cover"
        />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 text-center break-words">{user.name}</h1>
        <p className="text-gray-500 text-base mb-2 text-center">@{user.username}</p>
        {user.bio && <p className="text-gray-700 text-center mb-4 max-w-xl">{user.bio}</p>}
        {/* Connect with Author section */}
        <div className="flex flex-col items-center gap-2 mt-2 w-full">
          <span className="text-gray-500 text-sm mb-1">Connect with {user.name?.split(" ")[0] || "Author"}</span>
          <div className="flex gap-3 justify-center">
            {user.email && (
              <a href={`mailto:${user.email}`} className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition" title="Email">
                <Mail className="w-5 h-5 text-gray-700" />
              </a>
            )}
            {user.twitter && (
              <a href={user.twitter} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 transition" title="Twitter">
                <Twitter className="w-5 h-5 text-blue-500" />
              </a>
            )}
            {user.linkedin && (
              <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 transition" title="LinkedIn">
                <Linkedin className="w-5 h-5 text-blue-700" />
              </a>
            )}
            {user.website && (
              <a href={user.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition" title="Website">
                <Globe className="w-5 h-5 text-gray-700" />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">{session?.id === id ? "Your" : `${user.name}'s`} Startups</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Suspense fallback={<StartupCardSkeleton />}>
            <UserStartups id={id} />
          </Suspense>
        </ul>
      </div>
    </div>
  );
} 