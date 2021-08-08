import { useState, useEffect } from "react";
import "./App.scss";
import { Slider } from "./components/Slider";
import { Maze } from "./components/Maze";
import { icons } from "./utils/icons";
import { connect } from "react-redux";
import { createMaze, getMaze, makeNextMove } from "./utils/api";
import { useKeypress } from "./hooks/useKeypress";
import { resetMaze } from "./redux/Maze/maze.actions";
import { resetGame } from "./redux/App/app.actions";
import gameOver from "./assets/gameOver.gif";
import gameWon from "./assets/gameWon.gif";
import { buildExitPath } from "./utils/autoplay";

const App = (props) => {
  const [width, setWidth] = useState(15);
  const [height, setHeight] = useState(15);
  const [difficulty, setDifficulty] = useState(5);
  const [gameMode, setGameMode] = useState("manual-play");
  const { mazeId, maze, resetMaze, resetGame, isGameWon } = props;

  // Render maze when a maze id has been generated
  useEffect(() => {
    return mazeId && getMaze(mazeId);
  }, [mazeId]);

  const makeMove = (direction) =>
    gameMode === "manual-play" && makeNextMove(mazeId, direction);

  // Keyboard event listeners
  useKeypress("ArrowLeft", () => {
    makeMove("west");
  });

  useKeypress("ArrowRight", () => {
    makeMove("east");
  });

  useKeypress("ArrowUp", () => {
    makeMove("north");
  });

  useKeypress("ArrowDown", () => {
    makeMove("south");
  });

  // Autoplay mode
  useEffect(() => {
    if (gameMode === "autoplay" && maze) {
      buildExitPath(maze);
    }
  }, [gameMode, maze]);

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
                ? () => {
                    resetMaze();
                    resetGame();
                    setGameMode("manual-play");
                  }
                : () => createMaze({ width, height, difficulty })
            }
          >
            {mazeId ? "Reset →" : "Play ↩︎"}
          </button>
        </section>
        <form className="app__mode">
          <input
            type="radio"
            value="manual-play"
            checked={gameMode === "manual-play"}
            id="manual-play"
            onChange={(e) => !mazeId && setGameMode(e.target.value)}
            name="manual-play"
          />
          <label htmlFor="manual-play">Manual play</label>
          <input
            type="radio"
            value="autoplay"
            checked={gameMode === "autoplay"}
            id="autoplay"
            onChange={(e) => !mazeId && setGameMode(e.target.value)}
            name="autoplay"
          />
          <label htmlFor="autoplay">Autoplay</label>
        </form>
        {mazeId && (
          <section className="app__controls">
            <p className="app__keyboard-controls">
              Use{" "}
              <img
                src={icons.keyboard}
                className="app__keyboard-controls-icon"
                width={30}
                height={30}
                alt="arrow keys"
              />{" "}
              to move the pony.
            </p>
          </section>
        )}
      </aside>
      <div className="app__maze-container">
        {mazeId ? (
          maze && (
            <div>
              <Maze data={maze} width={width} height={height} />
              <p className="app__mouse-controls">
                <img
                  src={icons.up}
                  onClick={() => makeMove("north")}
                  className="app__mouse-controls-up"
                  alt="arrow keys"
                />{" "}
                <img
                  src={icons.down}
                  onClick={() => makeMove("south")}
                  className="app__mouse-controls-down"
                  alt="arrow keys"
                />{" "}
                <img
                  src={icons.left}
                  onClick={() => makeMove("west")}
                  className="app__mouse-controls-left"
                  alt="arrow keys"
                />{" "}
                <img
                  src={icons.right}
                  onClick={() => makeMove("east")}
                  className="app__mouse-controls-right"
                  alt="arrow keys"
                />{" "}
              </p>
            </div>
          )
        ) : isGameWon === null ? (
          <p className="app__instructions">
            Press on 'Play' to create the maze.
          </p>
        ) : isGameWon ? (
          <div className="app__game-won">
            <img
              src={gameWon}
              width={400}
              className="app__gif"
              alt="Game won"
            />
            <p>Congrats, you saved the pony!</p>
            <button
              className="app__buttons--retry"
              onClick={() => createMaze({ width, height, difficulty })}
            >
              Play again
            </button>
          </div>
        ) : (
          <div className="app__game-over">
            <img src={gameOver} className="app__gif" alt="Game over" />
            <p>Game over</p>
            <button
              className="app__buttons--retry"
              onClick={() => createMaze({ width, height, difficulty })}
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    mazeId: state.maze.mazeId,
    maze: state.maze.mazeContent,
    isGameWon: state.app.isGameWon,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetMaze: () => dispatch(resetMaze()),
    resetGame: () => dispatch(resetGame()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
