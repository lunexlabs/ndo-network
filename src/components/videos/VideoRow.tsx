interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

interface Props {
  title: string;
  videos?: Video[];
}

export default function VideoRow({ title, videos = [] }: Props) {
  if (!Array.isArray(videos) || videos.length === 0) {
    return null; // Skip empty playlists
  }

  return (
    <div className="mb-20">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>

      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {videos.map((video) => (
          <a
            key={video.id}
            href={`https://youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-[280px] group"
          >
            <div className="aspect-video rounded-xl overflow-hidden border border-white/10 mb-3">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
            </div>

            <p className="text-sm text-white/80 group-hover:text-white transition">
              {video.title}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}