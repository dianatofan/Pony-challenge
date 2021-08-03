import './Maze.scss';

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
        // isPony: id == maze.pony,
        // isDomokun: id == maze.domokun,
        // isExit: id == maze["end-point"]
      }
      // element["key"] = id;
      // element["walls"] = data[id];
      // element["isPony"] = id === pony;
      // element["isDomokun"] = id === domokun;
      // element["isExit"] = id === dataArr["end-point"];
      // element["isExitPath"] = exitPath.includes(id);
      // element["height"] = height;
      // if (i === height - 1) {
      //   cell["walls"].push("south");
      // }
      // if (j === width - 1) {
      //   cell["walls"].push("east");
      // }
      row.push(cell);
      id++;
    }
    rows.push(row);
  }
  return rows;
};

const Cell = ({ walls }) => <div className={`cell ${walls.join(" ")}`} />

const Row = ({ row }) => (
  row.map((cell, i) =>
    <Cell key={i} walls={cell.walls} />
  )
)

export const Maze = ({ data, width, height }) => {
  const rows = createRows(data);
  console.log(data, rows);
  return (
    <div className="maze">
      { rows.map((row, i) => <div className="row"><Row key={i} row={row} /></div>)}
    </div>
  )
}
