import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  "Where do I go to get better at influencer marketing (and talk to people who get it)?",
  "I have so many tools already. 😐 Do I really need another one?",
  "What if someone just ran my program for me?",
  "How do I find the right creator for my niche?",
  "Can I track ROI on my influencer campaigns effectively?",
];

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}

export function MarketerPainPoints() {
  const [currentIndex, setCurrentIndex] = useState(2); // Start exactly in the center (index 2)
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Entrance Animations
  useGSAP(
    () => {
      // Animate the Header texts
      gsap.from(".reveal-header", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // Animate the card wrappers (fanning out from center)
      gsap.from(".card-wrapper", {
        y: 150,
        opacity: 0,
        duration: 1.2,
        stagger: {
          each: 0.1,
          from: "center",
        },
        ease: "back.out(1.5)", // Bouncy entrance
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: containerRef }
  );

  // Core Carousel Interaction Animation
  useGSAP(
    () => {
      if (!trackRef.current) return;

      // 1. Move the entire track so active is centered
      const offset = (Math.floor(CARDS.length / 2) - currentIndex) * 340;
      gsap.to(trackRef.current, {
        x: offset,
        duration: 0.8,
        ease: "power3.inOut",
      });

      // 2. Animate individual cards with a premium Coverflow effect
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        const dist = idx - currentIndex; // Distance from active card
        const isActive = dist === 0;

        // Animate the card body (transforms only, Tailwind handles colors via classes!)
        gsap.to(card, {
          scale: isActive ? 1.15 : 1 - Math.abs(dist) * 0.1,
          rotation: isActive ? -2 : dist * 3, // Inactive cards fan away
          height: isActive ? 220 : 180,
          opacity: isActive ? 1 : 1 - Math.abs(dist) * 0.3, // Fade outer cards
          boxShadow: isActive
            ? "0 25px 50px -12px rgba(124, 58, 237, 0.4)" // Glowing purple shadow
            : "0 4px 6px -1px rgb(0 0 0 / 0.05)",
          zIndex: 50 - Math.abs(dist),
          duration: 0.8,
          ease: "back.out(1.2)", // Subtle bounce on snap
        });

        // Animate the text inside the card (font size only)
        gsap.to(card.children[0], {
          fontSize: isActive ? "17px" : "15px",
          duration: 0.8,
          ease: "power3.inOut",
        });
      });
    },
    { dependencies: [currentIndex], scope: containerRef }
  );

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(CARDS.length - 1, prev + 1));
  };

  return (
    <section ref={containerRef} className="w-full overflow-hidden pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="reveal-header text-4xl sm:text-5xl font-bold tracking-tight text-ink-900 mb-6">
            The buyer journey has changed.<br />
            Has your <span className="text-brand-500">marketing?</span>
          </h2>
          <p className="reveal-header text-lg text-ink-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Running a creator program is hard work, and sometimes, even the most
            experienced marketers get stuck.
          </p>
        </div>

        <div className="relative mx-auto max-w-[1000px]">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="reveal-header absolute -left-4 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-surface-card text-ink-900 border border-ink-100 shadow-md transition-all duration-200 hover:scale-110 hover:border-brand-200 hover:bg-surface-base active:scale-95 disabled:opacity-0 disabled:pointer-events-none"
            aria-label="Previous card"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === CARDS.length - 1}
            className="reveal-header absolute -right-4 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-surface-card text-ink-900 border border-ink-100 shadow-md transition-all duration-200 hover:scale-110 hover:border-brand-200 hover:bg-surface-base active:scale-95 disabled:opacity-0 disabled:pointer-events-none"
            aria-label="Next card"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>

          <div className="relative w-full flex items-center justify-center h-[350px] overflow-visible perspective-[1000px]">
            <div
              ref={trackRef}
              className="flex items-center"
            >
              {CARDS.map((card, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <div
                    key={idx}
                    className="card-wrapper relative shrink-0 px-[10px]"
                    style={{ width: "340px" }}
                    onClick={() => setCurrentIndex(idx)}
                  >
                    <div
                      ref={(el) => {
                        cardsRef.current[idx] = el;
                      }}
                      className={`mx-auto w-[320px] rounded-2xl p-8 flex items-center justify-center text-center cursor-pointer border border-ink-100 shadow-sm transition-colors duration-500 ${
                        isActive ? "bg-brand-500" : "bg-surface-card"
                      }`}
                      style={{ height: 180 }}
                    >
                      <p className={`font-semibold leading-relaxed transition-colors duration-500 ${
                        isActive ? "text-white text-[17px]" : "text-ink-700 text-[15px]"
                      }`}>
                        {card}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
