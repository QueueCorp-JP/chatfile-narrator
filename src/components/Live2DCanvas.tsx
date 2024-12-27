import { useEffect, useRef } from "react";

export const Live2DCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Live2D initialization code will go here
    console.log("Live2D Canvas initialized");
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};