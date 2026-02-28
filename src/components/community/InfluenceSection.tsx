import Container from "../layout/Container";

export default function InfluenceSection() {
  return (
    <section className="py-24 border-t border-black/10">
      <Container>
        <h2 className="text-3xl font-bold mb-12">
          Influence The Channel
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          
          <div className="p-8 border border-black/10 rounded-xl bg-white/5">
            <h3 className="text-xl font-semibold mb-4">
              Vote & Decide
            </h3>
            <p className="text-black/70">
              Vote on ACTV competitions, help determine episode outcomes,
              and shape seasonal champions.
            </p>
          </div>

          <div className="p-8 border border-black/10 rounded-xl bg-white/5">
            <h3 className="text-xl font-semibold mb-4">
              Suggest Future Content
            </h3>
            <p className="text-black/70">
              Propose new games, challenge ideas, walkthrough series,
              and special event formats.
            </p>
          </div>

        </div>
      </Container>
    </section>
  );
}