const readLine = (function(){
	let count = -1;
	let data = [
  	'2017-03-04T10:00 Operation ABC Start',
    '2017-03-04T10:01 Operation ABC End',
    '2017-03-04T10:02 Operation DEF Start',
    '2017-03-04T10:08 Operation XYZ Start',
    '2017-03-04T20:09 Operation 123 Start',
    '2017-03-04T20:10 Operation XYZ End',
    '2017-03-04T20:02 Operation 123 End'
  ];
  return function(logs) {
  	if(logs){
      data = logs;
      count = 0;
    } else {
    	count++;
    }
  	return data[count];
  };
})();

//ASSUMPTION: processes with the same name can't be started at the same time
//ASSUMPTION: processes that are not ended are not counted in the average
function averageRunTime(logs){
  var hash = {};
  var totalTime = 0;
  var pairs = 0;
  var parts, time, operation, action;
  var str = readLine(logs);
  while(str){
    parts = str.split(' ');
    time = new Date(parts[0]).getTime();
    operation = parts[2];
    action = parts[3];
    hash[operation] = hash[operation] || {};
    hash[operation][action] = time;
    // only add when both start and end occur
    if(hash[operation].End && hash[operation].Start){
      totalTime += hash[operation].End - hash[operation].Start;
      // save space and incase operation occurs again in log
      delete hash[operation];
      pairs++;
    }
    str = readLine();
  }
  return totalTime / pairs;
}

class Expect {
	static compareArrays(a, b){
  	return a.length === b.length && a.every((elm, i) => elm === b[i]);
  }
	static toBeEqual(a, b, msg){
  	Array.isArray(a) ? Expect.compareArrays(a, b) : a == b
    	? console.log(`PASS: ${msg}`)
    	: console.warn(`FAILURE: ${msg} a:${a} b:${b}`);
  }
}

Expect.toBeEqual(averageRunTime(), 11920000, 'Should default to 11920000');
Expect.toBeEqual(averageRunTime([
	'2017-03-04T10:00 Operation ABC Start',
  '2017-03-04T10:10 Operation ABC End',
]), 600000, 'Should be 600000');
Expect.toBeEqual(averageRunTime([
	'2017-03-04T10:00 Operation ABC Start',
  '2017-03-04T10:10 Operation 123 Start',
  '2017-03-04T10:10 Operation ABC End',
]), 600000, 'Should not avg End');
Expect.toBeEqual(averageRunTime([
	'2017-03-04T10:00 Operation ABC Start',
  '2017-03-04T10:10 Operation 123 End',
  '2017-04-04T10:10 Operation ABC End',
]), 2675400000, 'Should not avg End');
Expect.toBeEqual(averageRunTime([
	'2017-03-04T10:00 Operation ABC Start',
  '2017-03-04T10:10 Operation ABC End',
  '2017-03-04T10:20 Operation ABC Start',
  '2017-03-04T10:40 Operation ABC End',
]), 900000, 'Should count same operation as 2');
