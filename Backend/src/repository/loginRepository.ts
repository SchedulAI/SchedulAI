import pool from "../db";
import { User } from "../entities/userEntity";
import { InternalServerException } from "../utils/exceptions";

export const loginRepository = {
    getUserByEmail: async (email: string): Promise<User> => {
        try {
            const query = `SELECT * FROM users WHERE email = $1`;
            const { rows } = await pool.query(query, [email]);
            return rows[0];
        } catch (error: any) {
            throw new InternalServerException("Erro ao encontrar usuário");
        }
    },
};
