import { env as bunEnv } from 'bun';

interface EnvConfig {
  DATABASE_URL: string;
  BUCKET_NAME: string;
}

export const env = (key: keyof EnvConfig) => {
  const value = bunEnv[key];
  if (!value) {
    throw new Error(`missing environment variable: ${key}`);
  }
  return value;
}