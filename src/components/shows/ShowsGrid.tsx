import Container from "../layout/Container";
import Link from "next/link";

const shows = [
  {
    title: "ACTV: Island Edition",
    description:
      "A competitive island showcase series featuring community voting and seasonal champions.",
    href: "/actv",
    status: "Coming Soon",
  },
];

export default function ShowsGrid() {
  return (
    <section className="py-24 border-t border-black/10">
      <Container>
        <div className="grid md:grid-cols-2 gap-12">
          {shows.map((show) => (
            <Link
              key={show.title}
              href={show.href}
              className="group p-10 border border-black/10 rounded-xl bg-white/5 hover:bg-white/10 transition"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold group-hover:text-green-400 transition">
                  {show.title}
                </h2>

                <span className="text-xs bg-red-600/90 border border-red-500/30 px-3 py-1 rounded-full text-white">
                  {show.status}
                </span>
              </div>

              <p className="text-black/70">
                {show.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-20 text-center text-black/40 text-sm">
          More original formats coming soon.
        </div>
      </Container>
    </section>
  );
}