import authenticateUser, {getUser} from "../services/loginServices";
import { Request, Response } from 'express';

export const authenticate = async (req: Request, res: Response) => {
    const { email, password } = req.body as { email: string, password: string };

    try {
        if (!req.body.email || !req.body.password) {
            throw new Error("Email e senha são obrigatórios");
        }

        const user = await getUser(email);
        if(!user){
            return res.status(400).json({ error: 'Usuário e/ou senha inválidos!' });
        }
        const { auth, token } = await authenticateUser(email, password);

        if (auth) {
            res.cookie('session_id', token, { httpOnly: true, expires: new Date(Date.now() + 864000000) });
            return res.status(200).json({ auth });
        }
        return res.status(400).json({ error: 'Usuário e/ou senha inválidos!' });
    } catch(error: any){
        return res.status(400).json({ error: error.message });
    }
};
