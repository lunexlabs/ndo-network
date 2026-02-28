import Container from "../../src/components/layout/Container";
import Link from "next/link";

export default function PartnerPage() {
  return (
    <>
      {/* =========================
          HERO IMAGE HEADER
      ========================== */}
      <section className="relative h-[520px] flex items-center overflow-hidden border-b border-gray-200">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/partners/partner-header.jpg')",
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

        {/* Content */}
        
        <Container>
          <div className="relative max-w-3xl text-white">
            <span className="text-sm uppercase tracking-widest text-orange-300 mb-6 block">
              Brand Partnerships
            </span>

            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Partner With NDO
            </h1>

            <p className="text-lg text-gray-200 leading-relaxed">
              NDO integrates brands into structured gaming entertainment —
              live streams, competitive formats, and long-form digital series.
              We don’t just place logos. We build integration into the content.
            </p>
          </div>
        </Container>
      </section>

      {/* =========================
          WHAT WE OFFER
      ========================== */}
      <section className="py-28 bg-gray-50 border-b border-gray-200">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-16">
            Integration Opportunities
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Live Stream Placement
              </h3>
              <p className="text-gray-600">
                Brand mentions, live integration, and natural placement during
                high-engagement gameplay sessions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Show Sponsorship (ACTV)
              </h3>
              <p className="text-gray-600">
                Integrated sponsorship within structured formats including
                title sponsorship, segment integration, and seasonal placement.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Long-Form Feature Integration
              </h3>
              <p className="text-gray-600">
                Extended integrations inside walkthroughs and series-based
                content with consistent visibility.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Custom Campaign Builds
              </h3>
              <p className="text-gray-600">
                Tailored concepts developed specifically around your brand
                goals and audience alignment.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================
          WHY NDO
      ========================== */}
      <section className="py-28 bg-white border-b border-gray-200">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why NDO
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              NDO is built around personality-driven gaming entertainment.
              Content is structured, series-based, and community-engaged —
              creating consistent audience retention and recognizable formats.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Partnerships are integrated naturally into the experience,
              maintaining authenticity while delivering meaningful brand
              exposure.
            </p>
          </div>
        </Container>
      </section>

      {/* =========================
          CONTACT CTA
      ========================== */}
      <section className="py-28 bg-gray-50">
        <Container>
          <div className="max-w-3xl text-center mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Let’s Build Something Together
            </h2>

            <p className="text-gray-600 mb-10">
              For partnership inquiries, campaign proposals, or media
              discussions, reach out directly.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-md text-sm font-medium transition"
            >
              Contact NDO
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}