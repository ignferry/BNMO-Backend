import dotenv from "dotenv";
import express from "express";
import { Routes } from "./interfaces/RouteInterface";
import sequelize from "./config/db.config";
import logger from "./logger";

dotenv.config({ path: './.env'});

class App {
    public express: express.Application;
    public port: number;
    public host: string;

    constructor(routes: Routes[]) {
        this.port = process.env.PORT as unknown as number || 3306;
        this.host = process.env.HOST as string || "localhost";
        this.express = express();
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.loadRoutes(routes);
        this.connectToDatabase();
    }

    private loadRoutes(routes: Routes[]) : void {
        routes.forEach(route => {
            this.express.use('/', route.router);
        })
    }

    public connectToDatabase() {
         sequelize.sync({force: true});
    }

    public listen() {
        this.express.listen(this.port, this.host, () => {
            logger.info(`Server is running at port ${this.port}`);
        })
    }
}

export default App;