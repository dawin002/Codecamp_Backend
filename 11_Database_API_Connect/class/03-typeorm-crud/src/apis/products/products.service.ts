import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductsServiceFindOne,
  IProductsSeviceCreate,
} from './interfaces/products-service.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, //
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({ where: { id: productId } });
  }

  create({ createProductInput }: IProductsSeviceCreate): Promise<Product> {
    const result = this.productsRepository.save({
      // 스프레드 연산자 사용하는 방식
      ...createProductInput,

      // 하나 하나 나열하는 방식
      //   name: createProductInput.name,
      //   description: createProductInput.description,
      //   price: createProductInput.price,
    });

    // result 는 무엇일까?
    // id(uuid), name, description, price를 필드로 가지는 객체

    return result;
  }
}
