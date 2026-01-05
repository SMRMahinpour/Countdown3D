import React from "react";
import Cube from "../Cube/Cube";
import { DIGITS } from "../../utils/digitMaps";
import "./Digit.css";

interface DigitProps {
  value: number | "colon";
  offsetX?: number;
  offsetY?: number;
  cubeSize?: number;
  spacing?: number;
  rotateY?: number;
}

const Digit: React.FC<DigitProps> = ({
  value,
  offsetX = 0,
  offsetY = 0,
  cubeSize = 20,
  spacing = 2,
  rotateY = 0,
}) => {
  const map = DIGITS[value] || DIGITS[0];

  return (
    <div className="digit">
      {map.map((row, y) =>
        row.map((cell, x) => {
          if (!cell) return null;
          const flatIndex = y * row.length + x;

          return (
            <Cube
              key={`${x}-${y}`}
              style={{
                width: cubeSize,
                height: cubeSize,
                transform: `translate3d(${
                  x * (cubeSize + spacing) + offsetX
                }px, ${
                  y * (cubeSize + spacing) + offsetY
                }px, 0) rotateX(-30deg) rotateY(${rotateY}deg)`,
                zIndex: 1000 - flatIndex,
              }}
            />
          );
        })
      )}
    </div>
  );
};

export default Digit;
