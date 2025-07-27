import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity/types";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatDate } from "@/lib/utils";
import UpvoteButton from "@/components/UpvoteButton";
export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post, user }: { post: StartupTypeCard, user?: { name: string; image: string } | null }) => {
  const { _createdAt, views, author, title, category, _id, image, description, upvotes } = post;

  return (
    <li className="bg-white border border-gray-200 py-6 px-5 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.025] hover:border-black transition-all duration-300 group">
      <div className="flex justify-between items-center">
        <p className="font-medium text-sm bg-gray-100 px-4 py-1 rounded-full group-hover:bg-white border border-gray-100">
          {formatDate(_createdAt)}
        </p>
        <div className="flex gap-1.5 items-center">
        
          <EyeIcon className="size-5 text-gray-400" />
          <span className="font-medium text-sm text-gray-700">{views}</span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-5 gap-3">
        <div className="flex-1 min-w-0">
          <Link href={`/user/${author?._id}`}>
            <p className="font-medium text-base text-gray-900 truncate hover:underline">{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-xl font-bold text-gray-900 truncate hover:text-black transition">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image src={author?.image!} alt={author?.name!} width={48} height={48} className="rounded-full border-2 border-gray-300 shadow" />
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className="font-normal text-sm line-clamp-2 my-3 text-gray-600 break-all">{description}</p>
        <img src={image} alt="placeholder" className="w-full h-40 rounded-lg object-cover border border-gray-100" />
      </Link>
      <div className="flex justify-between items-center gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-900 hover:text-white transition">{category}</p>
        </Link>
        {typeof upvotes !== "undefined" && user ? (
          <UpvoteButton startupId={_id} initialUpvotes={upvotes} />
        ) : typeof upvotes !== "undefined" ? (
          <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-900 text-xs font-semibold">Upvotes: {upvotes}</span>
        ) : null}
        <Button className="rounded-full bg-black font-medium text-base text-white px-5 py-2 shadow hover:bg-gray-900 transition" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="w-full h-96 rounded-2xl bg-zinc-300" />
      </li>
    ))}
  </>
);

export default StartupCard;