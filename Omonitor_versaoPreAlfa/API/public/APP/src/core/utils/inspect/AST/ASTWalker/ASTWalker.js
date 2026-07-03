export default class ASTWalker {

    constructor(root) {
        this.root = root;
    }

    walk(callback) {}

    traverse(node, callback, parent = null, depth = 0) {}

    find(predicate) {}

    findFirst(predicate) {}

    findAll(predicate) {}

    map(callback) {}

    filter(predicate) {}

    reduce(callback, initialValue) {}

    some(predicate) {}

    every(predicate) {}

    visit(visitors) {}

}