

import { useTranslation } from "react-i18next";



export default function useNeedsTableColumns() {
  const {t} = useTranslation()

  const needsTableColumns = [
    {
      Header: t("needsTable.columns.need_amount"),
      accessor: "need_amount",
    },
    {
      Header: t("needsTable.columns.description"),
      accessor: "description",
    },
    {
      Header: t("needsTable.status"),
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
      Header: t("needsTable.columns.building"),
      accessor: "block_info.name",
    },
    {
      Header: t("itemsTable.columns.actions"),
      accessor: "actions",
    },
   
   
    
    
   
  ];
  

  

  return {needsTableColumns}
}

