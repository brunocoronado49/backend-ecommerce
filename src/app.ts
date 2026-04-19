import { envs } from './config/envs';
import { MongoDatabase } from './data';
import { Server, AppRoutes } from './presentation';

(() => {
  main();
})();

// Initial point of application
async function main() {
  // Create the connection to database
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGODB_NAME,
  });

  // Initialization of server express
  const server = new Server({
    port: envs.PORT,
    router: AppRoutes.routes,
  });

  server.start();
}
