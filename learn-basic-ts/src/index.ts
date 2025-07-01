class User {
    name: string = "";
    age: number = 0;
    isAdult(): boolean {
        return this.age >= 20;
    }
}

const uhyo: User = new User();

const john: User = {
    name: "John Smith",
    age: 15,
    isAdult: () => true
};
