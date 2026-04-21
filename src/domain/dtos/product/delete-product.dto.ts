import { Validators } from '../../../helpers';

export class DeleteProductDto {
  private constructor(public readonly id: string) {}

  static create(object: { [key: string]: any }): [string?, DeleteProductDto?] {
    const { id } = object;

    if (!id) return ['ID is required'];
    if (!Validators.isMongoID(id)) return ['Invalid ID format'];

    return [undefined!, new DeleteProductDto(id)];
  }
}
