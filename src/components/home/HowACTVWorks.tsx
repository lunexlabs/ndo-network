import Container from "../layout/Container";

const steps = [
  {
    number: "01",
    title: "Three Islands Per Episode",
    description:
      "Each episode features three unique island tours showcasing creativity, design themes, and hidden details.",
  },
  {
    number: "02",
    title: "Community Voting",
    description:
      "After the tours air, viewers vote for their favorite island. The community decides who advances.",
  },
  {
    number: "03",
    title: "Season Champion",
    description:
      "Winners move forward through the season. At the finale, one island earns the ACTV crown and prize.",
  },
];

export default function HowACTVWorks() {
  return (
    <section className="py-28 border-t border-black/10">
      <Container>
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-widest text-purple-400 mb-4">
            Format
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            How ACTV Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative p-8 border border-black/10 rounded-xl bg-white/5 backdrop-blur-md"
            >
              <span className="absolute -top-5 left-8 text-6xl font-bold text-black/76 select-none">
                {step.number}
              </span>

              <h3 className="text-xl font-semibold mb-4 relative z-10">
                {step.title}
              </h3>

              <p className="text-black/70 relative z-10">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}