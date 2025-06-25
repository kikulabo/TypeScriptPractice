class User {
    name: string;
    private age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    public isAdult(): boolean {
        return this.age >= 20;
    }
}
const uhyo = new User("uhyo", 26);
console.log(uhyo.name);
console.log(uhyo.isAdult()); 
console.log(uhyo.age); //これはだめ
