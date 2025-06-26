class User {
    constructor(public name: string, private age: number) {}
    public isAdult(): boolean {
        return this.age >= 20;
    }
}
const uhyo = new User("uhyo", 26);
console.log(uhyo.name);
console.log(uhyo.isAdult()); 
