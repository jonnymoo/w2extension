"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const native_commands_1 = require("./native-commands");
const vscode_1 = require("vscode");
const path = require("path");
const constants = require("../constants");
const w2file_1 = require("./w2file");
class W2TreeDataProvider {
    constructor(_context) {
        this._context = _context;
        this._onDidChangeTreeData = new vscode_1.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        vscode_1.window.onDidChangeActiveTextEditor(() => {
            this._refreshTree();
        });
        vscode_1.workspace.onDidChangeTextDocument(() => {
            this._refreshTree();
        });
        this._refreshTree();
    }
    get activeEditor() {
        return vscode_1.window.activeTextEditor || null;
    }
    getTreeItem(element) {
        const treeItem = new vscode_1.TreeItem(element.localName);
        const w2Item = this._file.getW2Item(element);
        treeItem.label = w2Item.label;
        treeItem.collapsibleState = vscode_1.TreeItemCollapsibleState.Collapsed;
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
        treeItem.iconPath = {
            dark: this._context.asAbsolutePath(path.join("resources", "icons", `${w2Item.type}.dark.svg`)),
            light: this._context.asAbsolutePath(path.join("resources", "icons", `${w2Item.type}.light.svg`))
        };
        return treeItem;
    }
    getChildren(element) {
        if (!this._file) {
            this._refreshTree();
        }
        return this._file.getChildren(element);
    }
    getParent(element) {
        if ((!element || !element.parentNode || !element.parentNode.parentNode) &&
            !element.ownerElement) {
            return undefined;
        }
        return element.parentNode || element.ownerElement;
    }
    getNodeAtPosition(position) {
        return this._file.getElementAtPosition(position.line, position.character);
    }
    _refreshTree() {
        if (!this.activeEditor ||
            this.activeEditor.document.languageId !== constants.languageIds.w2) {
            native_commands_1.NativeCommands.setContext(constants.contextKeys.w2TreeViewEnabled, false);
            this._file = null;
            this._onDidChangeTreeData.fire();
            return;
        }
        native_commands_1.NativeCommands.setContext(constants.contextKeys.w2TreeViewEnabled, true);
        const xml = this.activeEditor.document.getText();
        // Create the w2 file representation
        this._file = new w2file_1.W2File(xml);
        this._onDidChangeTreeData.fire();
    }
}
exports.W2TreeDataProvider = W2TreeDataProvider;
//# sourceMappingURL=w2-tree-data-provider.js.map