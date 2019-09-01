"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xmldom_1 = require("xmldom");
const w2item_1 = require("./w2item");
const vscode_languageserver_types_1 = require("vscode-languageserver-types");
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
        // Include any parameters (for methods)
        if (element.hasChildNodes) {
            let params = "";
            Array.from(element.childNodes).forEach(node => {
                const childElement = node;
                if (childElement.tagName === "param") {
                    if (params !== "") {
                        params = params + ", ";
                    }
                    if (childElement.attributes.getNamedItem("name")) {
                        params =
                            params + childElement.attributes.getNamedItem("name").value;
                    }
                    if (childElement.attributes.getNamedItem("type")) {
                        params =
                            params +
                                ": " +
                                childElement.attributes.getNamedItem("type").value;
                    }
                }
            });
            if (params !== "") {
                label = label + "(" + params + ")";
            }
        }
        // Include any return items
        if (element.attributes.getNamedItem("return")) {
            label = label + ": " + element.attributes.getNamedItem("return").value;
        }
        // Work out what type of icon to show
        type = "element";
        return new w2item_1.W2Item(label, type);
    }
    // Get children of a given element (or parent if no element passed in)
    getChildren(element) {
        if (element) {
            return this._getChildElementArray(element);
        }
        else {
            return [this._xmlDocument.lastChild];
        }
    }
    // Get the node at a given position in the file
    getNodeAtPosition(linePosition, characterPosition) {
        return this._getNodeAtPositionCore(linePosition, characterPosition, this._xmlDocument.documentElement);
    }
    // Get a list of completion items at a give poition in the file
    completionItems(textDocumentPosition) {
        let items = [];
        items.push({
            label: "itemText",
            kind: vscode_languageserver_types_1.CompletionItemKind.Text,
            detail: "something or other",
            documentation: "some more stuff"
        });
        items.push({
            label: "itemMethod",
            kind: vscode_languageserver_types_1.CompletionItemKind.Method,
            detail: "something or other",
            documentation: "some more stuff"
        });
        items.push({
            label: "itemFunction",
            kind: vscode_languageserver_types_1.CompletionItemKind.Function,
            detail: "something or other",
            documentation: "some more stuff"
        });
        items.push({
            label: "itemConstructor",
            kind: vscode_languageserver_types_1.CompletionItemKind.Constructor,
            detail: "something or other",
            documentation: "some more stuff"
        });
        items.push({
            label: "itemField",
            kind: vscode_languageserver_types_1.CompletionItemKind.Field,
            detail: "something or other",
            documentation: "some more stuff"
        });
        items.push({
            label: "itemVariable",
            kind: vscode_languageserver_types_1.CompletionItemKind.Variable,
            detail: "something or other",
            documentation: "some more stuff"
        });
        items.push({
            label: "itemClass",
            kind: vscode_languageserver_types_1.CompletionItemKind.Class,
            detail: "something or other",
            documentation: "some more stuff"
        });
        items.push({
            label: "itemInterface",
            kind: vscode_languageserver_types_1.CompletionItemKind.Interface,
            detail: "something or other",
            documentation: "some more stuff"
        });
        items.push({
            label: "itemModule",
            kind: vscode_languageserver_types_1.CompletionItemKind.Module,
            detail: "something or other",
            documentation: "some more stuff"
        });
        items.push({
            label: "itemProperty",
            kind: vscode_languageserver_types_1.CompletionItemKind.Property,
            detail: "something or other",
            documentation: "some more stuff"
        });
        items.push({
            label: "itemUnit",
            kind: vscode_languageserver_types_1.CompletionItemKind.Unit,
            detail: "something or other",
            documentation: "some more stuff"
        });
        items.push({
            label: "itemValue",
            kind: vscode_languageserver_types_1.CompletionItemKind.Value,
            detail: "something or other",
            documentation: "some more stuff"
        });
        items.push({
            label: "itemEnum",
            kind: vscode_languageserver_types_1.CompletionItemKind.Enum,
            detail: "something or other",
            documentation: "some more stuff"
        });
        items.push({
            label: "itemKeyword",
            kind: vscode_languageserver_types_1.CompletionItemKind.Keyword,
            detail: "something or other",
            documentation: "some more stuff"
        });
        items.push({
            label: "itemSnippet",
            kind: vscode_languageserver_types_1.CompletionItemKind.Snippet,
            detail: "something or other",
            documentation: "some more stuff"
        });
        items.push({
            label: "itemColor",
            kind: vscode_languageserver_types_1.CompletionItemKind.Color,
            detail: "something or other",
            documentation: "some more stuff"
        });
        items.push({
            label: "itemFile",
            kind: vscode_languageserver_types_1.CompletionItemKind.File,
            detail: "something or other",
            documentation: "some more stuff"
        });
        items.push({
            label: "itemReference",
            kind: vscode_languageserver_types_1.CompletionItemKind.Reference,
            detail: "something or other",
            documentation: "some more stuff"
        });
        items.push({
            label: "itemFolder",
            kind: vscode_languageserver_types_1.CompletionItemKind.Folder,
            detail: "something or other",
            documentation: "some more stuff"
        });
        items.push({
            label: "itemEnumMember",
            kind: vscode_languageserver_types_1.CompletionItemKind.EnumMember,
            detail: "something or other",
            documentation: "some more stuff"
        });
        items.push({
            label: "itemConstant",
            kind: vscode_languageserver_types_1.CompletionItemKind.Constant,
            detail: "something or other",
            documentation: "some more stuff"
        });
        items.push({
            label: "itemStruct",
            kind: vscode_languageserver_types_1.CompletionItemKind.Struct,
            detail: "something or other",
            documentation: "some more stuff"
        });
        items.push({
            label: "itemEvent",
            kind: vscode_languageserver_types_1.CompletionItemKind.Event,
            detail: "something or other",
            documentation: "some more stuff"
        });
        items.push({
            label: "itemOperator",
            kind: vscode_languageserver_types_1.CompletionItemKind.Operator,
            detail: "something or other",
            documentation: "some more stuff"
        });
        items.push({
            label: "itemTypeParameter",
            kind: vscode_languageserver_types_1.CompletionItemKind.TypeParameter,
            detail: "something or other",
            documentation: "some more stuff"
        });
        return items;
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