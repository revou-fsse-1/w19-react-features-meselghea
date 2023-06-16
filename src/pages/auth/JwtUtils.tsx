import { v4 as uuidv4 } from 'uuid';

export function generateToken(id: string) {
  const uuid = uuidv4();
  const expirationDate = new Date().getHours() + 12;
  const token = `${id}_${uuid}_${uuid}_${uuid}_${expirationDate}`;
  return token;
}
