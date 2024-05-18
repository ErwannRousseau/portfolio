/**
 * This plugin contains all the logic for setting up the singletons
 */

import type { DocumentDefinition } from "sanity";
import type { StructureResolver } from "sanity/structure";

export const singletonPlugin = (types: string[]) => {
  return {
    name: "singletonPlugin",
    document: {
      // biome-ignore lint/suspicious/noExplicitAny:
      newDocumentOptions: (prev: any[], { creationContext }: any) => {
        if (creationContext.type === "global") {
          return prev.filter(
            (templateItem: { templateId: string }) =>
              !types.includes(templateItem.templateId),
          );
        }

        return prev;
      },
      // biome-ignore lint/suspicious/noExplicitAny:
      actions: (prev: any[], { schemaType }: any) => {
        if (types.includes(schemaType)) {
          return prev.filter(({ action }) => action !== "duplicate");
        }

        return prev;
      },
    },
  };
};

export const pageStructure = (
  typeDefArray: DocumentDefinition[],
): StructureResolver => {
  return (S) => {
    const singletonItems = typeDefArray.map((typeDef) => {
      return (
        S.listItem()
          // biome-ignore lint/style/noNonNullAssertion:
          .title(typeDef.title!)
          .icon(typeDef.icon)
          .child(
            S.editor()
              .id(typeDef.name)
              .schemaType(typeDef.name)
              .documentId(typeDef.name),
          )
      );
    });

    const defaultListItems = S.documentTypeListItems().filter(
      (listItem) =>
        !typeDefArray.find((singleton) => singleton.name === listItem.getId()),
    );

    return S.list()
      .title("Content")
      .items([...singletonItems, S.divider(), ...defaultListItems]);
  };
};
