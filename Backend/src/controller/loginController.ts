import { Request, Response } from 'express';
import { loginServices } from '../services/loginServices';
import errorResponse from '../utils/errorResponse';
import jwt from 'jsonwebtoken';
import config from '../config';

export const loginController = {
  authenticate: async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    if (!req.body.email || !req.body.password) {
      errorResponse(res, {
        error: 'BAD_REQUEST',
        message: 'Email e senha são obrigatórios',
        statusCode: 400,
      });
      return;
    }

    try {
      const { auth, token } = await loginServices.authenticateUser(
        email,
        password
      );

      res.cookie('session_id', token, {
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
      res.clearCookie('session_id');
      res.status(200).json({
        success: true,
        message: 'Sua conta foi desconectada com sucesso!',
      });
    } catch (error: any) {
      errorResponse(res, error);
    }
  },

  validateToken: async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies.session_id;
    if (!token) {
      errorResponse(res, {
        error: 'NOT_FOUND',
        message: 'Token não encontrado!',
        statusCode: 404,
      });
      return;
    }
    try {
      const decoded = jwt.verify(token, config.SECRET_KEY);
      res.status(200).json({
        auth: true,
        user: decoded,
        success: true,
        message: 'Token valido!',
      });
      return;
    } catch (error: any) {
      res.status(401).json({ error: 'Token inválido' });
      return;
    }
  },
};
