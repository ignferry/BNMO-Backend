import App from './App'
import AuthRoutes from './routes/AuthRoutes';
import RequestRoutes from './routes/RequestRoutes';
import TransactionRoutes from './routes/TransactionRoutes';
import TransferRoutes from './routes/TransferRoutes';
import UserRoutes from "./routes/UserRoutes";

const app = new App([
    new AuthRoutes(),
    new UserRoutes(),
    new TransactionRoutes(),
    new RequestRoutes(),
    new TransferRoutes()
]);

app.listen();