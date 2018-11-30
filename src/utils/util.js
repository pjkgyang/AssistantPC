
import Vue from 'vue';
import { getResponsibleTaskList } from '@/api/common.js'
import CryptoJS from 'crypto-js';

// 总线
export const EventBus = new Vue();

// DES 加密
export function encryptByDES(message, key){
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
     });
    return encrypted.toString();
  }
// DES 解密
export function  decryptByDES(ciphertext, key){
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    // direct decrypt ciphertext
    const decrypted = CryptoJS.DES.decrypt({
       ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
     }, keyHex, {
       mode: CryptoJS.mode.ECB,
       padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
//  保留两位小数1
export function returnFloat(value) {
    var value = Math.round(parseFloat(value) * 100) / 100;
    var xsd = value.toString().split(".");
    if (xsd.length == 1) {
        value = value.toString() + ".00";
        return value;
    }
    if (xsd.length > 1) {
        if (xsd[1].length < 2) {
            value = value.toString() + "0";
        }
        return value;
    }
}

export function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

// 格式化日期
export function getMyDate(str) {
    var oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oSen = oDate.getSeconds(),
        oMonth = oMonth < 10 ? ('0' + oMonth) : oMonth
    oDay = oDay < 10 ? ('0' + oDay) : oDay
    oMin = oMin < 10 ? ('0' + oMin) : oMin
    oHour = oHour < 10 ? ('0' + oHour) : oHour
    oSen = oSen < 10 ? ('0' + oSen) : oSen
    let oTime = oYear + '-' + oMonth + '-' + oDay + ' ' + oHour + ':' + oMin + ':' + oSen;
    return oTime;
}

export function GetDateStr(DayCount){ 
    var dd = new Date(); 
    dd.setDate( dd.getDate() + DayCount);//获取DayCount天后的日期 
    var y = dd.getFullYear(); 
    var m = dd.getMonth()+1;
    var d = dd.getDate(); 
    var s = y+"-"+(m<10?('0'+m):m)+"-"+(d<10?('0'+d):d);
    return  s;
}

export function GetQuestionDateStr(DayCount){ 
    var dd = new Date(); 
    dd.setDate( dd.getDate() + DayCount);//获取DayCount天后的日期 
    return dd;
}

export function GetNextDate(newDate,DayCount){ 
    var dd = new Date(newDate); 
    dd.setDate( dd.getDate() + DayCount);//获取DayCount天后的日期 
    var y = dd.getFullYear(); 
    var m = dd.getMonth()+1;
    var d = dd.getDate(); 
    var s = y+"-"+(m<10?('0'+m):m)+"-"+(d<10?('0'+d):d);
    return  s;
}

export function GetMonthBefore(newDate,MonthCount){
    var d = new Date(newDate);
    // 因为getMonth()获取的月份的值只能在0~11之间所以我们在进行setMonth()之前先给其减一
    d.setMonth((d.getMonth()) + MonthCount);
    var yy1 = d.getFullYear();
    var mm1 = d.getMonth()+1;
    var dd1 = d.getDate();
    if (mm1 < 10 ) {
        mm1 = '0' + mm1;
    }
    if (dd1 < 10) {
      dd1 = '0' + dd1;
    }
    var s = yy1 + '-' + mm1 + '-' + dd1;
    return s;
}

// Unix 时间戳 转换当前时间
export function formatTime(time) {
    let unixtime = time
    let unixTimestamp = new Date(unixtime * 1000)
    let Y = unixTimestamp.getFullYear()
    let M = (unixTimestamp.getMonth()+1) < 10 ? ( '0' + (unixTimestamp.getMonth()+1)):unixTimestamp.getMonth()+1 
    let D = (unixTimestamp.getDate() > 10 ? unixTimestamp.getDate() : '0' + unixTimestamp.getDate())
    let H = (unixTimestamp.getHours() > 10 ? unixTimestamp.getHours() : '0' + unixTimestamp.getHours())
    let MM = (unixTimestamp.getMinutes() > 10 ? unixTimestamp.getMinutes() : '0' + unixTimestamp.getMinutes());          //分  
    let S = (unixTimestamp.getSeconds() > 10 ? unixTimestamp.getSeconds() : '0' + unixTimestamp.getSeconds());
    let toDay = Y + '-' + M + '-' + D + ' ' + H + ':' + MM + ':' + S
    return toDay
}


export function getMenu(type,Arrlist,isInterface){
    getResponsibleTaskList({
        name:type,
        isInterface:isInterface||''
    }).then(({data})=>{
      if (!!data && data.state == "success") {     
              let map = data.data;
              let Arr = Object.keys(map);
              let McArr = Object.values(map)
              for(var i = 0;i< Arr.length;i++){
                  Arrlist.push({
                    label:Arr[i],
                    mc:McArr[i]
                  })
                }
            sessionStorage.setItem(type,JSON.stringify(Arrlist));
            delCookie(type);
          }
     })
 }

function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

 function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
} 

export function getSession(name) {
        return JSON.parse(sessionStorage.getItem(name));
} 

//  排序
export function compare(prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if (val1 > val2) {
            return -1;
        } else if (val1 < val2) {
            return 1;
        } else {
            return 0;
        }            
    } 
}

function getOffsetDays(time1, time2) {
    return Math.ceil(Math.abs(time1 - time2) / (3600 * 24 * 1e3 * 7));
}
 
// 获取周数
export function  getWeeks(year, month){ 
    var d = new Date();
    let lastMonth = month-1;
    let lastYear = year;
    let firstWeek;
    let lastWeek;
    if(lastMonth == 0)
    {
        lastMonth = 12;
        lastYear = year-1;
    }
    if (lastMonth < 10) {
        lastMonth = "0" + lastMonth;
    }
    
    let myDate = new Date(year, month, 0); 
    let myDay = year + "-" + month + "-" + myDate.getDate();////本月的最后一天
    let firstWeekDay = new Date(myDay).getDay();
    if(firstWeekDay<4){
        firstWeek =  addDate(myDay,-(firstWeekDay));
    }else{
        firstWeek = addDate(myDay,(7-firstWeekDay));
    } 

    let lastDate = new Date(lastYear, lastMonth, 0); 
    let lastDay = lastYear + "-" + lastMonth + "-" + lastDate.getDate();//上月的最后一天
    let lastWeekDay = new Date(lastDay).getDay();
    if(lastWeekDay<4){
        lastWeek =  addDate(lastDay,-(lastWeekDay-1));
    }else{
        lastWeek = getMondayTime(year,month<10?'0'+month:month,1);
    }
    let week_count = getOffsetDays(new Date(firstWeek).getTime(),new Date(lastWeek).getTime());
    // let week_count = (myDay % 7)>2?Math.ceil(myDay / 7):Math.floor(myDay / 7);
    return week_count;
}

// 获取 （days 前后日期）
function addDate(date,days){ 
    var d=new Date(date); 
    d.setDate(d.getDate()+days); 
    var m=d.getMonth()+1; 
    var tmpDate = d.getFullYear()+ "/" + m + "/" + d.getDate(); 
    var resultDate = new Date(tmpDate); 
    var y = resultDate.getFullYear(); 
    var m = resultDate.getMonth()+1;
    var d = resultDate.getDate(); 
    var s = y+"-"+(m<10?('0'+m):m)+"-"+(d<10?('0'+d):d);
    return  s;
} 

// 获取每月第几周的周一的日期
function getMondayTime(year, month,weekday) {
    var d = new Date();
    // 该月第一天
    d.setFullYear(year, month-1, 1);
    var w1 = d.getDay();
    if (w1 == 0) w1 = 7;
    // 该月天数
    d.setFullYear(year, month, 0);
    var dd = d.getDate();
    // 第一个周一
    let d1;
    if (w1 != 1) d1 = 7 - w1 + 2;
    else d1 = 1;
    var monday = d1+(weekday-1)*7;
    monday = monday<10?'0'+monday:monday
    return year+'-'+month+'-'+monday;
}

//  获取上个月最后一天周几
export function getLastMonth(year,month){
    var nowdays = new Date();
    let nowMonth;
    if(month==0)
    {
        month=12;
        year=year-1;
    }
    if (month < 10) {
        nowMonth = '0' + (month+1);
        month = "0" + month;
    }else{
        nowMonth = month+1 
    }
    var firstDay = year + "-" + month + "-" + "01";//上个月的第一天
    var myDate = new Date(year, month, 0);
    var lastDay = year + "-" + month + "-" + myDate.getDate();//上个月的最后一天
    let lastWeekDay = new Date(lastDay).getDay();
    if(lastWeekDay<4){
        return addDate(lastDay,-(lastWeekDay-1));
    }else{
        return getMondayTime(year,nowMonth,1);
    } 
}

// 获取月份最后一天
export function getLastMonthDay(year,month){
    let myDate = new Date(year, month, 0);
    let lastDay = year + "-" + (month>=10?month:'0'+month) + "-" + myDate.getDate();
    return lastDay;
}

// 获取下一个月
export function getNextMonth(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中的月的天数
    var year2 = year;
    var month2 = parseInt(month) + 1;
    if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }

    var t2 = year2 + '-' + month2 
    return t2;
}

// 获取上一个月
export function  getPreMonth(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var t2 = year2 + '-' + month2;
    return t2;
}

export function weekIndexInMonth(str){
    let date = new Date();
    let dateStart = new Date((new Date(str))); // 本月初
    let firstWeek = 1;
    if (dateStart.getDay() === 1) {
        firstWeek = 1;
    } else if (dateStart.getDay() === 0) {
        firstWeek = 8 - 7 + 1;
    } else {
        firstWeek = 8 - dateStart.getDay() + 1;
    }
    let weekIndex = 1;
    let c = Math.ceil(Math.abs(Date.now() - (new Date(str)).getTime())/(24*3600*1000));
    // let c = date.getDate();
    if (date.getDay() === 1 && date.getDate() < 7) {
        weekIndex = 1;
    } else if (c < firstWeek ) {
        weekIndex = -1;
    } else {
        if (c < 7) {
            weekIndex = Math.ceil(c/7);
        } else {
            c =  c - firstWeek + 1;
            if (c%7 === 0) {
                if (dateStart.getDay() !== 6) {
                    weekIndex = c/7;
                } else {
                    weekIndex = c/7 + 1;
                }
            } else {
                weekIndex = Math.ceil(c/7);
            }
        }
    }
    return weekIndex;
}