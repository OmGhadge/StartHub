import { client } from "@/sanity/lib/client";
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownit from 'markdown-it';
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import Image from "next/image";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import Navbar from "@/components/Navbar-new";
import { auth } from "@/auth";

const md = markdownit();

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();
  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: 'editor-picks' })
  ]);

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={session?.user ? { name: session.user.name, image: session.user.image } : null} />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">{formatDate(post?._createdAt)}</span>
            <span className="inline-block px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-semibold">{post.category}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-left break-words">{post.title}</h1>
          <p className="text-gray-600 mb-6 text-left text-base">{post.description}</p>
        </div>
        <div className="mb-8">
          <img
            src={post.image}
            alt="thumbnail"
            className="w-full h-auto rounded-xl border border-gray-200"
          />
        </div>
        <div className="flex items-center gap-4 mb-8">
          <Link href={`/user/${post.author?._id}`} className="flex items-center gap-3">
            <Image
              src={post.author.image}
              alt="avatar"
              width={48}
              height={48}
              className="rounded-full border border-gray-300"
            />
            <div>
              <p className="font-semibold text-gray-900">{post.author.name}</p>
              <p className="text-xs text-gray-500">@{post.author.username}</p>
            </div>
          </Link>
        </div>
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Pitch Details</h2>
          {parsedContent ? (
            <article
              className="prose max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="text-gray-400 text-sm font-normal">No details provided</p>
          )}
        </section>
        {/* {editorPosts?.length > 0 && (
          <section className="mb-10">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Editor Picks</h3>
            <ul className="grid sm:grid-cols-2 gap-5">
              {editorPosts.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </section>
        )} */}
        <Suspense fallback={<Skeleton className="bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3" />}>
          <View id={id} />
        </Suspense>
      </main>
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} StartupHub. Built with ❤️ for entrepreneurs.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Page;