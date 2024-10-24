import jwt from 'jsonwebtoken';
import comparePassword from '../utils/comparePassword';
import { loginRepository } from '../repository/loginRepository';
import config from '../config';
import {
  BadRequestException,
  InternalServerException,
  NotFoundException,
} from '../utils/exceptions';
import { User } from '../entities/userEntity';

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginServices = {
  getUser: async (email: string): Promise<User> => {
    if (!emailRegex.test(email)) {
      throw new BadRequestException('Email inválido');
    }
    const user = await loginRepository.getUserByEmail(email);
    return user;
  },

  authenticateUser: async (email: string, password: string) => {
    const user = await loginRepository.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (!(await comparePassword(password, user.password!))) {
      throw new BadRequestException('Senha Incorreta!');
    }

    try {
      const token = jwt.sign({ id: user.id }, config.SECRET_KEY, {
        expiresIn: 864000,
      });
      return {
        auth: true,
        token: token,
        user: { id: user.id, email: user.email },
      };
    } catch (error: any) {
      throw new InternalServerException('Erro ao Autenticar Usuário');
    }
  },
};
