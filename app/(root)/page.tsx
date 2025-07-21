import Navbar from "@/components/Navbar-new";
import ClientMain from "@/components/ClientMain";
import { auth } from "@/auth";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY, PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY, MOST_LIKED_STARTUPS_QUERY, RECENTLY_FUNDED_STARTUPS_QUERY } from "@/sanity/lib/queries";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";

export default async function MainPage({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = await searchParams?.query || null;
  const session = await auth();
  const { data: startups } = await sanityFetch({
    query: STARTUPS_QUERY,
    params: { search: query },
  });
  const [ { select: editorPosts }, mostLiked, recentlyFunded ] = await Promise.all([
    
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: 'editor-picks' }),
    sanityFetch({ query: MOST_LIKED_STARTUPS_QUERY, params: {} }),
    sanityFetch({ query: RECENTLY_FUNDED_STARTUPS_QUERY, params: {} }),
  ]);
 

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={session?.user ? { name: session.user.name, image: session.user.image, id: session.id } : null} />
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Welcome to StartupHub</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">Discover, upvote, and explore the best startups in the community. See what’s trending, recently funded, and handpicked by our editors.</p>
        <a href="/startups" className="inline-block bg-black text-white font-semibold rounded-full px-8 py-3 text-lg shadow hover:bg-gray-900 transition">Browse All Startups</a>
      </section>

      {mostLiked?.data?.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Most Liked Startups</h2>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">Startups with the most upvotes from the community.</p>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mostLiked.data.map((post: StartupTypeCard, i: number) => (
              <StartupCard key={post._id || i} post={post} user={session?.user ? { name: session.user.name, image: session.user.image } : null} />
            ))}
          </ul>
        </section>
      )}

      {recentlyFunded?.data?.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Recently Funded Startups</h2>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">The latest startups to secure funding.</p>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentlyFunded.data.map((post: StartupTypeCard, i: number) => (
              <StartupCard key={post._id || i} post={post} user={session?.user ? { name: session.user.name, image: session.user.image } : null} />
            ))}
          </ul>
        </section>
      )}

      {editorPosts?.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Editor Picks</h2>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">Handpicked startups by our team. Discover some of the most promising ideas in the community.</p>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {editorPosts.map((post: StartupTypeCard, i: number) => (
              <StartupCard key={post._id || i} post={post} user={session?.user ? { name: session.user.name, image: session.user.image } : null} />
            ))}
          </ul>
        </section>
      )}

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} StartupHub. Built with ❤️ for entrepreneurs.</p>
          </div>
        </div>
      </footer>
      <SanityLive/>
    </div>
  );
} 