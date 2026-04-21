export class UpdateCategoryDto {
  private constructor(
    public readonly _id: string,
    public readonly id: string,
    public readonly name?: string,
    public readonly available?: boolean
  ) {}

  // Getter fot obtain only values not unidefined
  get value(): {
    [key: string]: any;
  } {
    const returnObj: { [key: string]: any } = {};
    if (this.name) returnObj.name = this.name;
    if (this.available != undefined) returnObj.available = this.available;

    return returnObj;
  }

  static create(object: { [key: string]: any }): [string?, UpdateCategoryDto?] {
    const { _id, id, name, available } = object;
    let avaiableBoolean = available;

    if (!id || !_id) return ['ID is required'];

    if (available !== undefined && typeof available != 'boolean') {
      avaiableBoolean = available === 'true';
    }

    return [undefined!, new UpdateCategoryDto(id, _id, name, avaiableBoolean)];
  }
}
