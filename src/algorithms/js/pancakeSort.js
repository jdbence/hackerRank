// returns index of largest value in array from index 0 to end
function largestValueIndex(array, end){
 let largestIndex = 0;
 let largest = array[largestIndex]
	for(let i = 1; i <= end; i++){
    if(array[i] > largest){
    	largestIndex = i;
      largest = array[largestIndex];
    }
  }
  return largestIndex;
}

// return new array with reversed values from index 0 to end
function reverse(array, end){
	const b = array.slice(0);
  let i = 0;
  while(i<=end){
  	b[i] = array[end-i];
    i++;
  }
  return b;
}

// ascend order numeric array by reversing groups of index values
function orderAsc(numbers){
  let last = numbers.length-1;
  while(last > 1){
    const i = largestValueIndex(numbers, last)
    // skip reverse if already in order
    if(i != last){
    	// next highest is first || next highest is between first and last highest
    	numbers = i == 0 ? reverse(numbers, last) : reverse(reverse(numbers, i), last)
    }
    last--;
  }
  return numbers;
}

class Expect {
	static compareArrays(a, b){
  	return a.length === b.length && a.every((elm, i) => elm === b[i]);
  }
	static toBeEqual(a, b, msg){
  	Expect.compareArrays(a, b)
    	? console.log(`PASS: ${msg}`)
    	: console.warn(`FAILURE: ${msg} a:${a} b:${b}`);
  }
}
Expect.toBeEqual(orderAsc([ 99,98,84,67,28]), [28,67,84,98,99], 'Should be 28,67,84,98,99')
Expect.toBeEqual(orderAsc([2, 5, 3, 4, 1]), [1,2,3,4,5], 'Should be 1,2,3,4,5')