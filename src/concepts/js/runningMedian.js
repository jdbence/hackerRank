/*
 Uses min/max variables to speed up insert
 Can be refactored using a heap speed
*/
function median(list){
  var n = list.length;
  if(n === 0){
  	return 0;
  }
  // even
  else if(n % 2 === 0){
	var median = n / 2;
    return (Math.round(((list[median] + list[median - 1]) / 2) * 10) / 10).toFixed(1);
  }
  // odd
  else{
    return list[Math.floor(n / 2)].toFixed(1);
  }
}

function main() {
  var n = parseInt(readLine());
  var a = [];
  var max = 0;
  var min = 0;
  var num;
  for(var a_i = 0; a_i < n; a_i++){
    num = parseInt(readLine());
    if(a_i == 0){
      min = max = num;
    }
    if(num <= min){
      a.unshift(num);
      min = num;
    }else if(num >= max){
      a.push(num);
      max = num;
    }else{
      for(var i = 0; i < a.length; i++){
        if(num > a[i] && num <= a[i+1]){
          a.splice(i+1, 0, num);
          break;
        }
      }
    }
    console.log(median(a));
  }
}