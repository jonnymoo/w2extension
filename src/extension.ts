import {
  window,
  workspace,
  ExtensionContext,
  TextEditorSelectionChangeKind
} from "vscode";

import * as path from "path";

import * as constants from "./constants";

import { W2TreeDataProvider } from "./tree-view";

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind
} from "vscode-languageclient";

// Language server client proxy
let client: LanguageClient;

// Extension active function
export function activate(context: ExtensionContext) {
  // Create the "W2 Document" tree view in the side panel
  const treeViewDataProvider = new W2TreeDataProvider(context);
  const treeView = window.createTreeView<Node>(constants.views.w2TreeView, {
    treeDataProvider: treeViewDataProvider
  });

  // Hook up the selection changed - this is so we can place ourselves in the correct place in the w2 file
  window.onDidChangeTextEditorSelection(x => {
    if (
      x.kind === TextEditorSelectionChangeKind.Mouse &&
      x.selections.length > 0
    ) {
      treeView.reveal(
        treeViewDataProvider.getNodeAtPosition(x.selections[0].start)
      );
    }
  });

  // Add subscription
  context.subscriptions.push(treeView);

  // Start up the language server
  const serverModule = context.asAbsolutePath(
    path.join("out", "language-server", "server.js")
  );

  // The debug options for the server
  // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
  let debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  let serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions
    }
  };

  // Options to control the language client
  let clientOptions: LanguageClientOptions = {
    // Register the server for w2 documents
    documentSelector: [{ scheme: "file", language: "w2" }],
    synchronize: {
      // Notify the server about file changes to '.clientrc files contained in the workspace
      fileEvents: workspace.createFileSystemWatcher("**/.clientrc")
    }
  };

  // Create the language client and start the client.
  client = new LanguageClient(
    "w2languageServer",
    "W2 Language Server",
    serverOptions,
    clientOptions
  );

  // Start the client. This will also launch the server
  client.start();
}

// Deactive extension
export function deactivate() {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
