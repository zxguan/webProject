const formatTime = function (second) {
	var hourTime = 0;
  var minuteTime = 0;
  var secondTime = 0;
  if (second > 60) {  //如果秒数大于60
    minuteTime = Math.floor(second / 60);
    secondTime = Math.floor(second % 60);
    if (minuteTime >= 60) {  //如果分钟大于60
      hourTime = Math.floor(minuteTime / 60);
      minuteTime = Math.floor(minuteTime % 60);
    } else {
      hourTime = 0;
    }
  } else {
    hourTime = 0;
    minuteTime = 0;
    if (second == 60) {  //如果秒数等于60
      minuteTime = 1;
      secondTime = 0;
    } else {
      secondTime = second;
    }
  }
  var timeResult = _addZero(hourTime) + ':' +_addZero(minuteTime) + ':' + _addZero(secondTime);
  return timeResult;
}

const _addZero = (time)=>{
  let str = time;
  if (time < 10) {
    str = '0' + time;
  }
  return str;
}

module.exports = {
  formatTime
}
// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
// }

// const formatNumber = n => {
//   n = n.toString()
//   return n[1] ? n : `0${n}`
// }

// module.exports = {
//   formatTime
// }
