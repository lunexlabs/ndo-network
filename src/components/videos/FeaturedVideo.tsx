interface Video {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function FeaturedVideo({ video }: { video: Video }) {
  if (!video) return null;

  return (
    <div className="mb-20">
      <h2 className="text-sm uppercase tracking-widest text-purple-400 mb-6">
        Featured
      </h2>

      <a
        href={`https://youtube.com/watch?v=${video.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="aspect-video rounded-xl overflow-hidden border border-black/10">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition"
            />
          </div>

          <div>
            <h3 className="text-3xl font-bold mb-4 group-hover:text-purple-400 transition">
              {video.title}
            </h3>

            <p className="text-black/70 mb-6">
              {formatDate(video.publishedAt)}
            </p>

            <span className="text-sm text-purple-400">
              Watch on YouTube →
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}