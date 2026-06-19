import { envs } from './config/envs';
import { MongoDatabase } from './data';
import { Server, AppRoutes } from './presentation';

(() => {
  main();
})();

// Initial point of application
async function main() {
  // Create the database connection
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGODB_NAME,
  });

  // Server express initialization
  const server = new Server({
    port: envs.PORT,
    router: AppRoutes.routes,
  });

  server.start();
}
