import * as userServices from "../services/userService";
import { Request, Response } from "express";

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const specialCharsRegex: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+/;

export const createNewUser = async (req: Request, res: Response): Promise<void> => {
    try {
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
            res.status(400).json({ error: "Senha deve ter no mínimo 6 caracteres" });
            return;
        }

        if (!specialCharsRegex.test(password)) {
            res.status(400).json({
                error: "Senha deve ter no mínimo 1 caracter especial",
            });
            return;
        }

        const newUser = await userServices.createnewUser(name, email, password);

        res.status(200).json({
            sucess: true,
            message: "Usuário criado com sucesso",
            data: newUser,
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
