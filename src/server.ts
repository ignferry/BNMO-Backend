import dotenv from "dotenv";
import App from './App'
import UserRoutes from "./routes/UserRoutes";


const app = new App([new UserRoutes()]);

app.listen();