// api docs의 정보(api 제목, 버전, ...) 설정
export const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: '나의 API 설명서',
            version: '1.0.0',
        },
    },
    apis: ['./swagger/*.swagger.js'],   // swagger 파일 위치 설정(api docs로 인식할 위치)
                                        // : swagger 폴더 안의 .swagger.js로 끝나는 모든 파일
};