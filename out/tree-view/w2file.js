"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xmldom_1 = require("xmldom");
const w2item_1 = require("./w2item");
// An object which represents a w2 document
class W2File {
    // Creates a new instance of w2 document
    constructor(contents) {
        try {
            this._xmlDocument = new xmldom_1.DOMParser({
                errorHandler: () => {
                    throw new Error("Invalid Document");
                },
                locator: {}
            }).parseFromString(contents, "text/xml");
        }
        catch (_a) {
            this._xmlDocument = new xmldom_1.DOMParser().parseFromString("<InvalidDocument />", "text/xml");
        }
    }
    // This is where we build up the TreeItem required for the w2 document view
    getW2Item(element) {
        let label = "";
        let type = "";
        // Include the name if exists
        label = element.tagName;
        if (element.attributes.getNamedItem("name")) {
            label = label + " " + element.attributes.getNamedItem("name").value;
        }
        // Work out what type of icon to show
        type = "element";
        return new w2item_1.W2Item(label, type);
    }
    getChildren(element) {
        if (element) {
            return this._getChildElementArray(element);
        }
        else {
            return [this._xmlDocument.lastChild];
        }
    }
    getNodeAtPosition(linePosition, characterPosition) {
        return this._getNodeAtPositionCore(linePosition, characterPosition, this._xmlDocument.documentElement);
    }
    _getNodeAtPositionCore(linePosition, characterPosition, contextNode) {
        if (!contextNode) {
            return undefined;
        }
        const lineNumber = contextNode.lineNumber;
        const columnNumber = contextNode.columnNumber;
        const columnRange = [
            columnNumber,
            columnNumber + (this._getNodeWidthInCharacters(contextNode) - 1)
        ];
        if (this._checkRange(lineNumber, linePosition, characterPosition, columnRange)) {
            return contextNode;
        }
        // if the element contains text, check to see if the cursor is present in the text
        const textContent = contextNode.textContent;
        if (textContent) {
            columnRange[1] = columnRange[1] + textContent.length;
            if (this._checkRange(lineNumber, linePosition, characterPosition, columnRange)) {
                return contextNode;
            }
        }
        const children = this._getChildElementArray(contextNode);
        let result;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            result = this._getNodeAtPositionCore(linePosition, characterPosition, child);
            if (result) {
                return result;
            }
        }
        return undefined;
    }
    _checkRange(lineNumber, linePosition, characterPosition, columnRange) {
        return (lineNumber === linePosition + 1 &&
            (characterPosition + 1 >= columnRange[0] &&
                characterPosition + 1 < columnRange[1]));
    }
    // True if node is an element
    _isElement(node) {
        return !!node && !!node.tagName;
    }
    _getChildElementArray(node) {
        if (!node.childNodes) {
            return [];
        }
        const array = new Array();
        for (let i = 0; i < node.childNodes.length; i++) {
            const child = node.childNodes[i];
            if (this._isElement(child)) {
                array.push(child);
            }
        }
        return array;
    }
    _getNodeWidthInCharacters(node) {
        if (this._isElement(node)) {
            return node.nodeName.length + 2;
        }
        else {
            return node.nodeName.length + node.nodeValue.length + 3;
        }
    }
}
exports.W2File = W2File;
//# sourceMappingURL=w2file.js.map