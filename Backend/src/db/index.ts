import { Pool } from "pg";
import config from "../config";
import test from "node:test";

const pool = new Pool({
    user: config.DB_USER,
    host: config.DB_HOST,
    database: config.DB_NAME,
    password: config.DB_PASSWORD,
    port: Number(config.DB_PORT),
    max: 20,
});

async function testConnection() {
    let test;
    try {
        console.log("Testando conexão com Banco");
        test = await pool.connect();
        if (test) console.log("Conexão com Banco bem sucedida!");
    } catch (error) {
        console.error("Erro ao conectar ao Banco");
    } finally {
        if (test) test.release();
    }
}

testConnection();

export default pool;
