import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { IFilesServiceUpload } from './interfaces/files-service.interface';

@Injectable()
export class FilesService {
  async upload({ files }: IFilesServiceUpload): Promise<string[]> {
    console.log(files);

    const waitedFiles = await Promise.all(files); // 각각 await 해서 waitedFiles 에 담기
    console.log(waitedFiles);

    // 1. 파일을 클라우드 스토리지에 저장하기

    // 1-1) 스토리지 세팅하기
    const bucket = 'codecamp-file-storage-dawin002';
    const storage = new Storage({
      projectId: 'codecamp-backend-422908', // Google Cloud 에서 내가 만든 프로젝트의 ID
      keyFilename: 'gcp-file-storage.json', // gcp 프로젝트에 대한 권한 파일
    }).bucket(bucket); // gcp 프로젝트의 사용할 버킷 등록

    // 1-2) 스토리지에 파일 올리기
    console.time('시간을 확인해보자!!'); // 실행시간 측정 시작

    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise<string>((resolve, reject) => {
            el.createReadStream()
              .pipe(storage.file(el.filename).createWriteStream())
              .on('finish', () => resolve(`${bucket}/${el.filename}`))
              .on('error', () => reject(`${el.filename} 실패`));
          }),
      ),
    );

    console.timeEnd('시간을 확인해보자!!'); // 실행시간 측정 끝

    console.log('파일 전송이 완료되었습니다.');

    return results;
  }
}
