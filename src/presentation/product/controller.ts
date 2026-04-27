import { Request, Response } from 'express';
import { ProductService } from './product.service';
import { CreateProductDto, DeleteProductDto, PaginationDto, UpdateProductDto } from '../../domain';
import { HandleErrorController } from '../../helpers';

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  public createProduct = async (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.productService
      .createProduct(createProductDto!)
      .then(product => res.status(201).json(product))
      .catch(error => HandleErrorController.handleError(error, res));
  };

  public getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.productService
      .getProductById(id as string)
      .then(product => res.status(200).json(product))
      .catch(error => HandleErrorController.handleError(error, res));
  };

  public updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateProductDto] = UpdateProductDto.create({ ...req.body, id });

    if (error) return res.status(400).json({ error });

    this.productService
      .updateProduct(updateProductDto!)
      .then(product => res.status(200).json(product))
      .catch(error => HandleErrorController.handleError(error, res));
  };

  public deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, deleteCategoryDto] = DeleteProductDto.create({ id });

    if (error) return res.status(400).json({ error });

    this.productService
      .deleteProduct(deleteCategoryDto!)
      .then(result => res.status(200).json(result))
      .catch(error => HandleErrorController.handleError(error, res));
  };

  public getProducts = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);

    if (error) return res.status(400).json({ error });

    this.productService
      .getProducts(paginationDto!)
      .then(products => res.status(200).json(products))
      .catch(error => HandleErrorController.handleError(error, res));
  };
}
