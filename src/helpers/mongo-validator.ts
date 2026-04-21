import mongoose from 'mongoose';

// Validate ID if is valid for mongodb
export class Validators {
  static isMongoID(id: string): boolean {
    return mongoose.isValidObjectId(id);
  }
}
