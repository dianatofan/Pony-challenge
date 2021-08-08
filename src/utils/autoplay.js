import { makeNextMove } from "./api";

let exitPath = [],
  directionsArr = [],
  maze;

const OPPOSITE = {
  south: "north",
  north: "south",
  east: "west",
  west: "east",
};

const DIRECTIONS = ["north", "south", "west", "east"];

export const buildExitPath = (mazeDirections) => {
  maze = mazeDirections;
  const pony = maze.pony[0];
  const endPoint = maze["end-point"][0];
  dfsExitPath(pony, undefined, [pony], endPoint, []);
};

const dfsExitPath = (start, move, path, exit, directions) => {
  const reachablePoints = getPossibleMoveLocations(start);
  // exit found
  if (start === exit) {
    exitPath = path;
    directionsArr = directions;
    movePony();
  }
  // explore the possible paths
  for (let i in reachablePoints) {
    if (!move || reachablePoints[i] !== OPPOSITE[move]) {
      const newPosition = getNextPosition(start, reachablePoints[i]);
      if (!path.includes(newPosition)) {
        //if we're not going backwards, then add the new position to the path and proceed
        const newPath = [...path];
        const newDirections = [...directions];
        newPath.push(newPosition);
        newDirections.push(reachablePoints[i]);
        dfsExitPath(
          newPosition,
          reachablePoints[i],
          newPath,
          exit,
          newDirections
        );
      }
    }
  }
};

const getPossibleMoveLocations = (pony) => {
  let directions = new Set(DIRECTIONS);
  const walls = maze.data;
  const ponyCoordinates = toPoint(pony);

  if (ponyCoordinates.x === 0) {
    directions.delete("north");
  }

  if (ponyCoordinates.y === 0) {
    directions.delete("west");
  }

  for (let i in walls[pony]) {
    directions.delete(walls[pony][i]);
  }
  if (isSouthWall(ponyCoordinates, maze)) {
    directions.delete("south");
  }

  if (isEastWall(ponyCoordinates, maze)) {
    directions.delete("east");
  }

  return Array.from(directions);
};

const movePony = (direction = "") => {
  // if no direction is specified i.e auto play mode then take the first direction from the calculated exit path
  if (direction === "") {
    direction = directionsArr[0];

    // check if the monster isn't far away
    if (isDomokunAhead(maze)) {
      // The monster is like the T-Rex, it won't see you if you don't move, so wait for the path to be cleared and run!
      const available = getPossibleMoveLocations(maze.pony[0]);
      direction = DIRECTIONS.filter((d) => !available.includes(d))[0];
    }
  }
  // API call to make the chosen move
  makeNextMove(maze["maze_id"], direction);
};

const getNextPosition = (index, move) => {
  const coord = indexToCoordinates(index);

  switch (move) {
    case "north":
      return coordinatesToIndex([coord[0] - 1, coord[1]]);
    case "south":
      return coordinatesToIndex([coord[0] + 1, coord[1]]);
    case "east":
      return coordinatesToIndex([coord[0], coord[1] + 1]);
    case "west":
      return coordinatesToIndex([coord[0], coord[1] - 1]);

    default:
      return coord;
  }
};

// Convert location index to point with coordinates (x, y)
const toPoint = (location) => ({
  x: location % maze.size[0],
  y: Math.floor(location / maze.size[0]),
});

const indexToCoordinates = (index) => [
  Math.floor(index / maze.size[0]),
  index % maze.size[0],
];

const coordinatesToIndex = (coord) => {
  return coord[0] * maze.size[0] + coord[1];
};

const isSouthWall = (coords) => {
  if (coords[0] === maze.size[1] - 1) {
    return true;
  }
  const index = coordinatesToIndex([coords[0] + 1, coords[1]]);
  return !!maze.data[index].includes("north");
};

const isEastWall = (coords) => {
  if (coords[1] === maze.size[0] - 1) {
    return true;
  }
  const index = coordinatesToIndex([coords[0], coords[1] + 1]);
  return !!maze.data[index].includes("west");
};

const isDomokunAhead = (maze) => {
  const domokun = maze.domokun[0];
  const distance = exitPath.indexOf(domokun);
  if (distance > -1 && distance < 3) {
    return true;
  }

  const coord = indexToCoordinates(exitPath[1]);
  const indexes = [];
  indexes.push(coordinatesToIndex([coord[0] - 1, coord[1]]));
  indexes.push(coordinatesToIndex([coord[0] + 1, coord[1]]));
  indexes.push(coordinatesToIndex([coord[0], coord[1] - 1]));
  indexes.push(coordinatesToIndex([coord[0], coord[1] + 1]));
  return indexes.includes(domokun);
};
