"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const w2file_1 = require("../tree-view/w2file");
describe("Given a w2 file", () => {
    describe("When I get a class w2 item", () => {
        it("I expect the label to include the name", () => {
            // Assemble
            const xml = `<class name="MyClass"></class>`;
            const doc = new w2file_1.W2File(xml);
            // Act
            const nodes = doc.getChildren();
            const w2item = doc.getW2Item(nodes[0]);
            // Assert
            assert.equal(w2item.label, "class MyClass");
        });
    });
    describe("When I get a w2 item without a name", () => {
        it("I expect the label to be just the tag name", () => {
            // Assemble
            const xml = `<return></return>`;
            const doc = new w2file_1.W2File(xml);
            // Act
            const nodes = doc.getChildren();
            const w2item = doc.getW2Item(nodes[0]);
            // Assert
            assert.equal(w2item.label, "return");
        });
    });
});
//# sourceMappingURL=w2file.test.js.map