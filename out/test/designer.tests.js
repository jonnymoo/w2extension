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
describe("Given a call to call a w2parser", () => {
    describe("when I call get locals with a simple script", () => {
        it("I expect the locals back", () => {
            // Assemble
            const w2 = new w2core_1.W2(".\\classes\\");
            // Act
            var result = w2.call("des\\browse\\w2parser", "getLocals", "int i = 0;");
            // Assert
            assert.equal(result.length, 1);
        });
    });
});
//# sourceMappingURL=designer.tests.js.map