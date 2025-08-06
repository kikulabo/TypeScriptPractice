function getHelloStr(): `Hello, ${string}!` {
    const rand = Math.random();
    if (rand < 0.3) {
        return "Hello, world!";
    } else if (rand < 0.6) {
        return "Hello, my world!";
    } else if (rand < 0.9) {
        return "Hello, world!";
    } else {
        return "Hell, world!";
    }
}
