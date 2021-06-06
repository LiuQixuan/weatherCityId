/**
 * ------------------------------------
 * File: d:\My Documents\Documents\GitHub\weatherCityId\src\loger.js
 * Project: d:\My Documents\Documents\GitHub\weatherCityId
 * Created Date: 2021-06-06  3:20:12
 * Author: LiuQixuan(liuqixuan@hotmail.com)
 * -----
 * Last Modified:  2021-06-06  6:19:20
 * Modified By: LiuQixuan
 * -----
 * Copyright 2020 - 2021 AIUSoft by LiuQixuan
 * ------------------------------------
 */
function logger(infoStr,callerName,loggerType){
  let callee = arguments.callee
  with (new Date()) { 
    console.log(`[${loggerType || 'info'}][Function:${callerName || arguments.callee.caller.name || 'Anonymous'}][${getFullYear()}-${getMonth() + 1}-${getDate()} ${getHours()}:${getMinutes()}:${getSeconds()}]:${infoStr||""}`)
  }
}
module.exports = logger