class User {
    name: string = "";
    age: number = 0;
}
type MyUserConstructor = new () => User;

const MyUser: MyUserConstructor = User;

const u = new MyUser();

console.log(u.name, u.age);
