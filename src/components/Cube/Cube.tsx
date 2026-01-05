import React from "react";
import "./Cube.css";

interface CubeProps {
  style?: React.CSSProperties;
}

const Cube: React.FC<CubeProps> = ({ style }) => {
  return (
    <div className="cube" style={style}>
      <div className="face front" />
      <div className="face back" />
      <div className="face right" />
      <div className="face left" />
      <div className="face top" />
      <div className="face bottom" />
    </div>
  );
};

export default Cube;
