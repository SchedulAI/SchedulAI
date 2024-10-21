import express from 'express';
import { routes } from './routes/routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from './config';
import { configureWebSocket } from './utils/webSocket';

const app = express();
const port = config.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: config.ORIGIN_CORS, credentials: true }));

app.use('/api', routes);

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Configuração do WebSocket
configureWebSocket(server);