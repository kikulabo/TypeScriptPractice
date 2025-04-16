interface Loggable {
    logPrefix: string;

    log(message: string): void;
}

interface Serializable {
    serialize(): string;
}

class ConsoleLogger implements Loggable, Serializable {
    logPrefix: string;
    
    constructor(prefix: string) {
        this.logPrefix = prefix;
    }

    log(message: string): void {
        console.log(`${this.logPrefix} ${message}`);
    }
    
    serialize(): string {
        return JSON.stringify({ prefix: this.logPrefix });
    }
}

class User implements Loggable {
    constructor(public name: string, public userId: number) {} 

    logPrefix: string = 'User';

    log(message: string): void {
        console.log(`${this.logPrefix} [${this.userId}] ${this.name}: ${message}`);
    }
}

const logger = new ConsoleLogger("INFO");
logger.log("Application started.");
console.log(logger.serialize());

const user = new User("Alice", 123);
user.log("Logged in.");

function processLog(item: Loggable): void {
    item.log("Processing item...");
}

processLog(logger);
processLog(user);

const simpleLog = {
    logPrefix: "DEBUG",
    log: (msg) => console.log(`[${simpleLog.logPrefix}] ${msg}`)
}

processLog(simpleLog);


