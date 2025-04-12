class Animal {
    public name: string;
    private age: number;
    protected species: string;

    constructor(name: string, age: number, species: string) {
        this.name = name;
        this.age = age;
        this.species = species;
    }
    
    public displayInfo(): void {
        console.log(`Name: ${this.name}, Age: ${this.age}, Species: ${this.species}`);
    }

    public getAge(): number {
        return this.age;
    }

}

const leo = new Animal("Leo", 5, "Lion");
console.log(leo.name);
leo.displayInfo();
//console.log(leo.age);
console.log(`Leo's age is: ${leo.getAge()}`);

//console.log(leo.species);

class Plant {
    constructor(public name: string, private type: string) {}

    public getType(): string {
        return this.type;
    }
}

const rose = new Plant("Rose", "Flower");
console.log(rose.name);
console.log(rose.getType());
// console.log(rose.type);
