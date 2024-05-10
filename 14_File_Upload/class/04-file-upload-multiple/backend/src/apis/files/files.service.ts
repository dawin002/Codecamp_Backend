import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { IFilesServiceUpload } from './interfaces/files-service.interface';

@Injectable()
export class FilesService {
  async upload({ files }: IFilesServiceUpload): Promise<string[]> {
    console.log(files);

    const waitedFiles = [];
    waitedFiles[0] = await files[0];
    waitedFiles[1] = await files[1]; // 일단 두개 까지만 보내보기 (어차피 실패한 코드 파일임)

    // 1. 파일을 클라우드 스토리지에 저장하기

    // 1-1) 스토리지 세팅하기
    const storage = new Storage({
      projectId: 'codecamp-backend-422908', // Google Cloud 에서 내가 만든 프로젝트의 ID
      keyFilename: 'gcp-file-storage.json', // gcp 프로젝트에 대한 권한 파일
    }).bucket('codecamp-file-storage-dawin002'); // gcp 프로젝트의 사용할 버킷 등록

    // 1-2) 스토리지에 파일 올리기
    console.time('시간을 확인해보자!!'); // 실행시간 측정 시작
    const results = [];
    for (let i = 0; i < waitedFiles.length; i++) {
      results[i] = await new Promise((resolve, reject) => {
        waitedFiles[i]
          .createReadStream()
          .pipe(storage.file(waitedFiles[i].filename).createWriteStream())
          .on('finish', () => resolve(`${waitedFiles[i].filename} 성공`))
          .on('error', () => reject(`${waitedFiles[i].filename} 실패`));
      });
    }
    console.timeEnd('시간을 확인해보자!!'); // 실행시간 측정 끝

    console.log('파일 전송이 완료되었습니다.');

    return ['임시작성', '임시작성'];
  }
}
