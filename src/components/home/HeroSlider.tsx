"use client";

import { useEffect, useState } from "react";
import Container from "../layout/Container";
import Link from "next/link";

const slides = [

  {
    title: "ACTV: Island Edition",
    description:
      "Competitive island showcases where the community decides the winner.",
    image:
      "/images/actv/season1-placeholder.jpg",
    buttonText: "Explore ACTV",
    href: "/actv",
  },
  {
    title: "Full Game Walkthroughs",
    description:
      "Structured playthroughs and 100% completions across major titles.",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600",
    buttonText: "Browse Videos",
    href: "/videos",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[index];

  return (
    <section className="relative h-[75vh] overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${slide.image})` }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <Container>
        <div className="relative z-10 h-[75vh] flex flex-col justify-center max-w-2xl text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {slide.title}
          </h1>

          <p className="text-lg mb-8 text-white/80">
            {slide.description}
          </p>

          {/* Fixed Button Width */}
          <Link
            href={slide.href}
            className="inline-flex w-fit items-center justify-center bg-green-600 hover:bg-green-500 transition px-8 py-3 rounded-md text-sm font-medium"
          >
            {slide.buttonText}
          </Link>
        </div>
      </Container>

      {/* DOT NAVIGATION */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
        {slides.map((_, i) => (
          <button title={`Slide ${i + 1}`}
            key={i}
            onClick={() => setIndex(i)}
            className={`h-3 w-3 rounded-full transition-all ${
              i === index
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}