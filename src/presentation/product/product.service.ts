import { ProductModel } from '../../data';
import {
  CreateProductDto,
  CustomError,
  DeleteProductDto,
  PaginationDto,
  UpdateProductDto,
} from '../../domain';

export class ProductService {
  constructor() {}

  public createProduct = async (createProductDto: CreateProductDto) => {
    const productExists = await ProductModel.findOne({ name: createProductDto.name });
    if (productExists) throw CustomError.badRequest('Product already exists');

    try {
      const product = new ProductModel(createProductDto);

      await product.save();

      return product;
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  };

  public updateProduct = async (updateProductDto: UpdateProductDto) => {
    const product = await ProductModel.findById(updateProductDto.id);
    if (!product) throw CustomError.notFound('Product not found');

    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        updateProductDto.id,
        updateProductDto.value,
        { new: true }
      )
        .populate('seller', 'fullName email')
        .populate('category', 'name');

      return updatedProduct;
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  };

  public deleteProduct = async (deleteProductDto: DeleteProductDto) => {
    const product = await ProductModel.findById(deleteProductDto.id);
    if (!product) throw CustomError.notFound('Product not found');

    try {
      await ProductModel.findByIdAndDelete(deleteProductDto.id);
      return {
        productId: deleteProductDto.id,
        product: product.name,
        message: 'Product deleted successfully',
      };
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  };

  public getProducts = async (paginationDto: PaginationDto) => {
    const { page = 1, limit = 10 } = paginationDto;

    try {
      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .populate('seller', 'fullName email')
          .populate('category', 'name'),
      ]);

      return {
        page,
        limit,
        total,
        products: products.map(product => {
          return {
            id: product.id,
            name: product.name,
            stock: product.stock,
            available: product.available,
            category: product.category,
            seller: product.seller,
          };
        }),
      };
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  };

  public getProductById = async (id: string) => {
    const product = await ProductModel.findById(id);
    if (!product) throw CustomError.notFound('Product not found');

    return product;
  };
}
