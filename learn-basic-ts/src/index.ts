type Human = {
	name: string;
	age: number;
};
type HumanKeys = keyof Human;
let key: HumanKeys = "name";
key = "age";
key = "hoge";
