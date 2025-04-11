var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
        console.log("Greeterオブジェクトが作成されました！");
    }
    Greeter.prototype.greet = function () {
        console.log(this.greeting);
    };
    return Greeter;
}());
var myGreeter = new Greeter("こんにちは、TypeScript！");
myGreeter.greet();
console.log(myGreeter.greeting);
