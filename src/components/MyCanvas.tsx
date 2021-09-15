import { VFC, useEffect, useRef } from "react";
import { Manager } from "libs/manages/Manager";
import { LoaderScene } from "libs/scenes/LoaderScene";

const MyCanvas: VFC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const showFullScreenButton = typeof window === "undefined" || document.body.requestFullscreen !== undefined;
  const handleFullscreen = () => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    canvas.requestFullscreen();
    Manager.resizeToFullscreen();
  }

  useEffect(() =>{
    const canvas = canvasRef.current;
    if(!canvas) return;
    const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    console.log('screenSize', screenWidth, screenHeight);
    Manager.initialize(canvas, screenWidth, screenHeight);
    const loady: LoaderScene = new LoaderScene();
    Manager.changeScene(loady);
  },[canvasRef]);
  return (
    <>
      <canvas ref={canvasRef} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
      { showFullScreenButton &&
        <button onClick={handleFullscreen} className="material-icons" style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 99999,
          appearance: 'none',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer'
        }}>fullscreen</button>}
    </>
  );
};

export default MyCanvas;