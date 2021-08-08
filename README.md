# Save the Pony

This project was created using [Create React App](https://github.com/facebook/create-react-app) as a solution to Trustpilot's [coding challenge](https://ponychallenge.trustpilot.com/index.html).


## Installation

After cloning the repository, the following scripts are available:

### `npm start`

Run the app in the development mode.

Open http://localhost:3000 to view it in the browser.


### `npm test`
Run unit tests.

### `npm build`

Build the app for production.

### `npm deploy`
Build the app for production and deploys it to Github pages.

## Technologies used
* React - building the UI
* Redux - state management
* Sass - extend CSS capabilities
* Prettier - code formatter
* Eslint - code quality check
* Github pages - app deployment

## App overview
The web app is published at the following URL: https://dianatofan.github.io/Pony-challenge and was built using React, Redux and Sass.

The app is responsive and can be used irregardless of the screen size (desktop, tablet or mobile).
It can be run in all modern browsers supporting grid.

The app consists of:
* navigation bar - here the user can adjust the maze parameters (width, height and game difficulty) and can also select whether he wants to play the game in manual mode or set it to autoplay
* maze container - the 'playground' of the app, where the maze will be generated

The user can move the pony in 2 ways:
* by using the keyboard (left/right/top/down arrows)
* by clicking on the arrow icons placed on the bottom right side of the maze (feature designed having smaller devices in mind)

![Screenshot of the app](/public/appScreenshot.png)

When the pony reaches the exit door, the game is won, and when the pony gets caught by the domokun, the game is lost.

Note! While the game is running, the user is unable to switch between the game modes (manual / autoplay). The buttons are active only before creating a maze.

## Architecture
Every time the pony moves to the next location, the API is called twice:
* one time for identifying whether the move is valid and there are no walls to block the pony from passing there
* one time to update the locations of the pony and domokun, if the pony's move is valid

When performing the API requests, there are 3 actions dispatched in Redux for better error handling:
* `API_CALL_REQUEST` - dispatched before calling the actual API
* `API_CALL_SUCCESS` - dispatched after the API call was performed and a valid response was returned
* `API_CALL_FAILURE` - dispatched when an error occurred while executing the API call

All the API calls are found in `utils/api.js`.

## Autoplay mode
When selecting 'Autoplay' mode, an exit path between the pony and the door will be created (using DFS), and the pony will follow it.
In case the pony encounters the domokun on its way out, the path will be changed accordingly in order to escape from the domokun.

## Future improvements
There is always room of improvement. Some possible future improvements include:
* more realistic animations when moving the pony and domokun (using sprite sheets)
* tap functionality for touchscreen devices
* find shortest path in the maze using Dijkstra's algorithm
* unit tests
