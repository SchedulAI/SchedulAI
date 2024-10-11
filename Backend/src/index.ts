import express, { Request, Response } from "express";
import { routes } from "./routes/routes";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api", routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
