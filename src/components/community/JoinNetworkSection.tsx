import Container from "../layout/Container";

export default function JoinNetworkSection() {
  return (
    <section className="py-32 border-t border-black/10 text-center">
      <Container>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Join The NDO Network
          </h2>

          <p className="text-black/70 mb-10">
            Connect through Discord, subscribe on YouTube, and become part
            of a growing gaming community built around interactive formats.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://discord.gg/3WkK9GUc8B"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-500 transition px-8 py-4 rounded-md text-sm font-medium text-white"
            >
              Join Discord
            </a>

            <a
              href="https://youtube.com/@playwithndo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-500 transition px-8 py-4 rounded-md text-sm font-medium text-white"
            >
              Subscribe on YouTube
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}