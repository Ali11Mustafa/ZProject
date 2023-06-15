

import { useTranslation } from "react-i18next";



export default function useNeedsTableColumns() {
  const {t} = useTranslation()

  const needsTableColumns = [
    {
      Header: t("needsTable.columns.name"),
      accessor: "name",
    },
    {
      Header: t("needsTable.columns.usedAmount"),
      accessor: "used_amount",
    },
    {
      Header: t("needsTable.columns.building"),
      accessor: "building",
    },
    {
      Header: t("needsTable.columns.totalItemPerFloor"),
      accessor: "total_item_per_floor",
    },
    {
      Header: t("needsTable.columns.description"),
      accessor: "description",
    },
   
  ];
  

  

  return {needsTableColumns}
}

