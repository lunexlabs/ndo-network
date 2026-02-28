import Container from "../../../src/components/layout/Container";
import SubmissionForm from "../../../src/components/actv/SubmissionForm";

export default function ACTVSubmitPage() {
  return (
    <section className="relative bg-black text-white min-h-screen overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(255,180,0,0.15),transparent_60%)]" />

      {/* Content Layer */}
      <div className="relative z-10 py-32">
        <Container>

          {/* Hero Header */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <span className="text-xs uppercase tracking-widest text-amber-400 mb-4 block">
              Season 1 Casting
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Submit Your Island to ACTV
            </h1>

            <p className="text-white/70 max-w-xl mx-auto">
              Think your island deserves the spotlight? Apply for a chance
              to be featured in Season 1.
            </p>
          </div>

          <SubmissionForm />

        </Container>
      </div>
    </section>
  );
}