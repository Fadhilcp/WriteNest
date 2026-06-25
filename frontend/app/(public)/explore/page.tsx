import { IPost } from "@/types";
import { postService } from "@/services/post.service";
import PostCard from "@/components/blog/PostCard";
import { calculateReadTime } from "@/util/string.util";

export const dynamic = "force-dynamic";

function getInitials(name: string = ""): string {
  if (!name.trim()) return "?";
  return name.trim().slice(0, 2).toUpperCase();
}

async function getPosts(): Promise<IPost[]> {
  try {
    const res = await postService.getAll();
    return res.data || [];
  } catch (error) {
    return [];
  }
}

export default async function ExplorePage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12 md:px-8">
      {/* Explore Header */}
      <div className="mb-10 border-b border-border pb-6">
        <h1 className="font-serif text-[32px] font-medium leading-[1.1] -tracking-[0.5px] text-ink sm:text-[42px]">
          Explore Stories
        </h1>
        <p className="mt-3 text-[15px] text-ink-mid">
          Discover ideas, deep dives, and perspectives from writers across WriteNest.
        </p>
      </div>

      {/* Grid Layout */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <PostCard 
              key={post._id}
              post={post}
              calculateReadTime={calculateReadTime}
              getInitials={getInitials}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-[14px] border border-dashed border-border bg-surface px-8 py-20 text-center">
          <div className="mb-3 text-[36px]">🔍</div>
          <h3 className="mb-[6px] font-serif text-[18px] font-medium text-ink">
            No stories published yet
          </h3>
          <p className="text-[14px] text-ink-mid">
            Check back later to discover new writing.
          </p>
        </div>
      )}
    </div>
  );
}