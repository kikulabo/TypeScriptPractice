class User<T> {
    name: string;
    #age: number;
    readonly data: T;
    constructor(name: string, age: number, data: T) {
        this.name = name;
        this.#age = age;
        this.data = data;
    }
    public isAdult(): boolean {
        return this.#age >= 20;
    }
}
const uhyo = new User<string>("uhyo", 26, "追加データ");
const data = uhyo.data;
const john = new User("John Smith", 15, { num: 123 })
const data2 = john.data;
