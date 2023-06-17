

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
      Header: t("needsTable.columns.item"),
      accessor: "item_id.type",
    },
    {
      Header: t("needsTable.columns.building"),
      accessor: "block_id.name",
    },
   
  ];
  

  

  return {needsTableColumns}
}

