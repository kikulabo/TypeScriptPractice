class Greeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
        console.log("Greeterオブジェクトが作成されました！");
    }

    greet(): void {
        console.log(this.greeting);
    }
}

const myGreeter = new Greeter("こんにちは、TypeScript！");

myGreeter.greet();

console.log(myGreeter.greeting);
