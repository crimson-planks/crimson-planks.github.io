"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gene = void 0;
var Dominance;
(function (Dominance) {
    Dominance[Dominance["reccesive"] = 0] = "reccesive";
    Dominance[Dominance["dominant"] = 1] = "dominant";
})(Dominance || (Dominance = {}));
var Gene = /** @class */ (function () {
    function Gene(value) {
        this.value = value;
    }
    Gene.prototype.toString = function () {
        return this.value;
    };
    return Gene;
}());
exports.Gene = Gene;
