"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const w2core_1 = require("w2core");
describe("Given a call to call a w2 class", () => {
    describe("when I call a simple method", () => {
        it("I expect something back", () => {
            // Assemble
            const w2 = new w2core_1.W2(".\\classes\\");
            // Act
            var result = w2.call("test\\example", "run", "");
            // Assert
            assert.equal(result[0].code, "test");
        });
    });
});
//# sourceMappingURL=designer.tests.js.map