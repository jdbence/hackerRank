function addBomb(col, row, map){
	let maxCol = Math.min(col+1, map[0].length-1);
  let minCol = Math.max(0, col-1);
  let maxRow = Math.min(row+1, map.length-1);
  let minRow = Math.max(0, row-1);
  map[row][col] = -1;
  for(let r = minRow; r <= maxRow; r++){
  	for(let c = minCol; c <= maxCol; c++){
    	// bomb stay bombs and numbers increment
    	map[r][c] = map[r][c] === -1 ? -1 : map[r][c] + 1;
    }
  }
}

function mineSweeper(bombs, cols, rows){
	let map = new Array(rows);
  for(let r = 0; r < rows; r++){
  	map[r] = new Array(cols).fill(0);
  }
  for(let b = 0; b < bombs.length; b++){
  	addBomb(bombs[b][1], bombs[b][0], map);
  }
  return map;
}

console.log(mineSweeper([[0, 0], [0, 1]], 4, 3));