import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductsServiceCheckSoldout,
  IProductsServiceDelete,
  IProductsServiceFindOne,
  IProductsServiceUpdate,
  IProductsSeviceCreate,
} from './interfaces/products-service.interface';
import { ProductsSaleslocationsService } from '../productsSaleslocations/productsSaleslocations.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, //

    private readonly productsSaleslocationsService: ProductsSaleslocationsService,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['productSaleslocation', 'productCategory'],
    });
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory'],
    });
  }

  async create({
    createProductInput,
  }: IProductsSeviceCreate): Promise<Product> {
    // 1. 상품 하나만 등록할 때 사용하는 방법
    // const result = this.productsRepository.save({
    //   ...createProductInput,
    // });

    // 2. 상품과 상품판매위치, 태그를 함께 등록하는 방법
    const { productSaleslocation, productCategoryId, productTags, ...product } =
      createProductInput;

    // 2-1. 상품판매위치 등록
    const result = await this.productsSaleslocationsService.create({
      productSaleslocation,
    }); // 서비스를 타고 가야 하는 이유는?
    //  // 레파지토리에 여러 군데에서 직접 접근하면 검증 로직을 통일시킬 수 없기 때문

    // 2-2. 태그 등록
    // productTags가 ['#전자제품', '#영등포', '#컴퓨터']와 같은 패턴이라고 가정
    const tagNames = productTags.map((el) => el.replace('#', ''));

    const prevTags = await this.productsTagsRepository.find({
      where: { name: In(tagNames) },
    });

    const newTags = await this.productsTagsRepository.insert([...tagNames]); // bulk-insert는 save()로 불가능

    const result2 = this.productsRepository.save({
      ...product,
      productSaleslocation: result, // result 통째로 넣기 vs id만 넣기
      productCategory: {
        id: productCategoryId,
        // 만약에 name까지 결과로 돌려주고 싶으면
        // => createProductInput 에 name 까지 포함해서 받아오기
      },
      productTags: newTags.identifiers,
    });

    return result2;
  }

  // create-product.input.ts 수정후 에러 나는 부분 주석 처리, 왜 에러나는지 찾고, 에러 해결해보기
  async update({
    productId,
    updateProductInput,
    // }: IProductsServiceUpdate): Promise<Product> {
  }: IProductsServiceUpdate): Promise<void> {
    const product = await this.findOne({ productId });

    this.checkSoldout({ product });

    // const result = this.productsRepository.save({
    //   ...product,
    //   ...updateProductInput,
    // });

    // return result;
  }

  checkSoldout({ product }: IProductsServiceCheckSoldout): void {
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 핀매 완료된 상품입니다.');
    }
  }

  async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
    // 1. 실제 삭제
    // const result = await this.productsRepository.delete({ id: productId });

    // 2. 소프트 삭제(직접 구현) - isDeleted 칼럼
    // this.productsRepository.update({ id: productId }, { isDeleted: true });

    // 3. 소프트 삭제(직접 구현) - deletedAt 칼럼
    // this.productsRepository.update({id: productId}, {deletedAt: new Date() });

    // 4. 소프트 삭제(TypeORM 제공) - softRemove
    // this.productsRepository.softRemove({ id: productId });

    // 5. 소프트 삭제(TypeORM 제공) - softDelete
    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
