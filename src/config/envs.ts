import 'dotenv/config';
import { get } from 'env-var';

// Helper to use envs from better way
export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGODB_NAME: get('MONGODB_NAME').required().asString(),
  JWT_SEED: get('JWT_SEED').required().asString(),
};
