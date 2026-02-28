export async function fetchYouTubeVideos() {
  try {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

    if (!API_KEY || !CHANNEL_ID) {
      console.error("Missing YouTube env vars");
      return [];
    }

    const searchUrl =
      `https://www.googleapis.com/youtube/v3/search` +
      `?key=${API_KEY}` +
      `&channelId=${CHANNEL_ID}` +
      `&part=snippet,id` +
      `&order=date` +
      `&maxResults=12`;

    const res = await fetch(searchUrl, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("YouTube request failed:", errorText);
      return [];
    }

    const data = await res.json();

    if (!data.items) return [];

    const videos = data.items
      .filter((item: any) => item.id?.kind === "youtube#video")
      .map((item: any) => {
        const videoId = item.id.videoId;

        return {
          id: videoId,
          title: item.snippet.title,
          publishedAt: item.snippet.publishedAt,

          // 🔥 High quality thumbnail logic
          thumbnail:
            item.snippet.thumbnails?.maxres?.url ||
            item.snippet.thumbnails?.standard?.url ||
            item.snippet.thumbnails?.high?.url ||
            `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        };
      });

    return videos;

  } catch (err) {
    console.error("YouTube fetch crash:", err);
    return [];
  }
}