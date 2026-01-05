import { useEffect, useState } from "react";
import Digit from "../Digit/Digit";
import "./Countdown.css";

interface CountdownProps {
  startSeconds?: number;
  translateX?: number;
  startAngle?: number;
  cubeSize?: number;
  spacing?: number;
  digitSpacing?: number;
  maxTranslate?: number;
}

const Countdown: React.FC<CountdownProps> = ({
  startSeconds = 3600,
  translateX = 0,
  startAngle = 0,
  cubeSize = 20,
  spacing = 2,
  digitSpacing,
  maxTranslate = 300,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(startSeconds);

  // --- Format time ---
  const formatTime = (s: number): (number | "colon")[] => {
    const hours = Math.floor(s / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = s % 60;
    return [
      Math.floor(hours / 10),
      hours % 10,
      "colon",
      Math.floor(minutes / 10),
      minutes % 10,
      "colon",
      Math.floor(seconds / 10),
      seconds % 10,
    ];
  };

  const digits = formatTime(secondsLeft);

  const totalDigits = digits.length;
  const digitSpacingFinal = digitSpacing || cubeSize * 3 + 10;
  const totalWidth = totalDigits * digitSpacingFinal;

  // --- Dynamic rotateY based on drag ---
  const getRotateY = (x: number) => {
    const angle = (x / maxTranslate) * 30;
    return Math.max(-30, Math.min(30, angle)) + startAngle;
  };

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  const rotateY = getRotateY(translateX);

  return (
    <div className="countdown-wrapper">
      <div
        className="countdown"
        style={{
          transform: `translateX(-${totalWidth / 2}px)`, // center
        }}
      >
        {digits.map((d, i) => (
          <Digit
            key={i}
            value={d}
            cubeSize={cubeSize}
            spacing={spacing}
            offsetX={i * digitSpacingFinal}
            rotateY={rotateY}
          />
        ))}
      </div>
    </div>
  );
};

export default Countdown;
