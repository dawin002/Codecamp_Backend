import { CreateProductInput } from '../dto/create-product.input';

export interface IProductsSeviceCreate {
  createProductInput: CreateProductInput;
}

export interface IProductsServiceFindOne {
  productId: string;
}
