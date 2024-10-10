import * as bcrypt from 'bcrypt';

const hashPassword = async (password: string): Promise<string | boolean> => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error: any) {
        return false;
    }
}

export default hashPassword;