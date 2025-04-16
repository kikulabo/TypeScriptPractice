var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger(prefix) {
        this.logPrefix = prefix;
    }
    ConsoleLogger.prototype.log = function (message) {
        console.log("".concat(this.logPrefix, " ").concat(message));
    };
    ConsoleLogger.prototype.serialize = function () {
        return JSON.stringify({ prefix: this.logPrefix });
    };
    return ConsoleLogger;
}());
var User = /** @class */ (function () {
    function User(name, userId) {
        this.name = name;
        this.userId = userId;
        this.logPrefix = 'User';
    }
    User.prototype.log = function (message) {
        console.log("".concat(this.logPrefix, " [").concat(this.userId, "] ").concat(this.name, ": ").concat(message));
    };
    return User;
}());
var logger = new ConsoleLogger("INFO");
logger.log("Application started.");
console.log(logger.serialize());
var user = new User("Alice", 123);
user.log("Logged in.");
function processLog(item) {
    item.log("Processing item...");
}
processLog(logger);
processLog(user);
var simpleLog = {
    logPrefix: "DEBUG",
    log: function (msg) { return console.log("[".concat(simpleLog.logPrefix, "] ").concat(msg)); }
};
processLog(simpleLog);
