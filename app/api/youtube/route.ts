import { NextResponse } from "next/server";

export async function GET() {
  try {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

    if (!API_KEY || !CHANNEL_ID) {
      console.error("Missing YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID");
      return NextResponse.json([]);
    }

    const youtubeUrl =
      `https://www.googleapis.com/youtube/v3/search` +
      `?key=${API_KEY}` +
      `&channelId=${CHANNEL_ID}` +
      `&part=snippet,id` +
      `&order=date` +
      `&maxResults=12`;

    const res = await fetch(youtubeUrl, {
      // Cache YouTube results for 1 hour
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("YouTube API request failed:", errorText);
      return NextResponse.json([]);
    }

    const data = await res.json();

    if (!data.items || !Array.isArray(data.items)) {
      console.error("Unexpected YouTube response:", data);
      return NextResponse.json([]);
    }

    const videos = data.items
      .filter((item: any) => item.id?.kind === "youtube#video")
      .map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails?.high?.url,
        publishedAt: item.snippet.publishedAt,
      }));

    return NextResponse.json(videos);

  } catch (error) {
    console.error("YouTube API crash:", error);
    return NextResponse.json([]);
  }
}