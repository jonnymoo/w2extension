import * as assert from "assert";
import { W2 } from "w2core";

describe("Given a call to call a w2 class", () => {
  describe("when I call a simple method", () => {
    it("I expect something back", () => {
      // Assemble
      const w2: W2 = new W2(".\\classes\\");

      // Act
      var result = w2.call("test\\example", "run", "");

      // Assert
      assert.equal(result[0].code, "test");
    });
  });
});
