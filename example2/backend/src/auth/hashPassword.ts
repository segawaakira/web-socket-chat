import bcrypt from 'bcrypt';

const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}

export default hashPassword;