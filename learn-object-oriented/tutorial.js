var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal = /** @class */ (function () {
    function Animal(name, age, species) {
        this.name = name;
        this.age = age;
        this.species = species;
        this.name = name;
        this.age = age;
        this.species = species;
    }
    Animal.prototype.displayInfo = function () {
        console.log("Name: ".concat(this.name, ", Age: ").concat(this.age, ", Species: ").concat(this.species));
    };
    Animal.prototype.getAge = function () {
        return this.age;
    };
    return Animal;
}());
var leo = new Animal("Leo", 5, "Lion");
console.log(leo.name);
leo.displayInfo();
//console.log(leo.age);
console.log("Leo's age is: ".concat(leo.getAge()));
//console.log(leo.species);
var Plant = /** @class */ (function () {
    function Plant(name, type) {
        this.name = name;
        this.type = type;
    }
    Plant.prototype.getType = function () {
        return this.type;
    };
    return Plant;
}());
var rose = new Plant("Rose", "Flower");
console.log(rose.name);
console.log(rose.getType());
// console.log(rose.type);
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(name, age, breed) {
        var _this = _super.call(this, name, age, "Canine") || this;
        _this.breed = breed;
        console.log("Species set to: ".concat(_this.species));
        return _this;
    }
    Dog.prototype.bark = function () {
        console.log("".concat(this.name, " says Woof!"));
    };
    Dog.prototype.displayInfo = function () {
        _super.prototype.displayInfo.call(this);
        console.log("Breed: ".concat(this.breed));
    };
    return Dog;
}(Animal));
var buddy = new Dog("Buddy", 3, "Golden Retriever");
console.log(buddy.name);
console.log(buddy.getAge());
//console.log(buddy.species);
console.log(buddy.breed);
buddy.bark();
buddy.displayInfo();
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(name, age) {
        return _super.call(this, name, age, "Feline") || this;
    }
    Cat.prototype.displayInfo = function () {
        console.log("Meow! I'm ".concat(this.name, ", a ").concat(this.species, ". Age: ").concat(this.getAge()));
    };
    Cat.prototype.purr = function () {
        console.log("".concat(this.name, " is purring..."));
    };
    return Cat;
}(Animal));
var whiskers = new Cat("Whiskers", 2);
var myPets = [];
myPets.push(leo);
myPets.push(buddy);
myPets.push(whiskers);
console.log("\n--- Pet Parade ---");
myPets.forEach(function (pet) {
    pet.displayInfo();
    if (pet instanceof Dog) {
        pet.bark(); // Dogインスタンスならbark()を呼ぶ
    }
    else if (pet instanceof Cat) {
        pet.purr(); // Catインスタンスならpurr()を呼ぶ
    }
    console.log("---");
});
