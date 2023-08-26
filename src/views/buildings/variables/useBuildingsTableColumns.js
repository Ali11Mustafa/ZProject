import { useTranslation } from "react-i18next";

export default function useBuildingsTableColumns() {
  const { t } = useTranslation();

  const buildingsTableColumns = [
    {
      Header: t("buildingsTable.columns.name"),
      accessor: "name",
    },
    {
      Header: t("buildingsTable.columns.numberOfFloors"),
      accessor: "number_of_floor",
    },
    {
      Header: t("buildingsTable.columns.apartmentsPerFloor"),
      accessor: "apartment_per_floor",
    },

    {
      Header: t("buildingsTable.columns.soldApartments"),
      accessor: "sold_apartments",
    },
    {
      Header: t("buildingsTable.columns.totalApartments"),
      accessor: "total_apartments",
    },
    {
      Header: t("buildingsTable.columns.level"),
      accessor: "level",
    },
    {
      Header: t("buildingsTable.columns.actions"),
      accessor: "actions",
    },
  ];

  return { buildingsTableColumns };
}
