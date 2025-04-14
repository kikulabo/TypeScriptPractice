class Animal {
    constructor(public name: string, private age: number, protected species: string) {
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

class Dog extends Animal {
    public breed: string;

    constructor(name: string, age: number, breed: string) {
        super(name, age, "Canine");
        this.breed = breed;
        console.log(`Species set to: ${this.species}`)
    }
    
    public bark(): void {
        console.log(`${this.name} says Woof!`);
    }

    public displayInfo(): void {
        super.displayInfo();
        console.log(`Breed: ${this.breed}`);
    }
}

const buddy = new Dog("Buddy", 3, "Golden Retriever");

console.log(buddy.name);
console.log(buddy.getAge());
//console.log(buddy.species);
console.log(buddy.breed);
buddy.bark();
buddy.displayInfo();

class Cat extends Animal {
    constructor(name: string, age: number) {
        super(name, age, "Feline");
    }

    public displayInfo(): void {
        console.log(`Meow! I'm ${this.name}, a ${this.species}. Age: ${this.getAge()}`);
    }

    public purr(): void {
        console.log(`${this.name} is purring...`);
    }
}

const whiskers = new Cat("Whiskers", 2);

const myPets: Animal[] = [];
myPets.push(leo);
myPets.push(buddy);
myPets.push(whiskers);

console.log("\n--- Pet Parade ---");

myPets.forEach(pet => {
    pet.displayInfo();
    if (pet instanceof Dog) {
        pet.bark(); // Dogインスタンスならbark()を呼ぶ
    } else if (pet instanceof Cat) {
        pet.purr(); // Catインスタンスならpurr()を呼ぶ
    }
    console.log("---");
});

