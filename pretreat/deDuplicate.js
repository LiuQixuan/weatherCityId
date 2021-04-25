/**
 * ------------------------------------
 * File: c:\Users\LiuQixuan\Desktop\domWork\calendar\cityData\deDuplicate.js
 * Project: c:\Users\LiuQixuan\Desktop\domWork\calendar\cityData
 * Created Date: 2021-04-24  10:20:27
 * Author: LiuQixuan(liuqixuan@hotmail.com)
 * -----
 * Last Modified:  2021-04-24  10:27:06
 * Modified By: LiuQixuan
 * -----
 * Copyright 2020 - 2021 AIUSoft by LiuQixuan
 * ------------------------------------
 */

const groupData = ["壮族", "回族", "满族", "维吾尔族", "苗族", "彝族", "土家族", "藏族", "蒙古族", "侗族", "布依族", "瑶族", "白族", "朝鲜族", "哈尼族", "黎族", "哈萨克族", "傣族", "畲族", "傈僳族", "东乡族", "仡佬族", "拉祜族", "佤族", "水族", "纳西族", "羌族", "土族", "仫佬族", "锡伯族", "柯尔克孜族", "景颇族", "达斡尔族", "撒拉族", "布朗族", "毛南族", "塔吉克族", "普米族", "阿昌族", "怒族", "鄂温克族", "京族", "基诺族", "德昂族", "保安族", "俄罗斯族", "裕固族", "乌孜别克族", "门巴族", "鄂伦春族", "独龙族", "赫哲族", "高山族", "珞巴族", "塔塔尔族"]

let data = require("./cityNameIncludeKeyWord")
console.log(data.length)
let resultArr = []
for(let str of data){
  for (let keyWord of groupData){
    if(str.includes(keyWord)){
      resultArr.push(keyWord)
    }
  }
}
const fs = require("fs")
fs.writeFile('groupDataSet.json', JSON.stringify(resultArr), function (err) {
  if (err) {
    console.error(err)
  }
})