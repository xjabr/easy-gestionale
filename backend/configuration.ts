require('dotenv').config();

export const JWT_SECRETS: string = process.env.JWT_SECRETS || 'secret';
export const MONGO_URL: string = process.env.MONGO_URL || 'url';
export const PORT: string|number = process.env.PORT || 5000