import { Request, Response } from "express";
import { loginServices } from "../services/loginServices";
import errorResponse from "../utils/errorResponse";

export const loginController = {
    authenticate: async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body as {
            email: string;
            password: string;
        };

        if (!req.body.email || !req.body.password) {
            errorResponse(res, {
                error: "BAD_REQUEST",
                message: "Email e senha são obrigatórios",
                statusCode: 400,
            });
            return;
        }

        try {
            const { auth, token } = await loginServices.authenticateUser(
                email,
                password
            );

            res.cookie("session_id", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 864000000),
            });
            res.status(200).json({ auth });
            return;
        } catch (error: any) {
            errorResponse(res, error);
        }
    },

    logout: async (req: Request, res: Response): Promise<void> => {
        try {
            res.clearCookie("session_id");
            res.status(200).json({
                success: true,
                message: "Sua conta foi desconectada com sucesso!",
            });
        } catch (error: any) {
            errorResponse(res, error);
        }
    },
};
