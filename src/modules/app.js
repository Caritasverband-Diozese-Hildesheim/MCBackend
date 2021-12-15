import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import setRoutes from "./routes";

/** <p>Module that prepares the application</p>
* <p>Tells the Server what middleware we use and we set our routes </p>
* <p>Middleware we use:</p>
* <ul>
* <li>[body-parser]{@link https://www.npmjs.com/package/body-parser} : reads the body of a request from a browser and parses it into something we need. F. e. json and URL encoded</li>
* <li>[method-override]{@link https://www.npmjs.com/package/method-override} : Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.</li>
* </ul>
* @module modules/app
*/

/**
* @typedef {!Object} App
* @description exports an [express app]{@link https://www.npmjs.com/package/express}
*/

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Method-Override
app.use(methodOverride("_method"));

setRoutes(app);

// server.listen(port, hostname);
export default app;
