"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var a = index_1.cityId["86"]["110000"];
console.log(a.cityName);
console.log(index_1.cityId["86"]["110000"]);
for (var key in index_1.cityId) {
    for (var index in index_1.cityId[key]) {
        var cityItem = index_1.cityId[key][index];
        console.log(cityItem.cityName, cityItem.unofficialCityName, cityItem.weatherId);
        break;
    }
    break;
}
//# sourceMappingURL=test.js.map