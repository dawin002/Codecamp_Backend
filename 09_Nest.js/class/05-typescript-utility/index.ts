interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string; // ?: 있어도 되고 없어도 됨
}

// hobby가 꼭 있어야 하는 타입을 Utility 타입으로 만들자

// 1. Partial 타입
type PaProfile = Partial<IProfile>; // (모든 프로퍼티 뒤에 ?를 붙인 타입)

// 2. Required 타입
type ReProfile = Required<IProfile>; // (모든 프로퍼티 뒤에 ?를 뗀 타입)

// 3. Pick 타입
type PiPrifile = Pick<IProfile, "name" | "age">;

// 4. Omit 타입
type OmPrifile = Omit<IProfile, "school">;

// 5. Union 타입
type UType = "철수" | "유리" | "짱구";
let child1: UType = "철수"; // "맹구"로 초기화 불가능
let child2: string = "맹구"; // "맹구"로 초기화 가능

// 6. Record 타입 (Union 타입과 함께 써야함)
type RType = Record<UType, IProfile>;

// type RType = {   // 이렇게 정의한 것과 같음
//     철수: IProfile;
//     유리: IProfile;
//     짱구: IProfile;
// }

// 7. 객체의 key들로 Union 타입 만들기
type UType2 = keyof IProfile;
let profileKey: UType2 = "age";

// 8. type vs interface 차이
interface IProfile {
  candy: number;
}

// 9. 배운 것 응용
let profile: Partial<IProfile> = {
  candy: 10,
};
// 선언 병합으로 candy 프로퍼티를 추가한 IProfile를
//  candy만 초기화해도 선언 가능한 타입으로 변경
//  (선언병합 + Partial)
