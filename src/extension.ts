import {
  window,
  ExtensionContext,
  TextEditorSelectionChangeKind
} from "vscode";

import * as constants from "./constants";

import { W2TreeDataProvider } from "./tree-view";

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
}

// Deactive extension
export function deactivate() {
  // do nothing
}
