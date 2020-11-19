export const isAncestor = (root: Element, potentialDescendant: Node) => {
  let node: Node | null = potentialDescendant;

  while (node !== null) {
    if (node === root) {
      return true;
    }
    node = node.parentElement;
  }
  return false;
};
