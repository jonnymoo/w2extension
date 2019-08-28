"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// An object which represents a w2 file item (e.g. class, method etc)
class W2Item {
    // Creates a new instance of w2 document
    constructor(label, type) {
        this._label = label;
        this._type = type;
    }
    get label() {
        return this._label;
    }
    get type() {
        return this._type;
    }
}
exports.W2Item = W2Item;
//# sourceMappingURL=w2item.js.map