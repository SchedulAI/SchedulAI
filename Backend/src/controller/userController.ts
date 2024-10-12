import { Request, Response } from 'express';
import { userServices } from '../services/userService';
import errorResponse from '../utils/errorResponse';

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
      errorResponse(res, {
        error: 'BAD_REQUEST',
        message: 'Nome é obrigatório',
        statusCode: 400,
      });
      return;
    }

    if (!email) {
      errorResponse(res, {
        error: 'BAD_REQUEST',
        message: 'Email é obrigatório',
        statusCode: 400,
      });
      return;
    }

    if (!password) {
      errorResponse(res, {
        error: 'BAD_REQUEST',
        message: 'Senha é obrigatória',
        statusCode: 400,
      });
      return;
    }

    if (!emailRegex.test(email)) {
      errorResponse(res, {
        error: 'BAD_REQUEST',
        message: 'Email inválido',
        statusCode: 400,
      });
      return;
    }

    if (password.length < 6) {
      errorResponse(res, {
        error: 'BAD_REQUEST',
        message: 'Senha deve ter no mínimo 6 caracteres',
        statusCode: 400,
      });
      return;
    }

    if (!specialCharsRegex.test(password)) {
      errorResponse(res, {
        error: 'BAD_REQUEST',
        message: 'Senha deve ter no mínimo 1 caracter especial',
        statusCode: 400,
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
        message: 'Usuário criado com sucesso',
        data: newUser,
      });
    } catch (error: any) {
      errorResponse(res, error);
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
        res.status(400).json({ error: 'Email inválido' });
        return;
      }
    }

    if (password) {
      if (password.length < 6) {
        res.status(400).json({
          error: 'Senha deve ter no mínimo 6 caracteres',
        });
        return;
      }

      if (!specialCharsRegex.test(password)) {
        res.status(400).json({
          error: 'Senha deve ter no mínimo 1 caracter especial',
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
        message: 'Usuário Atualizado com sucesso',
        data: newUser,
      });
    } catch (error: any) {
      errorResponse(res, error);
    }
  },
};
