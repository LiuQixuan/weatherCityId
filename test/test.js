"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("../index"));
var a = index_1.default["86"]["110000"];
console.log(a.cityName);
console.log(index_1.default["86"]["110000"]);
for (var key in index_1.default) {
    for (var index in index_1.default[key]) {
        var cityItem = index_1.default[key][index];
        console.log(cityItem.cityName, cityItem.unofficeCityName, cityItem.weatherId);
        break;
    }
    break;
}
//# sourceMappingURL=test.js.map