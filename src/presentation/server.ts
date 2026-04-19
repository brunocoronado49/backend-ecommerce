import path from 'path';
import express, { Router } from 'express';

interface Options {
  port: number;
  router: Router;
  publicPath?: string;
}

export class Server {
  // Create instance of express
  public readonly app = express();

  // Initial data for the functionality of server
  private readonly port: number;
  private readonly router: Router;
  private readonly publicPath: string;
  private serverListener?: any;

  constructor(options: Options) {
    const { port, router, publicPath = 'public' } = options;
    this.port = port;
    this.router = router;
    this.publicPath = publicPath;
  }

  // Start the server and express instance
  // Additional configuration like: middlewares, routes, initial path
  // and listener server
  public async start() {
    // Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Add static files
    this.app.use(express.static(this.publicPath));

    // Use the app routes
    this.app.use(this.router);

    this.app.get('/', (req, res) => {
      const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
      res.sendFile(indexPath);
    });

    // Listener of the server
    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  // Close the server
  public close() {
    this.serverListener?.close();
  }
}
