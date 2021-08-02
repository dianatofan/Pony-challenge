import { useState } from "react";
import './App.scss';
import { Slider } from "./components/Slider";
import keyboard from "./assets/keyboard.svg";

const App = () => {
  const [width, setWidth] = useState(15);
  const [height, setHeight] = useState(15);
  const [difficulty, setDifficulty] = useState(0);

  return (
    <div className="app">
      <aside className="app__sidebar">
        <h1 className="app__title">Save the pony 🦄 </h1>
        <section className="app__parameters">
          <Slider id="width" name="width" min="15" max="25" value={width} onChange={setWidth} />
          <Slider id="height" name="height" min="15" max="25" value={height} onChange={setHeight} />
          <Slider id="difficulty" name="difficulty" min="0" max="10" value={difficulty} onChange={setDifficulty} />
        </section>
        <section className="app__buttons">
          <button className="app__buttons--play">Play →</button>
          <button className="app__buttons--reset">Reset ↩︎</button>
        </section>
        <section className="app__instructions">
          <p>Press on 'Play' to create the maze.</p>
          <p className="app__instructions--keyboard">Use <img src={keyboard} width={30} height={30} alt="arrow keys"/> to move the pony.</p>
        </section>
      </aside>
      <div className="app__maze-container"></div>
    </div>
  );
}

export default App;
