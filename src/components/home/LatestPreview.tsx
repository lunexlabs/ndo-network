import Container from "../layout/Container";
import Link from "next/link";
import Image from "next/image";
import { fetchYouTubeVideos } from "@/src/lib/youtube";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt?: string;
}

export default async function LatestPreview() {
  const videos: Video[] = await fetchYouTubeVideos();

  return (
    <section className="py-28 bg-gray-50 border-t border-gray-200">
      <Container>
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Latest From The Channel
            </h2>
            <p className="text-gray-600">
              Fresh uploads, live streams, and walkthroughs.
            </p>
          </div>

          <Link
            href="/videos"
            className="text-sm font-medium text-black hover:text-red-500 transition"
          >
            View All →
          </Link>
        </div>

        {videos.length === 0 ? (
          <p className="text-gray-500 text-center">
            No videos available right now.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {videos.slice(0, 3).map((video: Video) => (
              <a
                key={video.id}
                href={`https://youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition" />

                  {/* Play icon on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="bg-white/90 rounded-full p-4 shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-black"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm font-medium text-gray-800 group-hover:text-red-600 transition line-clamp-2">
                  {video.title}
                </h3>
              </a>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <a
            href="https://youtube.com/@playwithndo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-md text-sm font-medium transition"
          >
            Subscribe on YouTube
          </a>
        </div>
      </Container>
    </section>
  );
}