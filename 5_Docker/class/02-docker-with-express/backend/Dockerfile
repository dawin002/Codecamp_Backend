# 1. 운영체제 및 프로그램 설치(하나 하나 입력해서 다운받는 방식)

# 1. 운영체제 및 프로그램 설치
FROM node:14

# 2. 현재 폴더의 모든 파일을 Docker 컴퓨터 안의 myFolder 폴더로 복사하기
COPY . /myFolder/
WORKDIR /myFolder/
RUN yarn install

# 3. Docker 안에서 express 서버 실행시키기
CMD yarn start:dev