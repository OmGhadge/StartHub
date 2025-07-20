import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const session = await auth();
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      <section className="w-full py-12 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">GC Directory</h1>
        <p className="text-gray-600 mb-6">Pitch your startup, connect with others, and grow together.</p>
        <div className="max-w-md mx-auto mb-8">
          <SearchForm query={query} />
        </div>
      </section>
      <section className="w-full max-w-3xl mx-auto px-4 pb-12">
        <h2 className="text-xl font-semibold mb-4 text-left">
          {query ? `Search results for "${query}"` : "All Startups"}
        </h2>
        <ul className="space-y-6">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <li key={post?._id}>
                <StartupCard post={post} />
              </li>
            ))
          ) : (
            <p className="text-gray-400 text-base font-normal">No startups found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}