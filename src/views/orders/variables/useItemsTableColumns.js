

import { useTranslation } from "react-i18next";

export default function useItemsTableColumns() {
  const {t} = useTranslation()

  const itemsTableColumns = [
    {
      Header: t("ordersTable.columns.amount"),
      accessor: "amount",
    },
    {
      Header: t("ordersTable.columns.unit"),
      accessor: "unit",
    },
    {
      Header: t("ordersTable.columns.price"),
      accessor: "price",
    },
    {
      Header: t("ordersTable.columns.status"),
      accessor: "status",
    },
    {
      Header: t("ordersTable.columns.username"),
      accessor: "user_info.name",
    },
    {
      Header: t("ordersTable.columns.item_type"),
      accessor: "item_info.type",
    },
    {
      Header: t("ordersTable.columns.item_name"),
      accessor: "item_info.name",
    },
    {
      Header: t("ordersTable.columns.remaining_item"),
      accessor: "item_info.remaining_item",
    },
    {
      Header: t("ordersTable.columns.actions"),
      accessor: "actions",
    },
   
  ];
  

  

  return {itemsTableColumns}
}
