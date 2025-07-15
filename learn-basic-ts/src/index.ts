class User {
    name: string;
    #age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.#age = age;
    }
    public isAdult(): boolean {
        return this.#age >= 20;
    }
}
const uhyo = new User("uhyo", 25);
const john = new User("John Smith", 15);
const boundIsAdult = uhyo.isAdult.bind(uhyo);
console.log(boundIsAdult());
console.log(boundIsAdult.call(john));
