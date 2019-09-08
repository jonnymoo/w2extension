"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xmldom_1 = require("xmldom");
const w2item_1 = require("./w2item");
const vscode_languageserver_types_1 = require("vscode-languageserver-types");
const w2core_1 = require("w2core");
// helper class to map nodes to positions in the file
class NodeToPosition {
    constructor(node, lineNumber, columnNumber) {
        this.node = node;
        this.lineNumber = lineNumber;
        this.columnNumber = columnNumber;
    }
}
// An object which represents a w2 document
class W2File {
    // Creates a new instance of w2 document
    constructor(contents) {
        // Maps nodes to positions in the file
        this._nodemap = [];
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
        // Create a node to position mapping
        this._domapping(this._xmlDocument.documentElement);
    }
    _domapping(node) {
        this._nodemap.push(
        // Line number / column numbers start at 1,1
        // Translate to 0 0
        new NodeToPosition(node, node.lineNumber - 1, node.columnNumber - 1));
        if (node.childNodes) {
            for (let i = 0; i < node.childNodes.length; i++) {
                this._domapping(node.childNodes[i]);
            }
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
        for (let i = 1; i < this._nodemap.length; i++) {
            // Are we past this node
            if (linePosition < this._nodemap[i].lineNumber ||
                (linePosition === this._nodemap[i].lineNumber &&
                    characterPosition < this._nodemap[i].columnNumber)) {
                return this._nodemap[i - 1].node;
            }
        }
        return null;
    }
    // Get a list of completion items at a give poition in the file
    completionItems(linePosition, characterPosition) {
        // Work out what node we are on - this gives context
        // Offer appropriate completion items
        let items = [];
        const node = this.getNodeAtPosition(linePosition, characterPosition);
        if (node) {
            // If we are a cdata section - w2 code
            if (node.nodeName === "#cdata-section") {
                // Call through to the w2 parser to get a list of suggestions
                const w2 = new w2core_1.W2(".\\classes\\");
                var result = w2.call("des\\browse\\w2parser", "getLocals", node.textContent);
                for (let i = 0; i < result.length; i++) {
                    items.push({
                        label: result[i].name,
                        kind: vscode_languageserver_types_1.CompletionItemKind.Variable,
                        detail: result[i].type,
                        documentation: ""
                    });
                }
            }
        }
        return items;
        /*
        items.push({
          label: "itemText",
          kind: CompletionItemKind.Text,
          detail: "something or other",
          documentation: "some more stuff"
        });
    
        items.push({
          label: "itemMethod",
          kind: CompletionItemKind.Method,
          detail: "something or other",
          documentation: "some more stuff"
        });
        items.push({
          label: "itemFunction",
          kind: CompletionItemKind.Function,
          detail: "something or other",
          documentation: "some more stuff"
        });
        items.push({
          label: "itemConstructor",
          kind: CompletionItemKind.Constructor,
          detail: "something or other",
          documentation: "some more stuff"
        });
        items.push({
          label: "itemField",
          kind: CompletionItemKind.Field,
          detail: "something or other",
          documentation: "some more stuff"
        });
        items.push({
          label: "itemVariable",
          kind: CompletionItemKind.Variable,
          detail: "something or other",
          documentation: "some more stuff"
        });
        items.push({
          label: "itemClass",
          kind: CompletionItemKind.Class,
          detail: "something or other",
          documentation: "some more stuff"
        });
        items.push({
          label: "itemInterface",
          kind: CompletionItemKind.Interface,
          detail: "something or other",
          documentation: "some more stuff"
        });
        items.push({
          label: "itemModule",
          kind: CompletionItemKind.Module,
          detail: "something or other",
          documentation: "some more stuff"
        });
        items.push({
          label: "itemProperty",
          kind: CompletionItemKind.Property,
          detail: "something or other",
          documentation: "some more stuff"
        });
    
        items.push({
          label: "itemUnit",
          kind: CompletionItemKind.Unit,
          detail: "something or other",
          documentation: "some more stuff"
        });
        items.push({
          label: "itemValue",
          kind: CompletionItemKind.Value,
          detail: "something or other",
          documentation: "some more stuff"
        });
        items.push({
          label: "itemEnum",
          kind: CompletionItemKind.Enum,
          detail: "something or other",
          documentation: "some more stuff"
        });
        items.push({
          label: "itemKeyword",
          kind: CompletionItemKind.Keyword,
          detail: "something or other",
          documentation: "some more stuff"
        });
        items.push({
          label: "itemSnippet",
          kind: CompletionItemKind.Snippet,
          detail: "something or other",
          documentation: "some more stuff"
        });
    
        items.push({
          label: "itemColor",
          kind: CompletionItemKind.Color,
          detail: "something or other",
          documentation: "some more stuff"
        });
        items.push({
          label: "itemFile",
          kind: CompletionItemKind.File,
          detail: "something or other",
          documentation: "some more stuff"
        });
        items.push({
          label: "itemReference",
          kind: CompletionItemKind.Reference,
          detail: "something or other",
          documentation: "some more stuff"
        });
        items.push({
          label: "itemFolder",
          kind: CompletionItemKind.Folder,
          detail: "something or other",
          documentation: "some more stuff"
        });
        items.push({
          label: "itemEnumMember",
          kind: CompletionItemKind.EnumMember,
          detail: "something or other",
          documentation: "some more stuff"
        });
        items.push({
          label: "itemConstant",
          kind: CompletionItemKind.Constant,
          detail: "something or other",
          documentation: "some more stuff"
        });
        items.push({
          label: "itemStruct",
          kind: CompletionItemKind.Struct,
          detail: "something or other",
          documentation: "some more stuff"
        });
        items.push({
          label: "itemEvent",
          kind: CompletionItemKind.Event,
          detail: "something or other",
          documentation: "some more stuff"
        });
        items.push({
          label: "itemOperator",
          kind: CompletionItemKind.Operator,
          detail: "something or other",
          documentation: "some more stuff"
        });
        items.push({
          label: "itemTypeParameter",
          kind: CompletionItemKind.TypeParameter,
          detail: "something or other",
          documentation: "some more stuff"
        });
    
        return items;
        */
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
}
exports.W2File = W2File;
//# sourceMappingURL=w2file.js.map