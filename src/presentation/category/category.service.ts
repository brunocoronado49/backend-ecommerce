import { CategoryModel } from '../../data';
import {
  CreateCategoryDto,
  CustomError,
  DeleteCategoryDto,
  PaginationDto,
  UpdateCategoryDto,
  UserEntity,
} from '../../domain';

export class CategoryService {
  constructor() {}

  public createCategory = async (createCategoryDto: CreateCategoryDto, seller: UserEntity) => {
    const categoryExists = await CategoryModel.findOne({ name: createCategoryDto.name });
    if (categoryExists) throw CustomError.badRequest('Category already exists');

    try {
      const category = new CategoryModel({
        ...createCategoryDto,
        seller: seller.id,
      });

      await category.save();

      return {
        id: category.id,
        name: category.name,
        available: category.available,
      };
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  };

  public updateCategory = async (updateCategoryDto: UpdateCategoryDto) => {
    const category = await CategoryModel.findById(updateCategoryDto.id);
    if (!category) throw CustomError.notFound('Category not found');

    try {
      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        updateCategoryDto.id,
        updateCategoryDto.value,
        { new: true }
      ).populate('seller', 'fullName email');

      return updatedCategory;
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  };

  public deleteCategory = async (deleteCategoryDto: DeleteCategoryDto) => {
    const category = await CategoryModel.findById(deleteCategoryDto.id);
    if (!category) throw CustomError.notFound('Category not found');

    try {
      await CategoryModel.findByIdAndDelete(deleteCategoryDto.id);
      return {
        categoryId: deleteCategoryDto.id,
        category: category.name,
        message: 'Category deleted successfully',
      };
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  };

  public getCategoryById = async (id: string) => {
    const category = await CategoryModel.findById(id);
    if (!category) throw CustomError.notFound('Category not found');

    return category;
  };

  public getCategories = async (paginationDto: PaginationDto) => {
    const { page, limit } = paginationDto;

    try {
      const [total, categories] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find()
          .skip((page - 1) * limit)
          .populate('seller', 'fullName email')
          .limit(limit),
      ]);

      return {
        page,
        limit,
        total,
        categories: categories.map(category => {
          return {
            id: category.id,
            name: category.name,
            available: category.available,
            seller: category.seller,
          };
        }),
      };
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  };
}
