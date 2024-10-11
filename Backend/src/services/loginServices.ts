import * as jwt from 'jsonwebtoken';
import comparePassword from '../utils/comparePassword';
import config from '../config';
import getUserByEmail from '../repository/loginRepository';

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const getUser = async (username: string) => {
    try {
        let user;
        if(!emailRegex.test(username)) {
            throw new Error("Email inválido")
        } 
        user = await getUserByEmail(username)
        return user;
    } catch(error: any){
        throw error
    }
}

export const authenticateUser = async (username: string, password: string) => {
    try{
        let user;
        if(!emailRegex.test(username)) {
            throw new Error("Email inválido")
        }
        user = await getUserByEmail(username);

        if (user &&(await comparePassword(password, user.password))) {
            const token = jwt.sign({ id: user.id }, config.SECRET_KEY, { expiresIn: 864000})
            return { auth: true, token: token }
        }

        return { auth: false, token: null, error: "Usuário e/ou senha inválidos" }
    } catch(error: any){
        throw error
    }
}
