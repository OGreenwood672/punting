"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div onClick={() => setIsLoading(false)}>
      {isLoading ? (
        <div className="bg-gradient-to-b from-[#fdd384] to-[#012816] min-h-screen flex items-center justify-center">
          <DotLottieReact src="/pirate.lottie" autoplay speed={0.6} loop />
        </div>
      ) : (
        <div className="min-h-screen">Your content here</div>
      )}
    </div>
  );
}
