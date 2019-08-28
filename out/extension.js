"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const constants = require("./constants");
const tree_view_1 = require("./tree-view");
// Extension active function
function activate(context) {
    // Create the "W2 Document" tree view in the side panel
    const treeViewDataProvider = new tree_view_1.W2TreeDataProvider(context);
    const treeView = vscode_1.window.createTreeView(constants.views.w2TreeView, {
        treeDataProvider: treeViewDataProvider
    });
    // Hook up the selection changed - this is so we can place ourselves in the correct place in the w2 file
    vscode_1.window.onDidChangeTextEditorSelection(x => {
        if (x.kind === vscode_1.TextEditorSelectionChangeKind.Mouse &&
            x.selections.length > 0) {
            treeView.reveal(treeViewDataProvider.getNodeAtPosition(x.selections[0].start));
        }
    });
    // Add subscription
    context.subscriptions.push(treeView);
}
exports.activate = activate;
// Deactive extension
function deactivate() {
    // do nothing
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map