import Container from "../layout/Container";
import Link from "next/link";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

/* ----------------------------------
   SAFE SERVER FETCH
----------------------------------- */

async function getVideos(): Promise<Video[]> {
  try {
    // ✅ Use relative path (works in dev + production)
    const res = await fetch("/api/youtube", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("YouTube API response not OK:", res.status);
      return [];
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("YouTube API returned unexpected data");
      return [];
    }

    return data.slice(0, 3);

  } catch (err) {
    // ✅ Prevent SSR crash
    console.error("YouTube fetch failed:", err);
    return [];
  }
}

/* ----------------------------------
   COMPONENT
----------------------------------- */

export default async function LatestPreview() {
  const videos = await getVideos();

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
            {videos.map((video) => (
              <a
                key={video.id}
                href={`https://youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>

                <h3 className="text-sm font-medium text-gray-800 group-hover:text-red-600 transition">
                  {video.title}
                </h3>
              </a>
            ))}
          </div>
        )}

        {/* Subscribe CTA */}
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