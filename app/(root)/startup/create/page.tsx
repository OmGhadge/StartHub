import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar-new";

const page = async () => {
  const session = await auth();
  if (!session) redirect("/");
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={session?.user ? { name: session.user.name, image: session.user.image } : null} />
      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">Submit Your Startup</h1>
        <p className="text-gray-600 mb-8 text-center max-w-xl mx-auto">
          Share your idea with the world. Fill out the form below to pitch your startup to the community.
        </p>
        <StartupForm />
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

export default page;