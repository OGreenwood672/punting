"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState, useEffect } from "react";

import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

import { Fireworks } from "@fireworks-js/react";

import Image from "next/image";
import Wave from "@/wave";

import Head from "next/head";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2800);

  const goal = new Date("2025-06-19T10:10:00Z");

  const now = new Date();
  const [showFireworks, setShowFireworks] = useState(now > goal);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowFireworks(new Date() > goal);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div onClick={() => setIsLoading(false)} className="bg-white">
      <Head>
        <link rel="icon" href="/icon.ico" />
      </Head>
      {isLoading ? (
        <div className="bg-white min-h-screen flex items-center justify-center">
          <div className="w-full md:w-1/2 mb-20">
            <DotLottieReact src="/pirate.lottie" autoplay speed={0.6} loop />
          </div>
        </div>
      ) : (
        <div className="min-h-screen w-full">
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

          <div className="min-h-screen flex items-center">
            <div className="mb-40 mx-auto max-w-72 md:max-w-4xl flex flex-col items-center justify-center">
              <Image
                src="/punt_bro.png"
                alt="Pirate"
                width={500}
                height={500}
                className="mb-2"
              />
              <FlipClockCountdown
                to={goal}
                showLabels={false}
                hideOnComplete={false}
                digitBlockStyle={
                  isSmallScreen
                    ? { width: 25, height: 40, fontSize: 20 }
                    : { width: 35, height: 60, fontSize: 30 }
                }
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full">
            <Wave
              fill="#0abae1"
              paused={false}
              style={{ display: "flex" }}
              options={{
                height: 100,
                amplitude: window.innerWidth < 768 ? 15 : 30,
                speed: 0.3,
                points: 4,
              }}
            />
            <div className="bg-[#0abae1] h-15 font-semibold text-shadow-sm flex items-center justify-center">
              <p className="text-xs md:text-lg text-white">
                Oliver Greenbeard • Jess Peg • Brace Gutfrey
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
