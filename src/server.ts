import App from './App'
import AuthRoutes from './routes/AuthRoutes';
import UserRoutes from "./routes/UserRoutes";

const app = new App([
    new UserRoutes(),
    new AuthRoutes()
]);

app.listen();