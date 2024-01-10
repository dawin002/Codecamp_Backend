# 1. 운영체제 및 프로그램 설치(하나 하나 입력해서 다운받는 방식)
# FROM ubuntu:22.04

# RUN sudo apt install nodejs
# RUN sudo npm install yarn


# 1. 운영체제 및 프로그램 설치(이미 Ubuntu, nodejs, npm, yarn까지 모두 설치된 컴퓨터 다운받는 방식)
FROM node:14

# 2. 내 컴퓨터의 폴더나 파일을 Docker 컴퓨터 안으로 복사하기
COPY ./index.js index.js

# 3. Docker 안에서 index.js 실행시키기
CMD node index.js