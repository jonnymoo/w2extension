import { NativeCommands } from "./native-commands";
import {
  window,
  workspace,
  TreeItemCollapsibleState,
  EventEmitter,
  ExtensionContext,
  Position,
  TextEditor,
  TreeDataProvider,
  TreeItem
} from "vscode";

import * as path from "path";

import * as constants from "../constants";
import { W2File } from "./w2file";

export class W2TreeDataProvider implements TreeDataProvider<any> {
  private _onDidChangeTreeData: EventEmitter<any> = new EventEmitter<any>();
  private _file: W2File;

  constructor(private _context: ExtensionContext) {
    window.onDidChangeActiveTextEditor(() => {
      this._refreshTree();
    });

    workspace.onDidChangeTextDocument(() => {
      this._refreshTree();
    });

    this._refreshTree();
  }

  onDidChangeTreeData = this._onDidChangeTreeData.event;

  get activeEditor(): TextEditor {
    return window.activeTextEditor || null;
  }

  getTreeItem(element: Element): TreeItem | Thenable<TreeItem> {
    const treeItem = new TreeItem(element.localName);

    const w2Item = this._file.getW2Item(element);
    treeItem.label = w2Item.label;
    treeItem.collapsibleState = TreeItemCollapsibleState.Collapsed;
    treeItem.command = {
      command: constants.nativeCommands.revealLine,
      title: "",
      arguments: [
        {
          lineNumber: (element as any).lineNumber - 1,
          at: "top"
        }
      ]
    };
    treeItem.iconPath = {
      dark: this._context.asAbsolutePath(
        path.join("resources", "icons", `${w2Item.type}.dark.svg`)
      ),
      light: this._context.asAbsolutePath(
        path.join("resources", "icons", `${w2Item.type}.light.svg`)
      )
    };

    return treeItem;
  }

  getChildren(element?: Node): Node[] | Thenable<Node[]> {
    if (!this._file) {
      this._refreshTree();
    }

    return this._file.getChildren(element);
  }

  getParent(element: Node): Node {
    if (
      (!element || !element.parentNode || !element.parentNode.parentNode) &&
      !(element as any).ownerElement
    ) {
      return undefined;
    }

    return element.parentNode || (element as any).ownerElement;
  }

  getNodeAtPosition(position: Position): Node {
    return this._file.getElementAtPosition(position.line, position.character);
  }

  private _refreshTree(): void {
    if (
      !this.activeEditor ||
      this.activeEditor.document.languageId !== constants.languageIds.w2
    ) {
      NativeCommands.setContext(constants.contextKeys.w2TreeViewEnabled, false);
      this._file = null;
      this._onDidChangeTreeData.fire();
      return;
    }

    NativeCommands.setContext(constants.contextKeys.w2TreeViewEnabled, true);

    const xml = this.activeEditor.document.getText();

    // Create the w2 file representation
    this._file = new W2File(xml);

    this._onDidChangeTreeData.fire();
  }
}
