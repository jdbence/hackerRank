function swap(numbers, a, b){
  var temp = numbers[a];
  numbers[a] = numbers[b];
  numbers[b] = temp;
}

const asc = (a, b) => a > b;
const desc = (a, b) => a < b;

function bubbleSort(numbers, compare = asc){
	for(var i = 0; i<numbers.length; i++){
  	for(var j = 0; j<numbers.length; j++){
      if(compare(numbers[j], numbers[j+1])){
        swap(numbers, j, j+1);
      }
    }
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

Expect.toBeEqual(bubbleSort([5, 4, 3, 2, 1]), [1, 2, 3, 4, 5], 'Should Be Asc 1');
Expect.toBeEqual(bubbleSort([4, 3, 1, 5, 2]), [1, 2, 3, 4, 5], 'Should Be Asc 2');
Expect.toBeEqual([1, 2, 3, 4, 5], [1, 2, 3, 4, 5], 'Should Be Asc 3');
Expect.toBeEqual(bubbleSort([1, 2, 3, 4, 5], desc), [5, 4, 3, 2, 1], 'Should Be Asc 3');
Expect.toBeEqual(bubbleSort([4, 3, 1, 5, 2], desc), [5, 4, 3, 2, 1], 'Should Be Asc 3');