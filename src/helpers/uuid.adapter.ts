import { v4 as uuid } from 'uuid';

// Adapter for UUID, we can change the dependency if need it
export class UuidAdapter {
  static v4 = (): string => uuid();
}
