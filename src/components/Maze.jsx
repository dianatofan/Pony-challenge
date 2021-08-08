import "./Maze.scss";

const createRows = (maze) => {
  let id = 0;
  const [width, height] = maze.size;
  const rows = [];

  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      const cell = {
        key: id,
        walls: maze.data[id],
        isPony: id === maze.pony[0],
        isDomokun: id === maze.domokun[0],
        isExit: id === maze["end-point"][0],
      };
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

const Cell = ({ cell, width }) => {
  const { walls, isPony, isDomokun, isExit } = cell;

  return (
    <div
      className={`cell ${walls.join(" ")}`}
      style={{ width: `${70 / width}vmin`, height: `${70 / width}vmin` }}
    >
      {isPony && <span className="pony" />}
      {isDomokun && <span className="domokun" />}
      {isExit && <span className="door" />}
    </div>
  );
};

const Row = ({ row, width }) =>
  row.map((cell, i) => <Cell key={i} cell={cell} width={width} />);

export const Maze = ({ data }) => {
  const rows = createRows(data);

  return (
    <div className="maze" onKeyPress={(ev) => console.log(ev)}>
      {rows.map((row, i) => (
        <div className="row" key={i}>
          <Row key={i} row={row} width={data.size[0]} />
        </div>
      ))}
    </div>
  );
};
