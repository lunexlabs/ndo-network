import Container from "../../../src/components/layout/Container";
import SubmissionForm from "../../../src/components/actv/SubmissionForm";

export default function ACTVSubmitPage() {
  return (
    <section className="relative bg-black text-white min-h-screen overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(255,180,0,0.15),transparent_60%)]" />

      <div className="relative z-10 py-32">
        <Container>

          {/* HERO */}
          <div className="max-w-3xl mx-auto text-center mb-20">

            <span className="text-xs uppercase tracking-widest text-amber-400 mb-4 block">
              Season 1 Casting
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Submit Your Island to ACTV
            </h1>

            <p className="text-white/70 max-w-xl mx-auto">
              Each episode of ACTV tours three incredible islands searching
              for creativity, storytelling, and design. If your island
              stands out, it could appear on the show.
            </p>

          </div>

          {/* REQUIREMENTS */}
          <div className="max-w-5xl mx-auto mb-24">

            <h2 className="text-2xl font-semibold mb-10 text-center">
              Submission Requirements
            </h2>

            <div className="grid md:grid-cols-2 gap-10 text-white/80">

              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">
                  Dream Address Required
                </h3>
                <p>
                  Your island must have a public Dream Address so it can be
                  toured during filming.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">
                  Mostly Complete Island
                </h3>
                <p>
                  Islands should be about 80–90% finished with developed
                  areas and thoughtful design.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">
                  Clear Theme or Concept
                </h3>
                <p>
                  The strongest islands usually have a theme such as a
                  kingdom, city, jungle, fantasy world, or story-driven design.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">
                  No Modded Islands
                </h3>
                <p>
                  Modded islands or hacked items are not allowed in order to
                  keep the competition fair.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">
                  Screenshots Required
                </h3>
                <p>
                  Submit 3–5 screenshots showing your best areas so the ACTV
                  team can preview your island.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">
                  Active Dream Address
                </h3>
                <p>
                  Your dream address must be accessible when the episode is
                  recorded.
                </p>
              </div>

            </div>
          </div>

          {/* RATING SYSTEM */}
          <div className="max-w-4xl mx-auto text-center mb-24">

            <h2 className="text-2xl font-semibold mb-8">
              ACTV Rating System
            </h2>

            <p className="text-white/70 mb-10">
              Islands featured on the show are scored using the ACTV rating
              meter across several categories.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-white/80 text-sm">

              <div className="border border-white/10 rounded-lg py-4">
                Creativity
              </div>

              <div className="border border-white/10 rounded-lg py-4">
                Design
              </div>

              <div className="border border-white/10 rounded-lg py-4">
                Theme
              </div>

              <div className="border border-white/10 rounded-lg py-4">
                Storytelling
              </div>

              <div className="border border-white/10 rounded-lg py-4">
                Overall Impact
              </div>

            </div>

          </div>

          {/* FORM */}
          <SubmissionForm />

        </Container>
      </div>

    </section>
  );
}