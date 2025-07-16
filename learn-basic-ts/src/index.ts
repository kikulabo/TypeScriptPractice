class A {
    foo = 123;
    bar = this.foo + 100;
}
const obj = new A();
console.log(obj.bar);
