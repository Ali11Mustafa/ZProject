

import { useTranslation } from "react-i18next";

export default function useItemsTableColumns() {
  const {t} = useTranslation()

  const itemsTableColumns = [
    {
      Header: t("itemsTable.columns.name"),
      accessor: "name",
    },
    {
      Header: t("itemsTable.columns.remainingAmount"),
      accessor: "remaining_item",
    },
    {
      Header: t("itemsTable.columns.type"),
      accessor: "type",
    },
    {
      Header: t("itemsTable.columns.actions"),
      accessor: "actions",
    },
   
  ];
  

  

  return {itemsTableColumns}
}
