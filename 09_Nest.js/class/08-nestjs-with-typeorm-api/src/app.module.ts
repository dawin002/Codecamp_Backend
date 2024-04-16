import { Module } from '@nestjs/common';
import { BoardsModule } from './apis/boards/boards.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './apis/boards/entities/board.entity';

@Module({
  imports: [
    BoardsModule, //
    // ProductsModule,
    // UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql', // mysql 외에 다른 DB도 가능
      host: 'localhost', // 내 컴퓨터에 있는 MySQL에 접속하겠다
      port: 3306,
      username: 'root',
      password: '1804',
      database: 'myproject', // 사용할 데이터베이스 이름
      entities: [Board], // 사용할 테이블, 아직 없기 때문에 빈칸으로 둠
      synchronize: true, // DB에 모듈 동기화시키기
      logging: true, // 어떤 명령어로 변환되는지 로그로 보여주는 옵션
    }),
  ],
})
export class AppModule {}
