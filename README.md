# 中国行政区域数据+天气api的城市编号/中文名称

# 中国行政区域数据+天气api的城市编号

## 简介

本项目适用于调用中国天气网api的城市参数转换,也可用于为城市选择级联组件提供数据.项目包含原始中国行政区数据集data.js,cityNameWeatherId.js,以及项目构建测试代码.项目最终以根目录下的index.js和index.d.ts为主题,其余为相关代码.
使用城市编码查询相关信息,相对于使用城市名,行政区编码,ip等方式,有着避免重复,划分粒度合理,格式规范准确等优势.
虽然中国天气网不再更新数据,但是国内现存的天气服务API大都支持中国天气网的API规范.所以此项目仍然有其存在的意义.


## 标准
```js
const data = {
  // ...
  "330000": {
      "330100": {
        "cityName": "杭州市",
        "unofficeCityName": "杭州",
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
|unofficeCityName|string|城市名|
|weatherId|number|对应中国天气网api中的area|

## 用法

```js
//ES6 Module
import weatherCityId form "weatherCityId"
//Common Module
const weatherCityId = reqriue("weatherCityId")


console.log(weatherCity["86"]["110000"])

for (const key in weatherCity) {
  for (const index in weatherCity[key]) {
    let cityItem = weatherCity[key][index]
    console.log(cityItem.cityName, cityItem.unofficeCityName, cityItem.weatherId)
  }
}

```
## 注意

>由于行政区编号和城市天气代码不是绝对一一对照关系,可能存在多个行政区对应一个天气编码的情况

>由于地名重名等原因,即使做了漏洞修补也可能造成极少数小城市对应的城市编码错误,如发现请issue反馈

>由于少数民族地区城市名称极其复杂所以少数民族地区的unofficeCityName仅供参考,实际以官方行政区名称为准

>港澳地区面积过小,特别行政区内的大多数市区可能使用香港,澳门的城市编码代替




## 历史版本

-  ✅v0.0.1 发布weatherCityId包,实现基本功能
-  🟩v0.0.X 添加更多支持,优化算法,修复潜在BUG