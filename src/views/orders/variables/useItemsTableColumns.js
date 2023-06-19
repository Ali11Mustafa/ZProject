

import { useTranslation } from "react-i18next";

export default function useItemsTableColumns() {
  const {t} = useTranslation()

  const itemsTableColumns = [
    {
      Header: t("itemsTable.columns.amount"),
      accessor: "amount",
    },
    {
      Header: t("itemsTable.columns.unit"),
      accessor: "unit",
    },
    {
      Header: t("itemsTable.columns.price"),
      accessor: "price",
    },
    {
      Header: t("itemsTable.columns.status"),
      accessor: "status",
    },
    {
      Header: t("needsTable.username"),
      accessor: "user_info.name",
    },
    {
      Header: t("needsTable.columns.item"),
      accessor: "item_info.type",
    },
    {
      Header: t("needsTable.name"),
      accessor: "item_info.name",
    },
    {
      Header: t("needsTable.remaining_item"),
      accessor: "item_info.remaining_item",
    },
    {
      Header: t("needsTable.actions"),
      accessor: "actions",
    },
   
  ];
  

  

  return {itemsTableColumns}
}
