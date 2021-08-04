import './Maze.scss';
import { useEffect } from "react";

const createRows = (maze) => {
  let id = 0;

  // let step = 0;
  const [ width, height ] = maze.size;
  // const rows = Array.from(Array(width), () => []);
  //
  // for (let i = 0; i < width; i++) {
  //   for (let j = 0; j < height; j++) {
  //     console.log(step);
  //     rows[i].push(maze.data[j + step]);
  //   }
  // }

  const rows = [];

  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      const cell = {
        key: id,
        walls: maze.data[id],
        isPony: id === maze.pony[0],
        isDomokun: id === maze.domokun[0],
        isExit: id === maze["end-point"][0]
      }
      // element["key"] = id;
      // element["walls"] = data[id];
      // element["isPony"] = id === pony;
      // element["isDomokun"] = id === domokun;
      // element["isExit"] = id === dataArr["end-point"];
      // element["isExitPath"] = exitPath.includes(id);
      // element["height"] = height;
      if (i === height - 1) {
        cell["walls"].push("south");
      }
      if (j === width - 1) {
        cell["walls"].push("east");
      }
      row.push(cell);
      id++;
    }
    rows.push(row);
  }
  return rows;
};

const Cell = ({ cell }) => {
  const { walls, isPony, isDomokun, isExit } = cell;
  return (
    <div className={`cell ${walls.join(" ")}`}>
      { isPony && <span className="pony">P</span>}
      { isDomokun && <span>D</span>}
      { isExit && <span>E</span>}
    </div>
  );
}

const Row = ({ row }) => (
  row.map((cell, i) =>
    <Cell key={i} cell={cell} />
  )
)

export const Maze = ({ data, width, height }) => {
  const rows = createRows(data);

  return (
    <div className="maze" onKeyPress={ev => console.log(ev)}>
      { rows.map((row, i) => <div className="row"><Row key={i} row={row} /></div>)}
    </div>
  )
}
