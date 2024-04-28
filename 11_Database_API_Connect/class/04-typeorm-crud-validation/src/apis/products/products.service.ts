import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductsServiceCheckSoldout,
  IProductsServiceFindOne,
  IProductsServiceUpdate,
  IProductsSeviceCreate,
} from './interfaces/products-service.interface';
import e from 'express';

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
    });

    return result;
  }

  async update({
    productId,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product> {
    const product = await this.findOne({ productId });

    this.checkSoldout({ product });

    // this.productsRepository.create()  => DB 접속이랑 관련 없음. 등록을 위한 빈 객체 생성
    // this.productsRepository.insert()  => 결과를 객체로 못 돌려받는 등록
    // this.productsRepository.update()  => 결과를 객체로 못 돌려받는 수정
    // this.productsRepository.save()    => 결과를 객체로 돌려주는 등록/수정
    //                                      단, 불필요한 조회가 발생할 수 있음

    const result = this.productsRepository.save({
      // 레파지토리의 save() 쿼리에서 id가 없으면 등록, id가 있으면 수정
      ...product,
      ...updateProductInput,
    });

    return result;
  }

  checkSoldout({ product }: IProductsServiceCheckSoldout): void {
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 핀매 완료된 상품입니다.');
    }

    // 위와 같은 동작
    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 핀매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }
}
