import * as assert from "assert";
import { W2File } from "../tree-view/w2file";

describe("Given a w2 file", () => {
  describe("When I get a class w2 item", () => {
    it("I expect the label to include the name", () => {
      // Assemble

      const xml = `<class name="MyClass"></class>`;
      const doc = new W2File(xml);

      // Act
      const nodes = doc.getChildren();
      const w2item = doc.getW2Item(nodes[0] as Element);

      // Assert
      assert.equal(w2item.label, "class MyClass");
    });
  });

  describe("When I get a w2 item without a name", () => {
    it("I expect the label to be just the tag name", () => {
      // Assemble

      const xml = `<return></return>`;
      const doc = new W2File(xml);

      // Act
      const nodes = doc.getChildren();
      const w2item = doc.getW2Item(nodes[0] as Element);

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
      const doc = new W2File(xml);

      // Act
      const nodes = doc.getChildren();
      const w2item = doc.getW2Item(nodes[0] as Element);

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
      const doc = new W2File(xml);

      // Act
      const nodes = doc.getChildren();
      const w2item = doc.getW2Item(nodes[0] as Element);

      // Assert
      assert.equal(
        w2item.label,
        "method setTo(code: string, desc: string): cpicks"
      );
    });
  });
});
