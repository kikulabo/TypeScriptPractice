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
var Shape = /** @class */ (function () {
    function Shape(color) {
        this.color = color;
    }
    Shape.prototype.displayColor = function () {
        console.log("Color: ".concat(this.color));
    };
    return Shape;
}());
// const myShape = new Shape("Red");
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(color, radius) {
        var _this = _super.call(this, color) || this;
        _this.radius = radius;
        return _this;
    }
    Circle.prototype.calculateArea = function () {
        return Math.PI * this.radius * this.radius;
    };
    Circle.prototype.displayInfo = function () {
        this.displayColor();
        console.log("Type: Circle, Radius: ".concat(this.radius, ", Area: ").concat(this.calculateArea().toFixed(2)));
    };
    return Circle;
}(Shape));
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(color, width, height) {
        var _this = _super.call(this, color) || this;
        _this.width = width;
        _this.height = height;
        return _this;
    }
    Rectangle.prototype.calculateArea = function () {
        return this.width * this.height;
    };
    Rectangle.prototype.displayInfo = function () {
        this.displayColor();
        console.log("Type: Rectangle, Width: ".concat(this.width, ", Height: ").concat(this.height, ", Area: ").concat(this.calculateArea()));
    };
    return Rectangle;
}(Shape));
var redCircle = new Circle("Red", 5);
var blueRectangle = new Rectangle("Blue", 10, 4);
var shapes = [redCircle, blueRectangle];
console.log("\n--- Shape Info ---");
shapes.forEach(function (shape) {
    shape.displayInfo();
    console.log("---");
});
