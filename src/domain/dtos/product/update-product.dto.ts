export class UpdateProductDto {
  private constructor(
    public readonly _id: string,
    public readonly id: string,
    public readonly name?: string,
    public readonly stock?: number,
    public readonly available?: boolean,
    public readonly price?: number,
    public readonly description?: string,
    public readonly seller?: string,
    public readonly category?: string
  ) {}

  // Getter fot obtain only values not unidefined
  get value(): {
    [key: string]: any;
  } {
    const returnObj: { [key: string]: any } = {};
    if (this.name) returnObj.name = this.name;
    if (this.stock) returnObj.stock = this.stock;
    if (this.available != undefined) returnObj.available = this.available;
    if (this.price) returnObj.price = this.price;
    if (this.description) returnObj.description = this.description;
    if (this.seller) returnObj.price = this.seller;
    if (this.category) returnObj.category = this.category;

    return returnObj;
  }

  static create(object: { [key: string]: any }): [string?, UpdateProductDto?] {
    const { _id, id, name, stock, available, price, description, seller, category } = object;
    let avaiableBoolean = available;

    if (!id || !_id) return ['ID is required'];

    if (available !== undefined && typeof available != 'boolean') {
      avaiableBoolean = available === 'true';
    }

    return [
      undefined!,
      new UpdateProductDto(
        _id,
        id,
        name,
        stock,
        avaiableBoolean,
        price,
        description,
        seller,
        category
      ),
    ];
  }
}
