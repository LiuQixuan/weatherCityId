/**
 * ------------------------------------
 * File: c:\Users\LiuQixuan\Desktop\domWork\cityData\filter.js
 * Project: c:\Users\LiuQixuan\Desktop\domWork\cityData
 * Created Date: 2021-04-24  8:56:05
 * Author: LiuQixuan(liuqixuan@hotmail.com)
 * -----
 * Last Modified:  2021-06-06  8:55:56
 * Modified By: LiuQixuan
 * -----
 * Copyright 2020 - 2021 AIUSoft by LiuQixuan
 * ------------------------------------
 */
const path = require("path")
let data = require("./data")
const cityNameAndCityWeatherId =require("./cityNameWeatherId")
const cityNameAndCityWeatherIdPloyFill = require("./cityNameWeatherIdployfill")
const fs = require("fs")
const logger = require("./logger.js")
const minority = require("./minoritySet")
const jsBeautify = require('js-beautify')


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
      let unofficialCityName = getUnofficialName(cityName)
      // console.log("cityName", cityName,unofficialCityName)
      if (cityNameAndCityWeatherId[unofficialCityName] === undefined){
        // console.log("adptor-Before:",unofficialCityName,key2)
        if (key2.length > 6) { key2 = key2.slice(0, 6)}
        if (data[key2.slice(0, -4) + "0000"] === undefined || data[key2.slice(0, -4) + "0000"][key2.slice(0, -2) + "00"] === undefined){
          const tmpItem = data["86"][key2.slice(0, -2) + "00"]
          if(typeof tmpItem === "string"){
            worryArr.push([key1,key2])
            data[key1][key2] = { cityName, unofficialCityName, weatherId: "000000000" }
          }else{
            unofficialCityName = tmpItem.unofficialCityName
            data[key1][key2] = { cityName, unofficialCityName, weatherId: tmpItem.weatherId}
          }
        }else{
          const tmpItem = data[key2.slice(0, -4) + "0000"][key2.slice(0, -2) + "00"]
          if (typeof tmpItem === "string"){
            if (cityNameAndCityWeatherId[cityName]!==undefined){
              weatherId = cityNameAndCityWeatherId[cityName]
            } else if (data[key2.slice(0, -4) + "0000"][Object.keys(data[key2.slice(0, -4) + "0000"])[0]].weatherId !== undefined){
              weatherId = data[key2.slice(0, -4) + "0000"][Object.keys(data[key2.slice(0, -4) + "0000"])[0]].weatherId
            } else if (cityName === "市辖区"){
              unofficialCityName = data["86"][key2.slice(0, -4) + "0000"].unofficialCityName
              weatherId = cityNameAndCityWeatherId[unofficialCityName]
            } else {
              weatherId = "000000000"
            }
          } else if(tmpItem.weatherId === undefined){
            tmpItem.weatherId = data[key2.slice(0, -4) + "0000"][Object.keys(data[key2.slice(0, -4) + "0000"])[0]].weatherId
            weatherId = tmpItem.weatherId
          } else{
            weatherId = tmpItem.weatherId
          }
          if (unofficialCityName === "辖") {
            unofficialCityName = tmpItem.unofficialCityName
          }
          if (unofficialCityName === "" && (cityName === "城区" || cityName === "县")) {
            unofficialCityName = data[key2.slice(0, -2) + "00"][Object.keys(data[key2.slice(0, -2) + "00"])[0]].unofficialCityName
          }
          data[key1][key2Copy] = { cityName, unofficialCityName, weatherId}
        }
      }else{
        weatherId = cityNameAndCityWeatherId[unofficialCityName]
        data[key1][key2Copy] = { cityName, unofficialCityName, weatherId}
      }
    }
  }
  worryArr.forEach(arr => { 
    data[arr[0]][arr[1]].weatherId = data[arr[1]][Object.keys(data[arr[1]])[0]].weatherId
  })
  for (let key1 in data) {
    for (let key2 in data[key1]) {
      if (Object.keys(cityNameAndCityWeatherIdPloyFill).includes(data[key1][key2].unofficialCityName)){
        data[key1][key2].weatherId = cityNameAndCityWeatherIdPloyFill[data[key1][key2].unofficialCityName]
        delete (cityNameAndCityWeatherIdPloyFill[data[key1][key2].unofficialCityName])
      }
    }
  }
}



function writeFiles(data,fileName=`data-${Math.random()*1000}.json`){
  return fs.promises.open(fileName, 'w').then(fileHandle=>fileHandle.write(data))
}

function cleanDir(dirPath){
  return fs.promises.readdir(dirPath).then((files) => {
    files.forEach(file=>{
      let filePath = path.join(dirPath, file)
      if (fs.statSync(filePath).isDirectory()){
        fs.readdirSync(filePath,{maxRetries:3,recursive:true,retryDelay:500})
      }else{
        fs.rmSync(filePath,{ maxRetries: 3, recursive: true, retryDelay: 500 })
      }
    })
  }).then(() => logger(`clear dir '${dirPath}' complete.`,'cleanDir')).catch(e => {logger(e, 'cleanDir', 'error'); throw e })
}


async function build(){
    await cleanDir(path.join(__dirname,"../dist")).then(()=>console.log('clean'))
    filterData(data)
    const strArr = ['const data = ','\nmodule.exports = data']
    return Promise.all([writeFiles(strArr.join(JSON.stringify(data)), path.join(__dirname, "../dist/index.min.js")),
                        writeFiles(jsBeautify(strArr.join(JSON.stringify(data)), { indent_size: 4}), path.join(__dirname, "../dist/index.js")),
                        writeFiles(worryArr.join('\n'), path.join(__dirname, '../dist/data-error-log.log'))])
}


build().then(() => { logger("build weatherCityId success!", 'build') }).catch(e=>logger(e,'build','Error'))
