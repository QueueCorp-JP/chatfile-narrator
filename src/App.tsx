import { useState, useCallback, useRef, useEffect } from "react";
import { Application } from "@pixi/app";
import { Live2DModel, config } from "pixi-live2d-display";
import { Ticker } from "@pixi/ticker";

// Register the ticker
config.ticker = Ticker;

// Register the application to Live2DModel
config.applicationOptions = {
  backgroundAlpha: 0,
};

function App() {
  const [app, setApp] = useState<Application | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const initPixi = useCallback(async () => {
    if (!canvasRef.current) return;

    const _app = new Application({
      view: canvasRef.current,
      autoStart: true,
      backgroundAlpha: 0,
      resizeTo: window,
    });

    const model = await Live2DModel.from("/hiyori/hiyori_free_t08.model3.json");

    // Configure the model
    model.scale.set(0.5);
    model.anchor.set(0.5, 0.5);
    model.position.set(_app.screen.width / 2, _app.screen.height / 2);

    // Add the model to the stage
    _app.stage.addChild(model);

    setApp(_app);
  }, []);

  useEffect(() => {
    initPixi();

    return () => {
      if (app) {
        app.destroy(true);
      }
    };
  }, [initPixi, app]);

  return (
    <div className="App">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default App;