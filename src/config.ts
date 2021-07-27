import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

export const PORT: number = process.env.PORT
	? parseInt(process.env.PORT)
	: 3001;

export const MONGOURL: string = process.env.MONGOURL as string;

export const GITHUB_API_URL: string =
  process.env.GITHUB_API_URL || 'https://api.github.com';

export const GITHUB_CLIENT_ID: string | undefined  = process.env.GITHUB_CLIENT_ID;

export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

