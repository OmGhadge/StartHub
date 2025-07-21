import Navbar from "@/components/Navbar-new";
import StartupsClient from "@/components/StartupsClient";
import { auth } from "@/auth";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { ALL_STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function StartupsPage() {
  const session = await auth();
  const { data: startups } = await sanityFetch({
    query: ALL_STARTUPS_QUERY,
    params: {},
  });
  const categories: string[] = Array.from(new Set(startups.map((s: any) => s.category).filter(Boolean)));
  const statuses: string[] = Array.from(new Set(startups.map((s: any) => s.status).filter(Boolean)));
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={session?.user ? { name: session.user.name, image: session.user.image, id: session.id } : null} />
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <StartupsClient
          startups={startups}
          user={session?.user ? { name: session.user.name, image: session.user.image } : null}
          categories={categories}
          statuses={statuses}
        />
      </main>
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