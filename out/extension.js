"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const path = require("path");
const constants = require("./constants");
const tree_view_1 = require("./tree-view");
const vscode_languageclient_1 = require("vscode-languageclient");
// Language server client proxy
let client;
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
    // Start up the language server
    const serverModule = context.asAbsolutePath(path.join("out", "language-server", "server.js"));
    // The debug options for the server
    // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
    let debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };
    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    let serverOptions = {
        run: { module: serverModule, transport: vscode_languageclient_1.TransportKind.ipc },
        debug: {
            module: serverModule,
            transport: vscode_languageclient_1.TransportKind.ipc,
            options: debugOptions
        }
    };
    // Options to control the language client
    let clientOptions = {
        // Register the server for w2 documents
        documentSelector: [{ scheme: "file", language: "w2" }],
        synchronize: {
            // Notify the server about file changes to '.clientrc files contained in the workspace
            fileEvents: vscode_1.workspace.createFileSystemWatcher("**/.clientrc")
        }
    };
    // Create the language client and start the client.
    client = new vscode_languageclient_1.LanguageClient("w2languageServer", "W2 Language Server", serverOptions, clientOptions);
    // Start the client. This will also launch the server
    client.start();
}
exports.activate = activate;
// Deactive extension
function deactivate() {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map