import mongoose from 'mongoose';

interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  // Connection to Mongodb database with DI of url and database name
  static async connect(options: Options): Promise<boolean> {
    const { mongoUrl, dbName } = options;

    try {
      await mongoose.connect(mongoUrl, { dbName });
      console.log('MongoDB connected successfully!');

      return true;
    } catch (error) {
      console.log('Mongo connection error');
      throw error;
    }
  }

  static async disconnect() {
    await mongoose.disconnect();
  }
}
