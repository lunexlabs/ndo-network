import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 mt-24 py-10 text-sm text-black/60">
      <Container>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <p>© {new Date().getFullYear()} NDO Network</p>
          <p>All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}