import {cityId} from "../index";
import {cityIdRaw} from "../index";

let a = cityId["86"]["110000"]
console.log(a.cityName)

console.log(cityId["86"]["110000"])
console.log(cityIdRaw["86"]["110000"])

for (const key in cityId) {
  for (const index in cityId[key]) {
    let cityItem = cityId[key][index]
    console.log(cityItem.cityName, cityItem.unofficialCityName, cityItem.weatherId)
    break
  }
  break
}