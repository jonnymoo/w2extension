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
    describe("When I get a w2 method", () => {
        it("I expect the label to include a single the param", () => {
            // Assemble
            const xml = `<method name="setTo" return="cpicks">
        <param name="code" type="string" />
        </method>`;
            const doc = new w2file_1.W2File(xml);
            // Act
            const nodes = doc.getChildren();
            const w2item = doc.getW2Item(nodes[0]);
            // Assert
            assert.equal(w2item.label, "method setTo(code: string): cpicks");
        });
        it("I expect the label to include multiple params", () => {
            // Assemble
            const xml = `<method name="setTo" return="cpicks">
        <param name="code" type="string" />
        <param name="desc" type="string" />
        <![CDATA[//@cmember setTo
        this.code = code;
        return this;]]>
        </method>`;
            const doc = new w2file_1.W2File(xml);
            // Act
            const nodes = doc.getChildren();
            const w2item = doc.getW2Item(nodes[0]);
            // Assert
            assert.equal(w2item.label, "method setTo(code: string, desc: string): cpicks");
        });
    });
});
//# sourceMappingURL=w2file.test.js.map