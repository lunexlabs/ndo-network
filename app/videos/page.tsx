import Container from "../../src/components/layout/Container";
import FeaturedVideo from "../../src/components/videos/FeaturedVideo";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

async function getVideos(): Promise<Video[]> {
  const res = await fetch("http://localhost:3000/api/youtube", {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getBadge(title: string) {
  if (title.toLowerCase().includes("live"))
    return "LIVE";
  if (title.toLowerCase().includes("actv"))
    return "ACTV";
  return null;
}

export default async function VideosPage() {
  const videos = await getVideos();

  const [featured, ...rest] = videos;

  return (
    <section className="py-32">
      <Container>
        <h1 className="text-4xl font-bold mb-16">Latest Videos</h1>

        <FeaturedVideo video={featured} />

        <div className="grid md:grid-cols-3 gap-10">
          {rest.map((video) => {
            const badge = getBadge(video.title);

            return (
              <a
                key={video.id}
                href={`https://youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="relative aspect-video overflow-hidden rounded-xl mb-4 border border-black/10">
                  {badge && (
                    <span className="absolute top-3 left-3 bg-red-600 text-xs px-3 py-1 rounded-full z-10 text-white">
                      {badge}
                    </span>
                  )}

                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>

                <h3 className="text-sm font-medium text-black/80 group-hover:text-black transition mb-2">
                  {video.title}
                </h3>

                <p className="text-xs text-black/60">
                  {formatDate(video.publishedAt)}
                </p>
              </a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}