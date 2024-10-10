import { Pool } from "pg";
import config from "../config";

const pool = new Pool({
    user: config.DB_USER,
    host: config.DB_HOST,
    database: config.DB_NAME,
    password: config.DB_PASSWORD,
    port: Number(config.DB_PORT),
    max: 20,
})

export default pool;