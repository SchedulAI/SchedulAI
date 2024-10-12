import { User } from '../entities/userEntity';
import { userRepository } from '../repository/userRepository';
import {
  ConflictException,
  InternalServerException,
  NotFoundException,
} from '../utils/exceptions';
import hashPassword from '../utils/hashPassword';

type CreateProps = {
  name: string;
  email: string;
  password: string;
};

type UpdateProps = {
  id: string;
  name?: string;
  email: string;
  password?: string;
};

export const userServices = {
  createUser: async ({ name, email, password }: CreateProps): Promise<User> => {
    const existentUser = await userRepository.findByEmail(email);

    if (existentUser) {
      throw new ConflictException('Email do Usuário já Cadastrado!');
    }

    const hashedPassword = await hashPassword(password);
    try {
      return await userRepository.create(name, email, hashedPassword);
    } catch (error: any) {
      throw new InternalServerException('Erro ao criar usuário');
    }
  },

  updateUser: async ({ id, name, email, password }: UpdateProps) => {
    const existentEmail = await userRepository.findByEmail(email);

    if (existentEmail) {
      throw new ConflictException('Esse Email já Existe no Sistema');
    }

    const existentUser = await userRepository.findById(id);

    if (!existentUser) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    let hashedPassword;
    if (password) {
      hashedPassword = await hashPassword(password);
    }

    try {
      return await userRepository.updateUserById(
        id,
        name,
        email,
        hashedPassword
      );
    } catch (error: any) {
      throw new InternalServerException('Erro ao Atualizar usuário');
    }
  },
};
