// Small Test Class
class Expect {
  static start(msg){
  	console.log(`%c${msg}`, 'color:blue;');
  }
	static toBeEqual(actual, expected, msg){
  	expected == actual
    	? console.log('%cPASS:', 'color:green;', msg)
    	: console.warn('%cFAILURE:', 'color:red;', `${msg} Expected:${expected} Actual:${actual}`);
  }
}

// Mock DOM node
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

// Convert red portion of hex
function redColor(hex){
	return parseInt(hex.substring(1, 3), 16);
}

function compareRed(nodeA, nodeB) {
	const colorA = redColor(nodeA.getStyle("background-color"));
  const colorB = redColor(nodeB.getStyle("background-color"));
  return colorA > colorB ? 1 : colorB > colorA ? -1 : 0;
}

function sumUnsorted(a, b) {
  return compareRed(a, b) === -1;
}

// Use recursion to find unsorted nodes
function unsortedTreeCount(node){
  let count = 0;
  let children = node ? node.children() : [];
  if(children.length > 0){
  	let childA = children[0];
    let flagCounted = false;
    for(let i = 1; i < children.length; i++){
    	let childB = children[i];
      if(!flagCounted && sumUnsorted(childA, childB)){
      	count += 1;
        flagCounted = true;
      }
      count += unsortedTreeCount(childA);
      childA = childB;
    }
    //BUGFIX last child's children was not taken into account
    count += unsortedTreeCount(childA);
  }
  return count;
}

// Use stack to find unsorted nodes
function unsortedTreeStackCount(tree){
  let count = 0;
  let stack = tree ? [tree] : [];
  while(stack.length > 0){
  	let node = stack.pop();
    let children = node.children();
    if(children.length > 0){
    	let childA = children[0];
    	let flagCounted = false;
    	for(let i = 1; i < children.length; i++){
      	let childB = children[i];
      	if(!flagCounted && sumUnsorted(childA, childB)){
        	count += 1;
        	flagCounted = true;
        }
      	stack.push(childA);
        childA = childB;
      }
      stack.push(childA);
    }
  }
  return count;
}

// Mock data
const tree = new Node();
const treeB = new Node([
	new Node(),
  new Node()
]);
const treeC = new Node([
  new Node([], '#EE'),
  new Node()
]);
const treeD = new Node([
  new Node([], '#EE'),
  new Node([], '#BB'),
  new Node()
]);
const treeE = new Node([
  new Node([treeC, treeD]),
  new Node(),
  new Node()
]);
const treeF = new Node([
  new Node([new Node([new Node([new Node([new Node([treeC])])])])]),
]);

console.log('++++++++++++++++++++++++++++++');
Expect.start('Colors -----------------------');
Expect.toBeEqual(redColor('#00'), 0, '#00 is 0');
Expect.toBeEqual(redColor('#EE'), 238, '#EE is 238');
Expect.toBeEqual(redColor('#FF'), 255, '#FF is 255');

Expect.start('TreeRecursive ----------------');
Expect.toBeEqual(unsortedTreeCount(), 0, 'Nothing is 0');
Expect.toBeEqual(unsortedTreeCount(tree), 0, 'No children is 0');
Expect.toBeEqual(unsortedTreeCount(treeB), 0, 'Same color is 0');
Expect.toBeEqual(unsortedTreeCount(treeC), 1, 'Single out of order is 1');
Expect.toBeEqual(unsortedTreeCount(treeD), 1, 'Multiple out of order is 1');
Expect.toBeEqual(unsortedTreeCount(treeE), 2, '2 children with out of order children is 2');
Expect.toBeEqual(unsortedTreeCount(treeF), 1, '1 deeply nested child out of order is 1');

Expect.start('TreeStack --------------------');
Expect.toBeEqual(unsortedTreeStackCount(), 0, 'Nothing is 0');
Expect.toBeEqual(unsortedTreeStackCount(tree), 0, 'No children is 0');
Expect.toBeEqual(unsortedTreeStackCount(treeB), 0, 'Same color is 0');
Expect.toBeEqual(unsortedTreeStackCount(treeC), 1, 'Single out of order is 1');
Expect.toBeEqual(unsortedTreeStackCount(treeD), 1, 'Multiple out of order is 1');
Expect.toBeEqual(unsortedTreeStackCount(treeE), 2, '2 children with out of order children is 2');
Expect.toBeEqual(unsortedTreeStackCount(treeF), 1, '1 deeply nested child out of order is 1');