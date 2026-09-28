import React, { useState, useEffect } from "react";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const phrases = [
    "You dey hungry?",
    "Fire on the grill...",
    "Spicing with authentic yaji...",
    "FoodTrain ready to roll!"
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 600);
          }, 200);
          return 100;
        }
        return prev + 2;
      });
    }, 25);

    const phraseInterval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 600);

    return () => {
      clearInterval(progressInterval);
      clearInterval(phraseInterval);
    };
  }, [onComplete]);

  return (
    <div className={`preloader-overlay ${isFading ? "hidden" : ""}`}>
      <div className="preloader-flame-wrap">
        <div className="preloader-ping"></div>
        <div className="preloader-badge">
          <img src="/favicon.svg" alt="FoodTrain Flame" />
        </div>
      </div>
      <p className="preloader-phrase">{phrases[phraseIndex]}</p>
      <div className="preloader-bar-wrap">
        <div
          className="preloader-bar-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span className="preloader-percent">{progress}%</span>
    </div>
  );
}
