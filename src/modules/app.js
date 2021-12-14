import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import setRoutes from './routes';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, }));

// Method-Override
app.use(methodOverride("_method"));

setRoutes(app);

//server.listen(port, hostname);
export default app;