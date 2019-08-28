"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common");
const vscode_1 = require("vscode");
const constants = require("../constants");
const xmldom_1 = require("xmldom");
// An object which represents a w2 document
class W2File {
    // Creates a new instance of w2 document
    constructor(contents, getIcon) {
        this._getIcon = getIcon;
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
        finally {
            this._xmlTraverser =
                this._xmlTraverser || new common_1.XmlTraverser(this._xmlDocument);
            this._xmlTraverser.xmlDocument = this._xmlDocument;
        }
    }
    // This is where we build up the TreeItem required for the w2 document view
    getTreeItem(element) {
        const treeItem = new vscode_1.TreeItem(element.localName);
        // If we are an attribute - name + value for now
        if (!this._xmlTraverser.isElement(element)) {
            treeItem.label = `${element.localName} = "${element.nodeValue}"`;
        }
        else {
            // We are an element - what type?
            const childAttributes = this._xmlTraverser.getChildAttributeArray(element);
            const childElements = this._xmlTraverser.getChildElementArray((element));
            const totalChildren = childAttributes.length + childElements.length;
            if (totalChildren > 0) {
                treeItem.label += "  (";
                if (childAttributes.length > 0) {
                    treeItem.label += `attributes: ${childAttributes.length}, `;
                    treeItem.collapsibleState = vscode_1.TreeItemCollapsibleState.Collapsed;
                }
                if (childElements.length > 0) {
                    treeItem.label += `children: ${childElements.length}, `;
                    treeItem.collapsibleState = vscode_1.TreeItemCollapsibleState.Collapsed;
                }
                treeItem.label = treeItem.label.substr(0, treeItem.label.length - 2);
                treeItem.label += ")";
            }
            if (this._xmlTraverser.hasSimilarSiblings(element)) {
                treeItem.label += ` [line ${element.lineNumber}]`;
            }
        }
        treeItem.command = {
            command: constants.nativeCommands.revealLine,
            title: "",
            arguments: [
                {
                    lineNumber: element.lineNumber - 1,
                    at: "top"
                }
            ]
        };
        // Work out what type of icon to show
        let type = "element";
        if (!this._xmlTraverser.isElement(element)) {
            type = "attribute";
        }
        treeItem.iconPath = this._getIcon(type);
        return treeItem;
    }
    getChildren(element) {
        if (this._xmlTraverser.isElement(element)) {
            return [].concat(this._xmlTraverser.getChildAttributeArray(element), this._xmlTraverser.getChildElementArray(element));
        }
        else if (this._xmlDocument) {
            return [this._xmlDocument.lastChild];
        }
        else {
            return [];
        }
    }
    getNodeAtPosition(position) {
        return this._xmlTraverser.getNodeAtPosition(position);
    }
}
exports.W2File = W2File;
//# sourceMappingURL=w2document.js.map