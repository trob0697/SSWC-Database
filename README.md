# Assignment 5

Web application that manages a databse.

Deploy with the following commands:
- npm install
- npm run-script install-all
- npm run-script prod

Deployed on: [http://localhost:5000](http://localhost:5000)


## File structure
#### `client` - Holds the client application
- #### `public` - This holds all of our static files
- #### `src` - This holds the client side source files
- #### `package.json` - Defines npm behaviors and packages for the client
#### `server` - Holds the server application

- #### `server.js` - Defines npm behaviors and packages for the client
#### `package.json` - Defines npm behaviors 
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!


## Available Scripts

In the project directory, you can run:

### `npm run-script prod`

Runs both the client app and the server app together.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

### `npm run-script client`

Runs just the client app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

### `npm run-script build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

If deploying to heroku this does not need to be run since it is handled by the heroku-postbuild script<br>

### `npm run-script server`

Runs just the server in development mode.<br>