import { Module, CacheModule } from '@nestjs/common';
import { BoardsModule } from './apis/boards/boards.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './apis/products/products.module';
import { ProductsCategoriesModule } from './apis/productsCategories/productsCategories.module';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';
import { PointsTransactionsModule } from './apis/pointsTransactions/pointsTransactions.module';
import { PaymentsModule } from './apis/payments/payments.module';
import { FilesModule } from './apis/files/files.module';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    AuthModule,
    BoardsModule, //
    FilesModule,
    PaymentsModule,
    PointsTransactionsModule,
    ProductsModule,
    ProductsCategoriesModule,
    UsersModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }), // api 요청 들어오면 context 에 req, res 를 담아주기
      //                                     // req 는 기본적으로 들어오지만, res는 이렇게 해줘야 들어옴
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql', // mysql
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT), // 환경변수는 문자열만 할당돼서 숫자로 바꿔줘야함
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://my-redis:6379',
      isGlobal: true, // 전역으로 CacheModule 설정해 어디서든 Redis 접속할 수 있게 하기
    }),
  ],
})
export class AppModule {}
