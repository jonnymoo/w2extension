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
    describe("When I get node at postion 0 ", () => {
        it("I expect it to return the class node", () => {
            // Assemble
            const xml = `<class>
  <members>
    <method name="setTo" return="cpicks">
    <param name="code" type="string" />
    <param name="desc" type="string" />
    <![CDATA[//@cmember setTo
    this.code = code;
    return this;]]>
    </method>
  </members>
</class>`;
            const doc = new w2file_1.W2File(xml);
            // Act
            const node = doc.getNodeAtPosition(0, 0);
            // Assert
            assert.equal(node.nodeName, "class");
        });
    });
    describe("When I get node at postion 1,2 ", () => {
        it("I expect it to return the members node", () => {
            // Assemble
            const xml = `<class>
  <members>
    <method name="setTo" return="cpicks">
    <param name="code" type="string" />
    <param name="desc" type="string" />
    <![CDATA[//@cmember setTo
    this.code = code;
    return this;]]>
    </method>
  </members>
</class>`;
            const doc = new w2file_1.W2File(xml);
            // Act
            const node = doc.getNodeAtPosition(1, 2);
            // Assert
            assert.equal(node.nodeName, "members");
        });
    });
    describe("When I get node at postion 5,4 ", () => {
        it("I expect it to return the CDATA node", () => {
            // Assemble
            const xml = `<class>
  <members>
    <method name="setTo" return="cpicks">
    <param name="code" type="string" />
    <param name="desc" type="string" />
    <![CDATA[//@cmember setTo
    this.code = code;
    return this;]]>
    </method>
  </members>
</class>`;
            const doc = new w2file_1.W2File(xml);
            // Act
            const node = doc.getNodeAtPosition(5, 4);
            // Assert
            assert.equal(node.nodeName, "#cdata-section");
        });
    });
    describe("When I get completion items at postion 6,4 ", () => {
        it("I expect one item", () => {
            // Assemble
            const xml = `<class>
<members>
<method name="setTo" return="cpicks">
<![CDATA[int i=0;]]>
</method>
</members>
</class>`;
            const doc = new w2file_1.W2File(xml);
            // Act
            const items = doc.completionItems(3, 10);
            // Assert
            assert.equal(items.length, 1);
        });
    });
});
//# sourceMappingURL=w2file.test.js.map