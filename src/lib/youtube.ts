export async function fetchYouTubeVideos() {
  try {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

    if (!API_KEY || !CHANNEL_ID) {
      console.error("Missing YouTube env vars");
      return [];
    }

    const url =
      `https://www.googleapis.com/youtube/v3/search` +
      `?key=${API_KEY}` +
      `&channelId=${CHANNEL_ID}` +
      `&part=snippet,id` +
      `&order=date` +
      `&maxResults=12`;

    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("YouTube request failed");
      return [];
    }

    const data = await res.json();

    return data.items
      ?.filter((item: any) => item.id?.kind === "youtube#video")
      .map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails?.high?.url,
        publishedAt: item.snippet.publishedAt,
      })) ?? [];

  } catch (err) {
    console.error("YouTube fetch crash:", err);
    return [];
  }
}