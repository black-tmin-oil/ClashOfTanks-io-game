# ClashOfTanks-io-game
browser multiplayer game. 

## About
**THE PROJECT ISN'T DONE YET!** The game is written in es6 classes.
Each object in the game is a class, which makes it possible to add new functionality.
The core logic of the game is calculated on the server and broadcast to the client where rendering on canvas.
Images are preloaded using the asynchronous asset load manager

The problem of the game lag has not been resolved yet (the game may freeze for a short time in rare cases)

Use webpack-dev-middleware to automatically rebuild development bundles.


## Technologies and tools

- [Vanilla JS](https://en.wikipedia.org/wiki/JavaScript),
- [Node.js](https://nodejs.org/),
- [Express](https://express.org/)
- [socket.io](https://socket.io/),
- [Webpack](https://webpack.js.org/),
- [Webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware),
- [yarn](https://yarnpkg.com/),


1. **Launching development server**

    ```
    yarn run develop
   ```

    After that, the application will be available at `localhost:3000`.
    
### TODO:
* add random generated powerups entities
* rewrite as classes
* add tilemaps
* add game bot
