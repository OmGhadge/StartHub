import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StartHub",
  description: "Discover, share, and upvote innovative startups on StartHub.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white min-h-screen font-sans text-gray-900">
        {children}
      </body>
    </html>
  );
}
