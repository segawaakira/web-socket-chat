import IReturn from "../../interfaces/returns.interface";

const userValidation = (requestedEmail: string, userEmail: string): IReturn<string> => {
  const isValid = requestedEmail === userEmail;
  if (!isValid) return { type: 'INVALID_VALUE', message: 'Not authorized' };
  return { type: null, message: '' };
}

export default userValidation;