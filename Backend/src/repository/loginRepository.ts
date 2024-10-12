import pool from '../db';
import { User } from '../entities/userEntity';
import { InternalServerException } from '../utils/exceptions';

export const loginRepository = {
  getUserByEmail: async (email: string): Promise<User> => {
    const client = await pool.connect();
    try {
      const query = `SELECT * FROM users WHERE email = $1`;
      const { rows } = await client.query(query, [email]);
      return rows[0];
    } catch (error: any) {
      throw new InternalServerException('Erro ao encontrar usuário');
    } finally {
      client.release(); // Certifique-se de liberar a conexão
    }
  },
};
