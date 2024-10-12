import * as bcrypt from "bcrypt";
import { InternalServerException } from "./exceptions";

const hashPassword = async (password: string): Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error: any) {
        throw new InternalServerException(error);
    }
};

export default hashPassword;
