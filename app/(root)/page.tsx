import Navbar from "@/components/Navbar-new";
import ClientMain from "@/components/ClientMain";
import { auth } from "@/auth";
import { sanityFetch } from "@/sanity/lib/live";
import { STARTUPS_QUERY, PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY  } from "@/sanity/lib/queries";
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
  const [ { select: editorPosts }] = await Promise.all([
    
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: 'editor-picks' })
  ]);
 

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={session?.user ? { name: session.user.name, image: session.user.image } : null} />
      <ClientMain startups={startups} />

      {editorPosts?.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Editor Picks</h2>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">Handpicked startups by our team. Discover some of the most promising ideas in the community.</p>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {editorPosts.map((post: StartupTypeCard, i: number) => (
              <li key={post._id || i} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition p-0">
                <StartupCard post={post} />
              </li>
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
    </div>
  );
} 