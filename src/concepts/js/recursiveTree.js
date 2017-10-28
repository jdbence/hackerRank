class Node {
 constructor(children=[], color='#FFFFFF'){
  this._style = {'background-color': color};
  this._children = children;
 }
 
 getStyle(prop){
 	return this._style[prop];
 }
 
 children(){
  return this._children;
 }
}

function redNess(nodeA, nodeB) {
	let colorA = parseInt(nodeA.getStyle("background-color").substring(1, 3), 16);
  let colorB = parseInt(nodeB.getStyle("background-color").substring(1, 3), 16);
  return colorA > colorB ? 1 : colorB > colorA ? -1 : 0;
}

function sumUnsorted(a, b) {
  return redNess(a, b);
}

function unsortedTreeCount(node){
  let count = 0;
  let children = node.children();
  if(children.length > 0){
  	let childA = children[0];
    let flagCounted = false;
    for(let i = 1; i < children.length; i++){
    	let childB = children[i];
      if(!flagCounted && sumUnsorted(childA, childB) !== 1){
      	count += 1;
        flagCounted = true;
      }
      if(childA.children().length > 0){
      	count += unsortedTreeCount(childA);
      }
      childA = childB;
    }
  }
  return count;
}

var tree = new Node([
	new Node([new Node(), new Node([], '#EE')]),
  new Node([new Node([new Node(), new Node([], '#EE')], '#EE'), new Node()]),
  new Node(),
  new Node()
]);
var treeB = new Node([
	new Node([new Node(), new Node([], '#EE')]),
  new Node([new Node([new Node(), new Node([])], '#EE'), new Node()]),
  new Node(),
  new Node()
]);
var treeC = new Node([
	new Node([new Node(), new Node()]),
  new Node([new Node([new Node(), new Node([])], '#EE'), new Node()]),
  new Node(),
  new Node()
]);

console.log('2 unsorted nodes:', unsortedTreeCount(tree) === 2);
console.log('3 unsorted nodes:', unsortedTreeCount(treeB) === 3);
console.log('4 unsorted nodes:', unsortedTreeCount(treeC) === 4);