import * as constants from "../constants";
import { DOMParser } from "xmldom";
import { W2Item } from "./w2item";
import { TextDocumentPositionParams } from "vscode-languageserver-protocol";
import {
  CompletionItem,
  CompletionItemKind
} from "vscode-languageserver-types";

// An object which represents a w2 document
export class W2File {
  // Xml object with the w2 class in it
  private _xmlDocument: Document;

  // Creates a new instance of w2 document
  constructor(contents: string) {
    try {
      this._xmlDocument = new DOMParser({
        errorHandler: () => {
          throw new Error("Invalid Document");
        },
        locator: {}
      }).parseFromString(contents, "text/xml");
    } catch {
      this._xmlDocument = new DOMParser().parseFromString(
        "<InvalidDocument />",
        "text/xml"
      );
    }
  }

  // This is where we build up the TreeItem required for the w2 document view
  getW2Item(element: Element): W2Item {
    let label: string = "";
    let type: string = "";

    // Include the name if exists
    label = element.tagName;
    if (element.attributes.getNamedItem("name")) {
      label = label + " " + element.attributes.getNamedItem("name").value;
    }

    // Include any parameters (for methods)
    if (element.hasChildNodes) {
      let params: string = "";

      Array.from(element.childNodes).forEach(node => {
        const childElement = node as Element;
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

    return new W2Item(label, type);
  }

  // Get children of a given element (or parent if no element passed in)
  getChildren(element?: Node): Node[] {
    if (element) {
      return this._getChildElementArray(<Element>element);
    } else {
      return [this._xmlDocument.lastChild];
    }
  }

  // Get the node at a given position in the file
  getNodeAtPosition(linePosition: number, characterPosition: number): Node {
    return this._getNodeAtPositionCore(
      linePosition,
      characterPosition,
      this._xmlDocument.documentElement
    );
  }

  // Get a list of completion items at a give poition in the file
  completionItems(
    textDocumentPosition: TextDocumentPositionParams
  ): CompletionItem[] {
    let items: CompletionItem[] = [];

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
  }

  private _getNodeAtPositionCore(
    linePosition: number,
    characterPosition: number,
    contextNode: Node
  ): Node {
    if (!contextNode) {
      return undefined;
    }

    const lineNumber = (contextNode as any).lineNumber;
    const columnNumber = (contextNode as any).columnNumber;
    const columnRange = [
      columnNumber,
      columnNumber + (this._getNodeWidthInCharacters(contextNode) - 1)
    ];

    if (
      this._checkRange(lineNumber, linePosition, characterPosition, columnRange)
    ) {
      return contextNode;
    }

    // if the element contains text, check to see if the cursor is present in the text
    const textContent = (contextNode as Element).textContent;

    if (textContent) {
      columnRange[1] = columnRange[1] + textContent.length;

      if (
        this._checkRange(
          lineNumber,
          linePosition,
          characterPosition,
          columnRange
        )
      ) {
        return contextNode;
      }
    }

    const children = this._getChildElementArray(contextNode);
    let result: Node;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];

      result = this._getNodeAtPositionCore(
        linePosition,
        characterPosition,
        child
      );

      if (result) {
        return result;
      }
    }

    return undefined;
  }

  private _checkRange(
    lineNumber: number,
    linePosition: number,
    characterPosition: number,
    columnRange: number[]
  ): boolean {
    return (
      lineNumber === linePosition + 1 &&
      (characterPosition + 1 >= columnRange[0] &&
        characterPosition + 1 < columnRange[1])
    );
  }

  // True if node is an element
  private _isElement(node: Node): boolean {
    return !!node && !!(node as Element).tagName;
  }

  private _getChildElementArray(node: Node): any[] {
    if (!node.childNodes) {
      return [];
    }

    const array = new Array<any>();

    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i];

      if (this._isElement(child)) {
        array.push(child);
      }
    }

    return array;
  }

  private _getNodeWidthInCharacters(node: Node) {
    if (this._isElement(node)) {
      return node.nodeName.length + 2;
    } else {
      return node.nodeName.length + node.nodeValue.length + 3;
    }
  }
}
