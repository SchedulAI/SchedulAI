import { createnewUser } from "../services/userService";
import { Request, Response } from 'express';

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const specialCharsRegex: RegExp= /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+/;

export const createNewUser = async (req: Request, res: Response) => {
    try{
        const { name, email, password } = req.body as { name: string, email: string, password: string };

        if (!name) {
            return res.status(400).json({ error: "Nome é obrigatório" });
        }

        if (!email) {
            return res.status(400).json({ error: "Email é obrigatório" });
        }

        if (!password) {
            return res.status(400).json({ error: "Senha é obrigatória" });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Email inválido" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Senha deve ter no mínimo 6 caracteres" });
        }

        if (!specialCharsRegex.test(password)) {
            return res.status(400).json({ error: "Senha deve ter no mínimo 1 caracter especial" });
        }

        const newUser = await createnewUser(name, email, password);
        return res.status(200).json({ sucess: true, message: 'Usuário criado com sucesso', data: newUser });
    } catch(error: any){
        return res.status(400).json({ error: error.message });
    }
}