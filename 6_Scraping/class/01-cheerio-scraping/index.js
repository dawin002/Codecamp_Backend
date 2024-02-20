import axios from 'axios'
import cheerio from 'cheerio'

const createMessage = async () => {
    // 입력된 메시지: "안녕하세요~ https://www.naver.com 에 방문해주세요!"

    // 1. 입력된 메시지에서 http로 시작하는 문장이 있는지 찾기(.find() 등의 알고리즘 사용)
    const url = "https://www.naver.com";

    // 2. axios.get으로 요청해서 html 데이터 받아오기 => Scraping
    const result = await axios.get(url);
    // console.log(result.data);

    // 3. Scraping 결과에서 OG(오픈그래프) 코드를 골라내서 변수에 담기 => cheerio 도움 받기
    const $ = cheerio.load(result.data);
    $("meta").each((index, el) => {
        // if ($(el).attr("property") && $(el).attr("property").includes("og:")) 와 동일
        if ($(el).attr("property")?.includes("og:")) { // 위 조건식을 하나로 통합
            const key = $(el).attr("property"); // OG 태그 이름
            const value =  $(el).attr("content"); // OG 태그 내용
            console.log(key, value);
        }
    });
}

createMessage();