class User {
    name: string;
    protected age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    public isAdult(): boolean {
        return this.age >= 20;
    }
}

class PremiumUser extends User {
    public isAdult(): boolean {
        return this.age >= 10;
    }
}

const miniUhyo = new PremiumUser("uhyo", 15);
const john = new User("John Smith", 15);
console.log(miniUhyo.isAdult());
console.log(john.isAdult());
