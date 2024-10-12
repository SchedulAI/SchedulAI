import pool from '../db';
import { User } from '../entities/userEntity';
import { InternalServerException } from '../utils/exceptions';

export const userRepository = {
  create: async (
    name: string,
    email: string,
    password: string
  ): Promise<User> => {
    const client = await pool.connect();
    const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email`;
    try {
      const { rows } = await client.query(query, [name, email, password]);
      return rows[0];
    } catch (error: any) {
      throw new InternalServerException('Erro ao criar usuário');
    } finally {
      client.release(); // Certifique-se de liberar a conexão
    }
  },

  findByEmail: async (email: string): Promise<User | null> => {
    const client = await pool.connect();
    const query = `SELECT id, name, email FROM users WHERE email = $1`;
    try {
      const { rows } = await client.query(query, [email]);
      return rows[0];
    } catch (error: any) {
      throw new InternalServerException('Erro ao buscar usuário');
    } finally {
      client.release(); // Certifique-se de liberar a conexão
    }
  },

  findById: async (id: string): Promise<User | null> => {
    const client = await pool.connect();
    const query = `SELECT id, name, email FROM users WHERE id = $1`;
    try {
      const { rows } = await client.query(query, [id]);
      return rows[0];
    } catch (error: any) {
      throw new InternalServerException('Erro ao buscar usuário');
    } finally {
      client.release(); // Certifique-se de liberar a conexão
    }
  },

  updateUserById: async (
    id: string,
    name?: string,
    email?: string,
    password?: string
  ): Promise<User> => {
    const client = await pool.connect();
    const setClause = [];
    const values = [];

    if (name) {
      setClause.push(`name = $${values.push(name)}`);
    }
    if (email) {
      setClause.push(`email = $${values.push(email)}`);
    }
    if (password) {
      setClause.push(`password = $${values.push(password)}`);
    }

    values.push(id);

    const query = `
          UPDATE users
          SET ${setClause.join(', ')}
          WHERE id = $${values.length}
          RETURNING id, name, email`;
    try {
      const { rows } = await client.query(query, values);
      return rows[0];
    } catch (error: any) {
      throw new InternalServerException('Erro ao atualizar usuário');
    } finally {
      client.release(); // Certifique-se de liberar a conexão
    }
  },

  delete: async (id: number): Promise<void> => {
    const client = await pool.connect();
    const query = `DELETE FROM users WHERE id = $1 RETURNING id`;
    try {
      await client.query(query, [id]);
    } catch (error: any) {
      throw new InternalServerException('Erro ao deletar usuário');
    } finally {
      client.release(); // Certifique-se de liberar a conexão
    }
  },
};
