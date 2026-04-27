export class UpdateCategoryDto {
  private constructor(
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
    if (!object) return ['Payload is missing'];

    const { _id, id, name, available } = object;
    const finalId = _id || id;
    let avaiableBoolean = available;

    if (!finalId) return ['ID is required'];

    if (available !== undefined && typeof available != 'boolean') {
      avaiableBoolean = available === 'true';
    }

    return [undefined!, new UpdateCategoryDto(id, name, avaiableBoolean)];
  }
}
