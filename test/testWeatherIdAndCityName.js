/**
 * ------------------------------------
 * File: c:\Users\LiuQixuan\Desktop\domWork\calendar\cityData\testWeatherIdAndCityName.js
 * Project: c:\Users\LiuQixuan\Desktop\domWork\calendar\cityData
 * Created Date: 2021-04-24  11:58:42
 * Author: LiuQixuan(liuqixuan@hotmail.com)
 * -----
 * Last Modified:  2021-04-25  12:12:18
 * Modified By: LiuQixuan
 * -----
 * Copyright 2020 - 2021 AIUSoft by LiuQixuan
 * ------------------------------------
 */

const cityNameAndCityWeatherId = require("./cityNameWeatherId")
let tmp ={}

function main(){
  let arr = new Set()
  for (let item of cityNameAndCityWeatherId){
    let cityName = Object.keys(item)[0]
    if(tmp[cityName]!==undefined){
      tmp[cityName] +=1
      arr.add(cityName)
    }else{
      tmp[cityName] = 1
    }
  }
  arr.forEach(e=>console.log(tmp[e]))
}

main()