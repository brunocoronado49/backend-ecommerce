export class CreateCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, available } = object;
    let avaiableBoolean = available;

    if (!name) return ['Missing category name'];
    if (available !== undefined && typeof available != 'boolean') {
      avaiableBoolean = available === 'true';
    }

    return [undefined!, new CreateCategoryDto(name, avaiableBoolean)];
  }
}
