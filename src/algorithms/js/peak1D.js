var findPeak = function(list, start, end){
  start = start || 0;
  end = end || list.length;
  var mid = Math.floor((start + end) / 2);
  if(list[mid-1] > list[mid]){
  	return findPeak(list, 0, mid);
  } else if(list[mid] < list[mid+1]){
  	return findPeak(list, mid, list.length);
  }
  return list[mid];
};


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

Expect.toBeEqual(findPeak([1,2,3,4,5,6,7,8,9]), 9, 'Should be 9');
Expect.toBeEqual(findPeak([91,82,73,64,55,46,37,28,19]), 91, 'Should be 91');
Expect.toBeEqual(findPeak([82,82,73,64,55,46,97,28,19]), 82, 'Should be 82');
