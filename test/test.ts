import weatherCityId from "../index";

let a = weatherCityId["86"]["110000"]
console.log(a.cityName)

console.log(weatherCityId["86"]["110000"])

for (const key in weatherCityId) {
  for (const index in weatherCityId[key]) {
    let cityItem = weatherCityId[key][index]
    console.log(cityItem.cityName, cityItem.unofficeCityName, cityItem.weatherId)
    break
  }
  break
}