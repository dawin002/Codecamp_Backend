import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FilesService } from './files.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver()
export class FilesResolver {
  constructor(
    private readonly filesService: FilesService, //
  ) {}

  @Mutation(() => [String])
  uploadFile(
    // 브라우저에서 파일 받아오기
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[], // gql 타입과 ts 타입 다름
  ): Promise<string[]> {
    // 받은 파일 upload 서비스 함수로 전달하기
    return this.filesService.upload({ files });
  }
}
