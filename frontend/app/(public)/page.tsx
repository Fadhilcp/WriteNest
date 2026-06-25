import Link from "next/link";
import Image from "next/image";
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

export default async function LandingPage() {
  const posts = await getPosts();
  
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      {/* Hero Section */}
      <div className="mx-auto max-w-[720px] px-8 pt-[72px] pb-12 text-center">
        <span className="mb-4 inline-block text-[11px] font-medium uppercase tracking-[0.12em] text-accent-warm">
          A home for thoughtful writing
        </span>
        <h1 className="mb-[18px] font-serif text-[34px] font-medium leading-[1.1] -tracking-[1.5px] text-ink sm:text-[52px]">
          Where ideas find their <em className="font-serif not-italic text-accent-warm">voice</em>
        </h1>
        <p className="mx-auto mb-8 max-w-[480px] text-[16px] leading-[1.7] text-ink-mid">
          WriteNest is a calm space for long-form writing. Read without an
          account. Write when you&apos;re ready.
        </p>
        <div className="flex justify-center gap-[10px]">
          <Link 
            href="/my-posts" 
            className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-ink px-6 py-[10px] text-[14px] font-medium leading-none text-surface no-underline transition-opacity duration-150 hover:opacity-85"
          >
            Start writing →
          </Link>
        </div>
      </div>

      {/* Stories Section */}
      <div className="mx-auto max-w-[1040px] px-8 pb-16" id="stories">

        {/* Featured Blog Post */}
        {featured && (
          <Link 
            href={`/blogs/${featured._id}`} 
            className="mb-10 grid grid-cols-1 overflow-hidden rounded-[14px] border border-border bg-surface no-underline text-inherit transition-all duration-200 hover:border-border-dark hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] sm:grid-cols-[1fr_420px]"
          >
            <div className="flex flex-col justify-center p-10">
              <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.12em] text-accent-warm">
                ⭐ Editor&apos;s pick
              </div>
              <h2 className="mb-[14px] font-serif text-[30px] font-medium leading-[1.2] -tracking-[0.8px]">
                {featured.title}
              </h2>
              {featured.content && (
                <p className="mb-6 line-clamp-3 text-[14px] leading-[1.7] text-ink-mid">
                  {featured.content.replace(/[#*`_>]/g, "").slice(0, 160)}...
                </p>
              )}
              
              <div className="mb-5 flex items-center gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-alt text-[11px] font-medium text-ink-mid">
                  {getInitials(featured.author?.name)}
                </div>
                <div>
                  <div className="text-[12px] font-medium text-ink-mid">
                    {featured.author?.name || "Anonymous Author"}
                  </div>
                  <div className="text-[11px] text-ink-light">
                    {calculateReadTime(featured.content)} · {new Date(featured.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                </div>
              </div>

              <span className="inline-flex w-fit items-center gap-[6px] rounded-lg border border-border bg-bg px-4 py-2 text-[13px] font-medium text-ink transition-all duration-150 hover:bg-surface-alt">
                Read story →
              </span>
            </div>
            
            <div className="relative flex h-[240px] items-center justify-center bg-surface-alt text-[64px] sm:h-auto min-h-[200px]">
              {featured.image ? (
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover"
                  sizes="(max-w-640px) 100vw, 420px"
                  priority
                />
              ) : (
                <span>📝</span>
              )}
            </div>
          </Link>
        )}

        {/* Grid Stories List */}
        {rest.length > 0 && (
          <>
            <div className="mb-7 flex items-baseline justify-between border-b border-border pb-4">
              <h2 className="font-serif text-[22px] font-medium -tracking-[0.5px]">
                Latest stories
              </h2>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(288px,1fr))] gap-6">
              {rest.map((post) => (
                <PostCard 
                  key={post._id}
                  post={post}
                  calculateReadTime={calculateReadTime}
                  getInitials={getInitials}
                />
              ))}
            </div>
          </>
        )}

        {/* Empty State Container */}
        {posts.length === 0 && (
          <div className="rounded-[14px] border border-dashed border-border bg-surface px-8 py-16 text-center">
            <div className="mb-3 text-[36px]">✍️</div>
            <h3 className="mb-[6px] font-serif text-[17px] font-medium">
              No stories yet
            </h3>
            <p className="mb-5 text-[13px] text-ink-mid">
              Be the first to publish something worth reading.
            </p>
            <Link 
              href="/my-posts" 
              className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-ink px-6 py-[10px] text-[14px] font-medium leading-none text-surface no-underline transition-opacity duration-150 hover:opacity-85"
            >
              Start writing
            </Link>
          </div>
        )}
      </div>
    </>
  );
}