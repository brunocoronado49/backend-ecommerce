import { Validators } from '../../../helpers';

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly stock: number,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly seller: string,
    public readonly category: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, stock, available, price, description, seller, category } = object;
    let avaiableBoolean = available;

    if (!name) return ['Missing product name'];
    if (!stock) return ['Missing stock'];
    if (!description) return ['Missing product description'];
    if (!price) return ['Missing product price'];

    if (available !== undefined && typeof available != 'boolean') {
      avaiableBoolean = available === 'true';
    }

    if (!seller) return ['Missing seller'];
    if (!Validators.isMongoID(seller)) return ['Invalid user ID'];
    if (!category) return ['Missing category'];
    if (!Validators.isMongoID(category)) return ['Invalid category ID'];

    return [
      undefined!,
      new CreateProductDto(name, stock, avaiableBoolean, price, description, seller, category),
    ];
  }
}
