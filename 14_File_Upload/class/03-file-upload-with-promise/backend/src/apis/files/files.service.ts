import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { IFilesServiceUpload } from './interfaces/files-service.interface';

@Injectable()
export class FilesService {
  async upload({ file }: IFilesServiceUpload): Promise<string> {
    console.log(file);

    // 1. 파일을 클라우드 스토리지에 저장하기

    // 1-1) 스토리지 세팅하기
    const storage = new Storage({
      projectId: 'codecamp-backend-422908', // Google Cloud 에서 내가 만든 프로젝트의 ID
      keyFilename: 'gcp-file-storage.json', // gcp 프로젝트에 대한 권한 파일
    }).bucket('codecamp-file-storage-dawin002'); // gcp 프로젝트의 사용할 버킷 등록

    // 1-2) 스토리지에 파일 올리기

    await new Promise((resolve, reject) => {
      file
        .createReadStream()
        .pipe(storage.file(file.filename).createWriteStream())
        .on('finish', () => {
          console.log('성공');
          resolve('성공');
        })
        .on('error', () => {
          console.log('실패');
          reject('실패');
        });
    });

    console.log('파일 전송이 완료되었습니다.');

    return '임시작성';
  }
}
