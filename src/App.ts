import dotenv from "dotenv";
import express from "express";
import { Routes } from "./interfaces/RouteInterface";
import db from "./db/models";
import logger from "./logger";
import { httpErrorMiddleware } from "./middlewares/HttpErrorMiddleware";

dotenv.config({ path: './.env'});

class App {
    public express: express.Application;
    public port: number;
    public host: string;

    constructor(routes: Routes[]) {
        this.port = process.env.BACKEND_PORT as unknown as number || 3306;
        this.host = process.env.BACKEND_HOST as string || "localhost";
        this.express = express();
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.loadRoutes(routes);
        this.express.use(httpErrorMiddleware);
        this.connectToDatabase();
    }

    private loadRoutes(routes: Routes[]) : void {
        routes.forEach(route => {
            this.express.use('/', route.router);
        })
    }

    public connectToDatabase() {
        db.sequelize.sync({force: true});
    }

    public listen() {
        this.express.listen(this.port, this.host, () => {
            logger.info(`Server is running at port ${this.port}`);
        });
    }
}

export default App;