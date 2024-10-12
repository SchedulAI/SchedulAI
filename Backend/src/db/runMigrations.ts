import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
import config from '../config';

const client = new Client({
  user: config.DB_USER,
  host: config.DB_HOST,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
  port: Number(config.DB_PORT),
});

async function runMigrations() {
  try {
    await client.connect();
    const files = fs.readdirSync(path.join(__dirname, 'migrations')).sort();
    console.log('Executing Migrations...');

    for (const file of files) {
      const filePath = path.join(__dirname, 'migrations', file);
      const sql = fs.readFileSync(filePath, 'utf-8');
      await client.query(sql);
      console.log(`Migration ${file} executed successfully.`);
    }
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    await client.end();
  }
}

runMigrations();
