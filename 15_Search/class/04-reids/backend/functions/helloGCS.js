// GCP의 Cloud Functions 중 helloGCS 파일에 저장된 함수

/**
 * Triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.helloGCS = (event, context) => {
  console.log('안녕하세요! 저는 트리거입니다!!');
  const gcsEvent = event;
  console.log(`Processing file: ${gcsEvent.name}`);
  console.log(`event: ${JSON.stringify(event)}`); // event 내용 확인
  console.log(`context: ${JSON.stringify(context)}`); // context 내용 확인
};
// event 와 context 는 객체이기 때문에 JSON.stringify 로 문자열로 변환해서 출력
