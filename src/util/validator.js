// 校验手机号码
export const validPhone = (rule, value, callback) => {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  if (!value) {
      callback(new Error('请输入手机号码'))
  } else if (!reg.test(value)) {
      callback(new Error('请输入正确的11位手机号码'))
  } else {
      callback()
  }
}
// 校验手机号码
export const validPhone2 = (rule, value, callback) => {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  if (!value) {
      callback()
  } else if (!reg.test(value)) {
      callback(new Error('请输入正确的11位手机号码'))
  } else {
      callback()
  }
}
// 校验IP地址
export const validIp = (rule, value, callback) => {
    const reg = /(?=(\b|\D))(((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))(?=(\b|\D))/
    if (!value) {
        callback(new Error('请输入ip地址'))
    } else if (!reg.test(value)) {
        callback(new Error('请输入正确的ip地址'))
    } else {
        callback()
    }
  }
// 校验数字
export const validNum = (rule, value, callback) => {
    const reg = /^\d+$/
    if (!value) {
        callback(new Error('请输入数字'))
    } else if (!reg.test(value)) {
        callback(new Error('请输入数字'))
    } else if (value == 0) {
        callback(new Error('次数不能为0'))
    } else if (value > 100) {
        callback(new Error('次数不能超过100'))
    } else {
        callback()
    }
}
// 校验邮箱
export const validEmail = (rule, value, callback) => {
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  if (!value) {
    callback()
  } else if (!reg.test(value)) {
    callback(new Error('请输入正确的电子邮箱'))
  } else {
    callback()
  }
}
// 校验身份证
export const validIdCard = (rule, value, callback) => {
  if (!value) {
    callback()
  } else if (!isIdCard(value)) {
    callback(new Error('请输入正确的身份证号'))
  } else {
    callback()
  }
}

/* eslint-disable */
// 判断身份证
function isIdCard (number) {
  var date, Ai;
  var verify = "10x98765432";
  var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  var area = ['','','','','','','','','','','','北京','天津','河北','山西','内蒙古','','','','','','辽宁','吉林','黑龙江','','','','','','','','上海','江苏','浙江','安微','福建','江西','山东','','','','河南','湖北','湖南','广东','广西','海南','','','','重庆','四川','贵州','云南','西藏','','','','','','','陕西','甘肃','青海','宁夏','新疆','','','','','','台湾','','','','','','','','','','香港','澳门','','','','','','','','','国外'];
  var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/i);
  if(re == null) return false;
  if(re[1] >= area.length || area[re[1]] == "") return false;
  if(re[2].length == 12){
      Ai = number.substr(0, 17);
      date = [re[9], re[10], re[11]].join("-");
  }
  else{
      Ai = number.substr(0, 6) + "19" + number.substr(6);
      date = ["19" + re[4], re[5], re[6]].join("-");
  }
  if(!isDate(date, "ymd")) return false;
  var sum = 0;
  for(var i = 0;i<=16;i++){
      sum += Ai.charAt(i) * Wi[i];
  }
  Ai +=  verify.charAt(sum%11);
  return (number.length ==15 || number.length == 18 && number == Ai);
}
function isDate(op, formatString){
  formatString = formatString || "ymd";
  var m, year, month, day;
  switch(formatString){
      case "ymd" :
          m = op.match(new RegExp("^((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2})$"));
          if(m == null ) return false;
          day = m[6];
          month = m[5]*1;
          year =  (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10));
          break;
      case "dmy" :
          m = op.match(new RegExp("^(\\d{1,2})([-./])(\\d{1,2})\\2((\\d{4})|(\\d{2}))$"));
          if(m == null ) return false;
          day = m[1];
          month = m[3]*1;
          year = (m[5].length == 4) ? m[5] : GetFullYear(parseInt(m[6], 10));
          break;
      default :
          break;
  }
  if(!parseInt(month)) return false;
  month = month==0 ?12:month;
  var date = new Date(year, month-1, day);
  return (typeof(date) == "object" && year == date.getFullYear() && month == (date.getMonth()+1) && day == date.getDate());
  function GetFullYear(y){return ((y<30 ? "20" : "19") + y)|0;}
}
