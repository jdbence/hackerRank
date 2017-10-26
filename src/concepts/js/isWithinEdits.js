function isWithinEdits(a, b, edits=1) {
	if(b.length > a.length){
		let temp = a;
    a = b;
    b = temp;
  }
  if(a.length - b.length > edits){
  	return false;
  }
  let editCount = 0;
  let i = 0;
  while(i < b.length){
  	if(a.charAt(i + editCount) == b.charAt(i)){
    	i += 1;
    }else{
    	editCount++;
      if(editCount > edits){
        return false;
      }else if(editCount >= b.length && editCount >= a.length){
        return true;
      }
    }
  }
	return true;
}


console.log(isWithinEdits("12345", "1235"));
console.log(isWithinEdits("12345", "123456"));
console.log(isWithinEdits("123", "1234"));
console.log(isWithinEdits("1234", "123"));
console.log(isWithinEdits("1234", "123456") === false);
console.log(isWithinEdits("123456", "1234") === false);
console.log(isWithinEdits("1234", "123456", 2));
console.log(isWithinEdits("123456", "1234", 2));
console.log(isWithinEdits("ABCD", "EFG", 4));
console.log(isWithinEdits("ABCD", "EFG", 3) === false);
console.log(isWithinEdits("1", "1", 0));
console.log(isWithinEdits("", "1"));
console.log(isWithinEdits("", ""));
