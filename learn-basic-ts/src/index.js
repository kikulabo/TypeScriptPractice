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
var User = /** @class */ (function () {
    function User(name, age) {
        this.name = name;
        this.age = age;
    }
    User.prototype.isAdult = function () {
        return this.age >= 20;
    };
    return User;
}());
var PremiumUser = /** @class */ (function (_super) {
    __extends(PremiumUser, _super);
    function PremiumUser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rank = 1;
        return _this;
    }
    return PremiumUser;
}(User));
var uhyo = new PremiumUser("uhyo", 26);
console.log(uhyo.rank);
console.log(uhyo.name);
console.log(uhyo.isAdult());
