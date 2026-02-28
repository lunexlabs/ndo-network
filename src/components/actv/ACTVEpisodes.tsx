import Container from "../layout/Container";

const episodes = [
  {
    number: 1,
    title: "Episode 1 — The Opening Showcase",
    description:
      "Three creators debut their island designs in the first official ACTV competition.",
  },
];

export default function ACTVEpisodes() {
  return (
    <section className="py-24 border-t border-black/10">
      <Container>
        <h2 className="text-3xl font-bold mb-12">Episodes</h2>

        <div className="space-y-8">
          {episodes.map((episode) => (
            <div
              key={episode.number}
              className="p-8 border border-black/10 rounded-xl bg-black/5"
            >
              <h3 className="text-xl font-semibold mb-2">
                {episode.title}
              </h3>
              <p className="text-black/70">
                {episode.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}