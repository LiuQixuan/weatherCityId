/**
 * ------------------------------------
 * File: c:\Users\LiuQixuan\Desktop\domWork\cityData\filter.js
 * Project: c:\Users\LiuQixuan\Desktop\domWork\cityData
 * Created Date: 2021-04-24  8:56:05
 * Author: LiuQixuan(liuqixuan@hotmail.com)
 * -----
 * Last Modified:  2021-04-27  5:33:43
 * Modified By: LiuQixuan
 * -----
 * Copyright 2020 - 2021 AIUSoft by LiuQixuan
 * ------------------------------------
 */
const path = require("path")
let data = require("./data")
const cityNameAndCityWeatherId =require("./cityNameWeatherId")
const cityNameAndCityWeatherIdPloyFill = require("./cityNameWeatherIdployfill")


const minority = require("./minoritySet")

function getUnofficialName(fullName){
  let result = fullName
  if (fullName.length > 2&&fullName.indexOf('族') !== -1){
    for (let str of minority){
      if (fullName.slice(1).indexOf(str)!==-1){
        result = fullName.slice(0,fullName.indexOf(str))
        break
      }
    }
  }
  result = result.replace(/(市辖区)/,"辖")
  if (result.length > 2){
    result = result.replace(/(地区|城区|自治县|自治区|自治州|行政委员会|特别行政区|工业园区|管理区|城乡一体化示范区|现代产业园|经济技术开发区|高新技术产业开发区|高新技术产业园区|经济开发区|综合保税区|省|市|区|县|城區|區)/,"")
  }
  if (result.length === 1 && result !=="辖"){
    result = fullName
  }
  return result
}

console.log(getUnofficialName("湖南湘潭高新技术产业园区"));

function isIncludeKeyWord (fullName,keyWord) {
  let result = false
  if (fullName.length > 2 && fullName.lastIndexOf(keyWord)!==-1) {
    result = true
  }
  return result
}

let worryArr = []

function filterData(data){
  for(let key1 in data){
    for (let key2 in data[key1]){
      let weatherId = ""
      const key2Copy = key2
      const cityName = data[key1][key2]
      let unofficeCityName = getUnofficialName(cityName)
      // console.log("cityName", cityName,unofficeCityName)
      if (cityNameAndCityWeatherId[unofficeCityName] === undefined){
        // console.log("adptor-Before:",unofficeCityName,key2)
        if (key2.length > 6) { key2 = key2.slice(0, 6)}
        if (data[key2.slice(0, -4) + "0000"] === undefined || data[key2.slice(0, -4) + "0000"][key2.slice(0, -2) + "00"] === undefined){
          const tmpItem = data["86"][key2.slice(0, -2) + "00"]
          if(typeof tmpItem === "string"){
            worryArr.push([key1,key2])
            data[key1][key2] = { cityName, unofficeCityName, weatherId: "000000000" }
          }else{
            unofficeCityName = tmpItem.unofficeCityName
            data[key1][key2] = { cityName, unofficeCityName, weatherId: tmpItem.weatherId}
          }
        }else{
          const tmpItem = data[key2.slice(0, -4) + "0000"][key2.slice(0, -2) + "00"]
          if (typeof tmpItem === "string"){
            if (cityNameAndCityWeatherId[cityName]!==undefined){
              weatherId = cityNameAndCityWeatherId[cityName]
            } else if (data[key2.slice(0, -4) + "0000"][Object.keys(data[key2.slice(0, -4) + "0000"])[0]].weatherId !== undefined){
              weatherId = data[key2.slice(0, -4) + "0000"][Object.keys(data[key2.slice(0, -4) + "0000"])[0]].weatherId
            } else if (cityName === "市辖区"){
              unofficeCityName = data["86"][key2.slice(0, -4) + "0000"].unofficeCityName
              weatherId = cityNameAndCityWeatherId[unofficeCityName]
            } else {
              weatherId = "000000000"
            }
          } else if(tmpItem.weatherId === undefined){
            tmpItem.weatherId = data[key2.slice(0, -4) + "0000"][Object.keys(data[key2.slice(0, -4) + "0000"])[0]].weatherId
            weatherId = tmpItem.weatherId
          } else{
            weatherId = tmpItem.weatherId
          }
          if (unofficeCityName === "辖") {
            unofficeCityName = tmpItem.unofficeCityName
          }
          if (unofficeCityName === "" && (cityName === "城区" || cityName === "县")) {
            unofficeCityName = data[key2.slice(0, -2) + "00"][Object.keys(data[key2.slice(0, -2) + "00"])[0]].unofficeCityName
          }
          data[key1][key2Copy] = { cityName, unofficeCityName, weatherId}
        }
      }else{
        weatherId = cityNameAndCityWeatherId[unofficeCityName]
        data[key1][key2Copy] = { cityName, unofficeCityName, weatherId}
      }
    }
  }
  worryArr.forEach(arr => { 
    data[arr[0]][arr[1]].weatherId = data[arr[1]][Object.keys(data[arr[1]])[0]].weatherId
  })
  for (let key1 in data) {
    for (let key2 in data[key1]) {
      if (Object.keys(cityNameAndCityWeatherIdPloyFill).includes(data[key1][key2].unofficeCityName)){
        data[key1][key2].weatherId = cityNameAndCityWeatherIdPloyFill[data[key1][key2].unofficeCityName]
        delete (cityNameAndCityWeatherIdPloyFill[data[key1][key2].unofficeCityName])
      }
    }
  }
}



function writeFiles(data,fileName=`data-${Math.random()*1000}.json`){
  const fs = require("fs")
  fs.open(fileName,'w',(err,fd)=>{
    if(!err){
      fs.write(fd, JSON.stringify(data),callback=()=>{})
    }
  })
}



function main(){
  filterData(data)
  writeFiles(data,path.join(__dirname,"../output/index.json"))
  writeFiles(worryArr, path.join(__dirname,'../output/data-error-log.log'))
}



main()

console.log("Success!")
