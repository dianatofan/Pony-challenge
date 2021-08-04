import { useState, useEffect } from "react";
import "./App.scss";
import { Slider } from "./components/Slider";
import { Maze } from "./components/Maze";
import keyboard from "./assets/keyboard.svg";

const App = () => {
  const [width, setWidth] = useState(15);
  const [height, setHeight] = useState(15);
  const [difficulty, setDifficulty] = useState(5);
  const [mazeId, setMazeId] = useState(null);
  const [maze, setMaze] = useState(null);

  const createMaze = async () => {
    const rawResponse = await fetch(
      "https://ponychallenge.trustpilot.com/pony-challenge/maze",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "maze-width": parseInt(width),
          "maze-height": parseInt(height),
          "maze-player-name": "Pinkie Pie",
          difficulty: parseInt(difficulty),
        }),
      }
    );
    const content = await rawResponse.json();
    setMazeId(content.maze_id);
  };

  useEffect(() => {
    async function fetchMyAPI() {
      await fetch(
        `https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}`
      )
        .then((response) => response.json())
        .then((json) => {
          setMaze(json);
        });
    }
    return fetchMyAPI();
  }, [mazeId]);

  return (
    <div className="app">
      <aside className="app__sidebar">
        <h1 className="app__title">Save the pony 🦄 </h1>
        <p className="app__description">
          Twilight Sparkle is in danger. Rescue her from the big bad Domokun!
        </p>
        <section className="app__parameters">
          <Slider
            id="width"
            name="width"
            min="15"
            max="25"
            value={width}
            onChange={setWidth}
          />
          <Slider
            id="height"
            name="height"
            min="15"
            max="25"
            value={height}
            onChange={setHeight}
          />
          <Slider
            id="difficulty"
            name="difficulty"
            min="0"
            max="10"
            value={difficulty}
            onChange={setDifficulty}
          />
        </section>
        <section className="app__buttons">
          <button className="app__buttons--play" onClick={createMaze}>
            Play →
          </button>
          <button className="app__buttons--reset">Reset ↩︎</button>
        </section>
        <section className="app__instructions">
          <p>Press on 'Play' to create the maze.</p>
          <p className="app__instructions--keyboard">
            Use <img src={keyboard} width={30} height={30} alt="arrow keys" />{" "}
            to move the pony.
          </p>
        </section>
      </aside>
      <div className="app__maze-container">
        {maze && <Maze data={maze} width={width} height={height} />}
      </div>
    </div>
  );
};

export default App;
