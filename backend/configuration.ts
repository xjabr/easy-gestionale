require('dotenv').config();

export const JWT_SECRETS: string = process.env.JWT_SECRETS || 'secret';