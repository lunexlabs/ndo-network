import Image from "next/image";

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
    return null;
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
            className="min-w-[300px] group"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 mb-3">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                sizes="300px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition" />

              {/* Play Icon */}
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
            <p className="text-sm text-white/80 group-hover:text-white transition line-clamp-2">
              {video.title}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}