import { Request, Response } from "express";
import { userServices } from "../services/userService";

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const specialCharsRegex: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+/;

export const userController = {
    createNewUser: async (req: Request, res: Response): Promise<void> => {
        const { name, email, password } = req.body as {
            name: string;
            email: string;
            password: string;
        };

        if (!name) {
            res.status(400).json({ error: "Nome é obrigatório" });
            return;
        }

        if (!email) {
            res.status(400).json({ error: "Email é obrigatório" });
            return;
        }

        if (!password) {
            res.status(400).json({ error: "Senha é obrigatória" });
            return;
        }

        if (!emailRegex.test(email)) {
            res.status(400).json({ error: "Email inválido" });
            return;
        }

        if (password.length < 6) {
            res.status(400).json({
                error: "Senha deve ter no mínimo 6 caracteres",
            });
            return;
        }

        if (!specialCharsRegex.test(password)) {
            res.status(400).json({
                error: "Senha deve ter no mínimo 1 caracter especial",
            });
            return;
        }

        try {
            const newUser = await userServices.createUser({
                name,
                email,
                password,
            });

            res.status(200).json({
                sucess: true,
                message: "Usuário criado com sucesso",
                data: newUser,
            });
        } catch (error: any) {
            res.status(error.statusCode).json({ error: error.message });
        }
    },

    updateExistentUser: async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id;
        const { name, email, password } = req.body as {
            name?: string;
            email: string;
            password?: string;
        };

        if (email) {
            if (!emailRegex.test(email)) {
                res.status(400).json({ error: "Email inválido" });
                return;
            }
        }

        if (password) {
            if (password.length < 6) {
                res.status(400).json({
                    error: "Senha deve ter no mínimo 6 caracteres",
                });
                return;
            }

            if (!specialCharsRegex.test(password)) {
                res.status(400).json({
                    error: "Senha deve ter no mínimo 1 caracter especial",
                });
                return;
            }
        }
        try {
            const newUser = await userServices.updateUser({
                id,
                name,
                email,
                password,
            });

            res.status(200).json({
                sucess: true,
                message: "Usuário Atualizado com sucesso",
                data: newUser,
            });
        } catch (error: any) {
            res.status(error.statusCode).json({ error: error.message });
        }
    },
};
