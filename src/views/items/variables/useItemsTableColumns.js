

import { useTranslation } from "react-i18next";

export default function useItemsTableColumns() {
  const {t} = useTranslation()

  const itemsTableColumns = [
    {
      Header: t("itemsTable.columns.name"),
      accessor: "name",
    },
    {
      Header: t("itemsTable.columns.type"),
      accessor: "remaining_item",
    },
    {
      Header: t("itemsTable.columns.remaining_item"),
      accessor: "type",
    },
    {
      Header: t("itemsTable.columns.actions"),
      accessor: "actions",
    },
   
  ];
  

  

  return {itemsTableColumns}
}
