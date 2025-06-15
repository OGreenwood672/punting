"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState, useEffect } from "react";

import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

import { showFireworks, Fireworks } from "@fireworks-js/react";

import Image from "next/image";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 3800);

  const goal = new Date("2025-06-19T11:10:00Z");

  const now = new Date();
  const [showFireworks, setShowFireworks] = useState(now > goal);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowFireworks(new Date() > goal);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div onClick={() => setIsLoading(false)}>
      {isLoading ? (
        <div className="bg-radial-[at_0%_0%] from-[#f5ef9f] via-[#ebe867] to-[#f3c11f] bg-left-top min-h-screen flex items-center justify-center">
          <div className="w-1/2 mb-20">
            <DotLottieReact src="/pirate.lottie" autoplay speed={0.6} loop />
          </div>
        </div>
      ) : (
        <div className="min-h-screen mx-auto w-full max-w-4xl flex items-center justify-center">
          {showFireworks && (
            <Fireworks
              options={{
                opacity: 0.5,
              }}
              style={{
                position: "fixed",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                zIndex: 1,
              }}
            />
          )}
          <div className="flex flex-col items-center justify-center">
            <Image src="/punting.png" alt="Pirate" width={400} height={400} />
            <FlipClockCountdown
              to={goal}
              showLabels={false}
              hideOnComplete={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}
