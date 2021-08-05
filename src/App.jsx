import { useState, useEffect } from "react";
import "./App.scss";
import { Slider } from "./components/Slider";
import { Maze } from "./components/Maze";
import keyboard from "./assets/keyboard.svg";
import { connect } from "react-redux";
import { setGameStarted } from "./redux/App/app.actions";
import { createMaze, getMaze, makeNextMove } from "./utils/api";
import { useKeypress } from "./hooks/useKeypress";

const App = (props) => {
  const [width, setWidth] = useState(15);
  const [height, setHeight] = useState(15);
  const [difficulty, setDifficulty] = useState(5);
  const { setGameStarted, isGameStarted, maze, mazeId } = props;

  useEffect(() => {
    return getMaze(mazeId);
  }, [mazeId]);

  useKeypress("ArrowLeft", () => {
    console.log("you pressed left!");
    makeNextMove(mazeId, "west");
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
              isGameStarted
                ? () => setGameStarted(false)
                : () => createMaze(width, height, difficulty)
            }
          >
            {isGameStarted ? "Reset →" : "Play ↩︎"}
          </button>
        </section>
        {isGameStarted && (
          <p className="app__keyboard-controls">
            Use <img src={keyboard} width={30} height={30} alt="arrow keys" />{" "}
            to move the pony.
          </p>
        )}
      </aside>
      <div className="app__maze-container">
        {isGameStarted ? (
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
    isGameStarted: state.app.isGameStarted,
    maze: state.maze.maze,
    mazeId: state.maze.mazeId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGameStarted: (val) => dispatch(setGameStarted(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
