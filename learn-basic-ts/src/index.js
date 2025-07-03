var User = /** @class */ (function () {
    function User(name, age) {
        this.name = name;
        this.age = age;
    }
    return User;
}());
function getPrice(customer) {
    if (customer instanceof User) {
        if (customer.name === "uhyo") {
            return 0;
        }
    }
    return customer.age < 18 ? 1000 : 1800;
}
var customer1 = { age: 15 };
var customer2 = { age: 40 };
var uhyo = new User("uhyo", 26);
console.log(getPrice(customer1));
console.log(getPrice(customer2));
console.log(getPrice(uhyo));
