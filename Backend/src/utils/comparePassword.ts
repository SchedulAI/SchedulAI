import * as bcrypt from 'bcrypt';

const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
  } catch (error: any) {
    return false;
  }
};

export default comparePassword;
