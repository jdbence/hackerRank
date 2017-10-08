const reverseList = node => {
  let prev = null;
  let current = node;
  let next = null;
  while (current != null) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
	node = prev;
	return node;
};