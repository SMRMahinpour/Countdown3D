import React, { useRef, useState, useEffect } from "react";

interface DraggableWrapperProps {
  children: React.ReactNode;
  onTranslateX?: (x: number) => void;
  maxDrag?: number; // optional
}

const DraggableWrapper: React.FC<DraggableWrapperProps> = ({
  children,
  onTranslateX,
  maxDrag,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [originX, setOriginX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [defaultMaxDrag, setDefaultMaxDrag] = useState<number>(0);

  const velocity = useRef(0);
  const animationRef = useRef<number | null>(null);

  // --- Compute default maxDrag so countdown doesn't go off-screen ---
  useEffect(() => {
    if (!wrapperRef.current) return;

    const parentWidth = wrapperRef.current.parentElement?.clientWidth || 0;
    const countdownWidth = wrapperRef.current.clientWidth;

    const safeDrag = Math.max(0, (parentWidth - countdownWidth) / 2);
    setDefaultMaxDrag(safeDrag);
  }, [wrapperRef.current, children]);

  const getMaxDrag = () => {
    return maxDrag ?? defaultMaxDrag;
  };

  const clampX = (x: number) => {
    const max = getMaxDrag();
    return Math.max(-max, Math.min(max, x));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setOriginX(e.clientX - translateX);
    velocity.current = 0;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    let x = e.clientX - originX;
    x = clampX(x);

    velocity.current = x - translateX;
    setTranslateX(x);
    onTranslateX?.(x);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setDragging(true);
    setOriginX(touch.clientX - translateX);
    velocity.current = 0;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!dragging) return;
    const touch = e.touches[0];
    let x = touch.clientX - originX;
    x = clampX(x);

    velocity.current = x - translateX;
    setTranslateX(x);
    onTranslateX?.(x);
  };

  const handleTouchEnd = () => {
    setDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [dragging, originX, defaultMaxDrag]);

  return (
    <div
      ref={wrapperRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        cursor: dragging ? "grabbing" : "grab",
        transform: `translateX(${translateX}px)`,
        touchAction: "none",
        userSelect: "none",
      }}
    >
      {children}
    </div>
  );
};

export default DraggableWrapper;
