function isRotation(a, b) {
	let total = a.length;
	// not a rotation if different lengths
	if(total != b.length){
  	return false;
  }
  let start = a[0];
  let startIndex = -1;
  for(let i = 0; i < total; i++){
  	if(b[i] == start){
    	startIndex = i;
      break;
    }
  }
  // b is missing a's first item
  if(startIndex === -1){
  	return false;
  }
  
  for(let i = 0; i < total; i++){
  	// use % to wrap counter between 0 and total
  	if(a[i] != b[(startIndex + i) % total]){
    	return false;
    }
  }
  return true;
}