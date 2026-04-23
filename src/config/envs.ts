import 'dotenv/config';
import { get } from 'env-var';

// Helper to use envs from better way
export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGODB_NAME: get('MONGODB_NAME').required().asString(),
  JWT_SEED: get('JWT_SEED').required().asString(),
  SEND_EMAIL: get('SEND_EMAIL').default('true').asBool(),
  MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
  MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
  MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
  WEBSERVICE_URL: get('WEBSERVICE_URL').required().asString(),
  WEBSERVICE_UTL_NGROK: get('WEBSERVICE_UTL_NGROK').required().asString(),
};
