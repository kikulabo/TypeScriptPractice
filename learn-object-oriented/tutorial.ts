abstract class Shape {
    constructor(public color: string) {}

    public displayColor(): void {
        console.log(`Color: ${this.color}`);
    }

    abstract calculateArea(): number;
    abstract displayInfo(): void;
}

// const myShape = new Shape("Red");

class Circle extends Shape {
    constructor(color: string, public radius: number) {
        super(color);
    }
    
    calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    displayInfo(): void {
        this.displayColor();
        console.log(`Type: Circle, Radius: ${this.radius}, Area: ${this.calculateArea().toFixed(2)}`);
    }

}

class Rectangle extends Shape {
    constructor(color: string, public width: number, public height: number) {
        super(color);
    }

    calculateArea(): number {
        return this.width * this.height;
    }

    displayInfo(): void {
        this.displayColor();
        console.log(`Type: Rectangle, Width: ${this.width}, Height: ${this.height}, Area: ${this.calculateArea()}`);
    }
}

const redCircle = new Circle("Red", 5);
const blueRectangle = new Rectangle("Blue", 10, 4);

const shapes: Shape[] = [redCircle, blueRectangle];

console.log("\n--- Shape Info ---");

shapes.forEach(shape => {
    shape.displayInfo();
    console.log("---");
});



