import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      // 게이트웨이 연결
      gateway: {
        // 서비스 묶어주기
        supergraphSdl: new IntrospectAndCompose({
          // 하위 서비스 목록
          subgraphs: [
            // 연결할 컴퓨터 주소 작성 (네임 리졸루션), 이름 안중요해서 아무렇게나 지음
            { name: 'qqq', url: 'http://auth-service:3001/graphql' },
            { name: 'zzz', url: 'http://resource-service:3001/graphql' },
          ],
        }),
      },
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
