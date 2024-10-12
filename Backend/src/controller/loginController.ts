import * as loginServices from "../services/loginServices";
import jwt from "jsonwebtoken";
import config from "../config";
import { Request, Response } from "express";

export const authenticate = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body as { email: string; password: string };

    try {
        if (!req.body.email || !req.body.password) {
            throw new Error("Email e senha são obrigatórios");
        }

        const user = await loginServices.getUser(email);
        if (!user) {
            res.status(400).json({ error: "Usuário e/ou senha inválidos!" });
            return;
        }
        const { auth, token } = await loginServices.authenticateUser(email, password);

        if (auth) {
            res.cookie("session_id", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 864000000),
            });
            res.status(200).json({ auth });
            return;
        }
        res.status(400).json({ error: "Usuário e/ou senha inválidos!" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie("session_id");
        res.status(200).json({
            success: true,
            message: "Sua conta foi desconectada com sucesso!",
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const validateToken = async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies.session_id;
    if (!token) {
        res.status(401).json({ error: "Token não encontrado" });
        return;
    }
    try {
        const decoded = jwt.verify(token, config.SECRET_KEY);
        res.status(200).json({ auth: true, user: decoded });
        return;
    } catch (error:any) {
        res.status(401).json({ error: "Token inválido" });
        return;
    }
}
