import type { NextPage } from "next";
import { useEffect, useRef, useState, MouseEvent } from "react";

const Home: NextPage = () => {
  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const contextRef = useRef<null | CanvasRenderingContext2D>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    console.log(window.innerWidth);

    const context: CanvasRenderingContext2D = canvas.getContext("2d")!;
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  const startDrawing = (mouseEvent: MouseEvent<HTMLCanvasElement>): void => {
    mouseEvent.preventDefault();
    const { offsetX, offsetY } = mouseEvent.nativeEvent;
    contextRef.current!.beginPath();
    contextRef.current!.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = (): void => {
    contextRef.current!.closePath();
    setIsDrawing(false);
  };

  const draw = (mouseEvent: MouseEvent<HTMLCanvasElement>) => {
    mouseEvent.preventDefault();
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = mouseEvent.nativeEvent;
    contextRef.current!.lineTo(offsetX, offsetY);
    contextRef.current!.stroke();
  };

  return (
    <div>
      <canvas
        className="canvas-container"
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  );
};
export default Home;
