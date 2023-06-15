

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
      accessor: "type",
    },
    {
      Header: t("itemsTable.columns.amount"),
      accessor: "amount",
    },
    {
      Header: t("itemsTable.columns.amountUnit"),
      accessor: "amount_unit",
    },
    {
      Header: t("itemsTable.columns.remainingAmount"),
      accessor: "remaining_amount",
    },
    {
      Header: t("itemsTable.columns.totalPrice"),
      accessor: "total_price",
    },
    {
      Header: t("itemsTable.columns.pricePerBuilding"),
      accessor: "price_per_building",
    },
   
  ];
  

  

  return {itemsTableColumns}
}

