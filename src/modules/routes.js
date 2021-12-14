import express from 'express';
import path from "path";
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../swagger_output.json';

export default (app) => {
    app.use('/docs', express.static(path.join(__dirname, '../../docs')));
    app.use('/', (req, res, next) => {
        // #swagger.ignore = true
        next();
    }, swaggerUi.serve, swaggerUi.setup(swaggerFile))
}