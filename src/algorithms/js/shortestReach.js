class Node {
  constructor(id){
    this.id = id;
    this.edges = [];
    this.distance = -1;
    this.visited = false;
  }
  add (node) {
    this.edges.push(node);
    node.edges.push(this);
  }
}

function updateDistances(node){
  if(node){
    let queue = [node];
    let queueSize = queue.length;
    node.distance = 0;
    while(queueSize > 0){
      let n = queue.shift();
      let edges = n.edges.length;
      queueSize--;
      for(let i = 0; i < edges; i++){
        let edge = n.edges[i];
        if(!edge.visited){
          edge.visited = true;
          edge.distance = n.distance + 6;
          if(edge.edges.length > 0){
            queue.push(edge);
            queueSize++;
          }
        }
      }
    }
  }
}

function printNodes(start, tree){
  let out = '';
  for (let i = 1; i < tree.length; i++) {
    if (i != start) {
      out += `${tree[i].distance} `;
    }
  }
  console.log(out);
}

function run(input){
  input = input.match(/[^\s]+/g);
  let queries = Number(input.shift());
  
  for(let q = 0; q < queries; q++){
    let nodes = Number(input.shift());
    let edges = Number(input.shift());
    let tree = new Array(nodes);
    for (let i = 0; i <= nodes; i++) {
      tree[i] = new Node(i+1);
    }

    for (let i = 0; i < edges; i++) {
      let a = Number(input.shift());
      let b = Number(input.shift());
      tree[a].add(tree[b]);
    }

    let start = Number(input.shift());
    updateDistances(tree[start]);
    printNodes(start, tree);
  }
}