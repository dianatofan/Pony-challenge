import { makeNextMove } from "./api";

const DIRECTIONS = {
  south: "north",
  north: "south",
  east: "west",
  west: "east",
};

let exitPath = [],
  directionsArr = [],
  maze;

export const buildExitPath = (mazeDirections) => {
  maze = mazeDirections;
  const pony = maze.pony[0];
  const endPoint = maze["end-point"][0];
  dfsExitPath(pony, undefined, [pony], endPoint, []);
};

const dfsExitPath = (start, move, path, exit, directions) => {
  const reachablePoints = getPossibleMoveLocations(start);
  // Exit found
  if (start === exit) {
    exitPath = path;
    directionsArr = directions;
    movePony();
  }
  for (let i in reachablePoints) {
    // Check the possible move directions
    if (!move || reachablePoints[i] !== DIRECTIONS[move]) {
      const nextPosition = getNextPosition(start, reachablePoints[i]);
      if (!path.includes(nextPosition)) {
        // Add the position to the path
        const newPath = [...path];
        const newDirections = [...directions];
        newPath.push(nextPosition);
        newDirections.push(reachablePoints[i]);
        dfsExitPath(
          nextPosition,
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
  const directions = new Set(Object.keys(DIRECTIONS));
  const walls = maze.data;
  const ponyCoordinates = convertToPoint(pony);
  if (ponyCoordinates[0] === 0) {
    directions.delete("north");
  }
  if (ponyCoordinates[1] === 0) {
    directions.delete("west");
  }
  for (let index in walls[pony]) {
    directions.delete(walls[pony][index]);
  }
  if (isSouthWall(ponyCoordinates)) {
    directions.delete("south");
  }
  if (isEastWall(ponyCoordinates)) {
    directions.delete("east");
  }
  return Array.from(directions);
};

const movePony = () => {
  let direction = directionsArr[0];
  if (isDomokunClose()) {
    const possibleMoveLocations = getPossibleMoveLocations(maze.pony[0]);
    direction = Object.keys(DIRECTIONS).filter(
      (direction) => !possibleMoveLocations.includes(direction)
    )[0];
  }
  makeNextMove(maze["maze_id"], direction);
};

const getNextPosition = (location, direction) => {
  const point = convertToPoint(location);
  switch (direction) {
    case "north":
      return convertToLocation([point[0] - 1, point[1]]);
    case "south":
      return convertToLocation([point[0] + 1, point[1]]);
    case "west":
      return convertToLocation([point[0], point[1] - 1]);
    case "east":
      return convertToLocation([point[0], point[1] + 1]);
    default:
      return point;
  }
};

const convertToPoint = (location) => [
  Math.floor(location / maze.size[0]),
  location % maze.size[0],
];

const convertToLocation = (point) => point[0] * maze.size[0] + point[1];

const isSouthWall = (point) => {
  if (point[0] === maze.size[1] - 1) {
    return true;
  }
  const location = convertToLocation([point[0] + 1, point[1]]);
  return !!maze.data[location].includes("north");
};

const isEastWall = (point) => {
  if (point[1] === maze.size[0] - 1) {
    return true;
  }
  const location = convertToLocation([point[0], point[1] + 1]);
  return !!maze.data[location].includes("west");
};

const isDomokunClose = () => {
  const domokun = maze.domokun[0];
  const distance = exitPath.indexOf(domokun);
  if (distance > -1 && distance < 3) {
    return true;
  }
  const exitPoint = convertToPoint(exitPath[1]);
  const locations = [];
  locations.push(convertToLocation([exitPoint[0] - 1, exitPoint[1]]));
  locations.push(convertToLocation([exitPoint[0] + 1, exitPoint[1]]));
  locations.push(convertToLocation([exitPoint[0], exitPoint[1] - 1]));
  locations.push(convertToLocation([exitPoint[0], exitPoint[1] + 1]));
  return locations.includes(domokun);
};
