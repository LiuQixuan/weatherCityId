# 中国行政区域数据+天气api的城市编号/China administrative area data + weather api city code

- [中国行政区域数据+天气api的城市编号/China administrative area data + weather api city code](#中国行政区域数据天气api的城市编号china-administrative-area-data--weather-api-city-code)
  - [简介](#简介)
  - [标准](#标准)
  - [用法](#用法)
  - [构建方法](#构建方法)
  - [注意](#注意)
  - [历史版本](#历史版本)

## 简介

本项目适用于调用中国天气网api的城市参数转换,也可用于为城市选择级联组件提供数据.项目包含原始中国行政区数据集data.js,cityNameWeatherId.js,以及项目构建测试代码.项目最终以根目录下的index.js和index.d.ts为主题,其余为相关代码.
使用城市编码查询相关信息,相对于使用城市名,行政区编码,ip等方式,有着避免重复,划分粒度合理,格式规范准确等优势.
虽然中国天气网不再更新数据,但是国内现存的天气服务API大都支持中国天气网的API规范.所以此项目仍然有其存在的意义.


## 标准
```js
const cityId = {
  // ...
  "330000": {
      "330100": {
        "cityName": "杭州市",
        "unofficialCityName": "杭州",
        "weatherId": 101210101
      },
      // ...
  },
  // ...
}
```
|属性名|类型|意义|
|---|---|---|
|cityName|string|城市名|
|unofficialCityName|string|城市名|
|weatherId|number|对应中国天气网api中的area|

## 用法

```js
//ES6 Module
import {cityId,cityIdRaw} form "weatherCityId"

//CommonJs Module
const weatherCityId = reqriue("weatherCityId")
weatherCityId.cityId
weatherCityId.cityIdRaw

//CommonJs Module
const cityId = reqriue("weatherCityId").cityId
const cityIdRaw = reqriue("weatherCityId").cityIdRaw


//useage
console.log(cityId["86"]["110000"])

for (const key in cityId) {
  for (const index in cityId[key]) {
    let cityItem = cityId[key][index]
    console.log(cityItem.cityName, cityItem.unofficialCityName, cityItem.weatherId)
  }
}

```

## 构建方法
1. 数据准备阶段
   > 中国行政区数据来自[china-area-data](https://www.npmjs.com/package/china-area-data)

   > weatherCityId来自中国天气网
2. pretreat阶段
   >pretreat文件夹里是对相关数据的预处理脚本,主要为了筛选重复数据,筛选城市名中带有少数民族名称,及相关数据的统计,格式转换
3. build阶段
   >src文件夹的`build.js`为主要功能脚本<br/>
   >`data.js`为原始行政区数据<br/>
   >`cityNameWeatherId.js` 为weatherCityId相关数据<br/>
   >cityNameWeatherIdPolyfill.js 为weatherCityId重复名称以及例外数据<br/>
   >`minoritySet.js`为少数民族名称数据
4. 人工审查阶段
   >配合test文件夹做测试,然后执行 `node ./src/build.js`生成数据到dist,文件名为index.js<br/>
   >人工粗略审查
5. 发布

## 注意

>由于行政区编号和城市天气代码不是绝对一一对照关系,可能存在多个行政区对应一个天气编码的情况

>由于地名重名等原因,即使做了漏洞修补也可能造成极少数小城市对应的城市编码错误,如发现请issue反馈

>由于少数民族地区城市名称极其复杂所以少数民族地区的unofficialCityName仅供参考,实际以官方行政区名称为准

>港澳地区面积过小,特别行政区内的大多数市区可能使用香港,澳门的城市编码代替




## 历史版本

-  ✅v0.0.1 发布weatherCityId包,实现基本功能
-  ✅v0.0.2 修复部分bug,修复单字城市名称,修复大部分少数民族城市名的简写形式
-  ✅v0.0.3 重构项目构建脚本`src/build.js`,一键重新构建
-  🟩v0.0.X 添加更多支持,优化算法,修复潜在BUG
