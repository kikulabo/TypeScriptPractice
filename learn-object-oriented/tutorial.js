var Animal = /** @class */ (function () {
    function Animal(name, age, species) {
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
