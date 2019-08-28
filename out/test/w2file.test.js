"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const w2file_1 = require("../tree-view/w2file");
describe("Given a w2 file", () => {
    describe("When I get the node at position 0 0", () => {
        it("I expect the first w2 item", () => {
            // Assemble
            const xml = `<class name="MyClass"></class>`;
            const doc = new w2file_1.W2File(xml);
            // Act
            const node = doc.getNodeAtPosition(0, 0);
            const w2item = doc.getW2Item(node);
            // Assert
            assert.equal(w2item.label, "class MyClass");
        });
    });
});
//# sourceMappingURL=w2file.test.js.map