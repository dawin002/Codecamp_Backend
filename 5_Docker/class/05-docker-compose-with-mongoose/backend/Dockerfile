# 1. 운영체제 및 프로그램 설치(하나 하나 입력해서 다운받는 방식)

# 1. 운영체제 및 프로그램 설치
FROM node:14

# 2. 현재 폴더의 모든 파일을 Docker 컴퓨터 안의 myFolder 폴더로 복사하기

# 캐시가 깨지기 전에 yarn install 실행해 캐시에서 node_modules 가져오게 하기
COPY ./package.json /myFolder/
COPY ./yarn.lock /myFolder/
WORKDIR /myFolder/
RUN yarn install

# 소스코드 복사하며 캐시가 깨짐
COPY . /myFolder/
# WORKDIR /myFolder/    # 캐시가 깨지기 전에 실행하기 위해 위로 옮기기
# RUN yarn install      # 캐시가 깨지기 전에 실행하기 위해 위로 옮기기

# 3. Docker 안에서 express 서버 실행시키기
CMD yarn start:dev