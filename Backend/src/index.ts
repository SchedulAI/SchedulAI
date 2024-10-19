import express from 'express';
import { routes } from './routes/routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from './config';

const app = express();
const port = config.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: config.ORIGIN_CORS, credentials: true }));

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
