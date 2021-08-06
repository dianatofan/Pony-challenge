import { useState, useEffect } from "react";
import "./App.scss";
import { Slider } from "./components/Slider";
import { Maze } from "./components/Maze";
import keyboard from "./assets/keyboard.svg";
import { connect } from "react-redux";
import { setGameStarted } from "./redux/App/app.actions";
// import { getMaze } from "./redux/Maze/maze.actions";
import { createMaze, getMaze } from "./utils/api";
import { useKeypress } from "./hooks/useKeypress";

const App = (props) => {
  const [width, setWidth] = useState(15);
  const [height, setHeight] = useState(15);
  const [difficulty, setDifficulty] = useState(5);
  const { setGameStarted, mazeId, maze } = props;

  useEffect(() => {
    return mazeId && getMaze(mazeId);
  }, [mazeId]);

  useKeypress("ArrowLeft", () => {
    console.log("you pressed left!");
    // makeNextMove(mazeId, "west");
  });

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
          <button
            className="app__buttons--play"
            onClick={
              mazeId
                ? () => setGameStarted(false)
                : () => createMaze({ width, height, difficulty })
            }
          >
            {mazeId ? "Reset →" : "Play ↩︎"}
          </button>
        </section>
        {mazeId && (
          <p className="app__keyboard-controls">
            Use <img src={keyboard} width={30} height={30} alt="arrow keys" />{" "}
            to move the pony.
          </p>
        )}
      </aside>
      <div className="app__maze-container">
        {mazeId ? (
          maze && <Maze data={maze} width={width} height={height} />
        ) : (
          <p className="app__instructions">
            Press on 'Play' to create the maze.
          </p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    mazeId: state.maze.id.data,
    maze: state.maze.content.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
