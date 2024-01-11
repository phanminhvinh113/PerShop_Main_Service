import crypto from 'crypto'

export const generateRandomByte = (size: number): string => {
   return crypto.randomBytes(size).toString('hex')
}
