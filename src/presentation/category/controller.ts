import { Request, Response } from 'express';
import { CategoryService } from './category.service';
import {
  CreateCategoryDto,
  DeleteCategoryDto,
  PaginationDto,
  UpdateCategoryDto,
} from '../../domain';
import { HandleErrorController } from '../../helpers';

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  public createCategory = (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.categoryService
      .createCategory(createCategoryDto!, req.body.user)
      .then(category => res.status(201).json({ category }))
      .catch(error => HandleErrorController.handleError(error, res));
  };

  public updateCategory = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateCategoryDto] = UpdateCategoryDto.create({ ...req.body, id });

    if (error) return res.status(400).json({ error });

    this.categoryService
      .updateCategory(updateCategoryDto!)
      .then(updatedCategory => res.status(200).json({ updateCategoryDto }))
      .catch(error => HandleErrorController.handleError(error, res));
  };

  public deleteCategory = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, deleteCategoryDto] = DeleteCategoryDto.create({ id });

    if (error) return res.status(400).json({ error });

    this.categoryService
      .deleteCategory(deleteCategoryDto!)
      .then(result => res.status(200).json(result))
      .catch(error => HandleErrorController.handleError(error, res));
  };

  public getCategoryById = (req: Request, res: Response) => {
    const { id } = req.params;

    this.categoryService
      .getCategoryById(id as string)
      .then(category => res.status(200).json(category))
      .catch(error => HandleErrorController.handleError(error, res));
  };

  public getCategories = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);

    if (error) return res.status(400).json({ error });

    this.categoryService
      .getCategories(paginationDto!)
      .then(categories => res.status(200).json(categories))
      .catch(error => HandleErrorController.handleError(error, res));
  };
}
