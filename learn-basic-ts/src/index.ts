function getHelloStr(): `Hello, ${string}!` {
    const rand = Math.random();
    if (rand < 0.3) {
        return "久しぶりの登壇!";
    } else if (rand < 0.6) {
        return "お疲れ様でした!";
    } else if (rand < 0.9) {
        return "Hello, world!";
    } else {
        return "Hell, world!";
    }
}
