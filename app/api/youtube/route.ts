import { NextResponse } from "next/server";

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

export async function GET() {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=12`,
      { next: { revalidate: 3600 } }
    );

    const data = await res.json();

    if (!data.items) return NextResponse.json([]);

    const videos = data.items
      .filter((item: any) => item.id.kind === "youtube#video")
      .map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt,
      }));

    return NextResponse.json(videos);
  } catch (error) {
    console.error("YouTube API Error:", error);
    return NextResponse.json([], { status: 500 });
  }
}