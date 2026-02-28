import Container from "../layout/Container";
import Link from "next/link";

export default function ACTVCTA() {
  return (
    <section className="py-28 border-t border-black/10">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Want To Compete?
          </h2>

          <p className="text-black/70 mb-8">
            Submit your island and join the next season of ACTV Island Edition.
          </p>

          <Link
            href="/community"
            className="bg-purple-600 hover:bg-purple-500 transition px-8 py-4 rounded-md text-sm font-medium text-white"
          >
            Submit Your Island
          </Link>
        </div>
      </Container>
    </section>
  );
}