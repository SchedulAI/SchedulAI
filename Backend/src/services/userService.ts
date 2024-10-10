import { createNewUser } from "../repository/userRepository";
import hashPassword from "../utils/hashPassword";

export const createnewUser = async (name: string, email: string, password: string): Promise<any> => {
    try {
        const hashedPassword = await hashPassword(password);
        if (typeof hashedPassword === 'string') {
            const newUser = await createNewUser(name, email, hashedPassword);
            return newUser;
        }
        throw new Error('Erro ao criar usuário');
    } catch(error: any){
        throw error;
    }
}