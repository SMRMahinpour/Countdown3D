import { useState } from "react";
import Countdown from "./components/Countdown/Countdown";
import DraggableWrapper from "./components/DraggableWrapper/DraggableWrapper";
import "./App.css";

function App() {
  const [translateX, setTranslateX] = useState(0);

  return (
    <div className="app">
      <DraggableWrapper onTranslateX={setTranslateX} maxDrag={300}>
        <Countdown
          startSeconds={7200}
          translateX={translateX}
          startAngle={-10}
          cubeSize={25}
          spacing={1}
          digitSpacing={100}
          maxTranslate={400}
        />
      </DraggableWrapper>
    </div>
  );
}

export default App;
