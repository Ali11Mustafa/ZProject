import { useTranslation } from "react-i18next";



export default function useBuildingsTableColumns() {
  const {t} = useTranslation()

  const buildingsTableColumns = [
    {
      Header: t("buildingsTable.columns.name"),
      accessor: "name",
    },
    {
      Header: t("buildingsTable.columns.numberOfFloors"),
      accessor: "number_of_floors",
    },
    {
      Header: t("buildingsTable.columns.apartmentsPerFloor"),
      accessor: "apartments_per_floor",
    },
    {
      Header: t("buildingsTable.columns.numberOfApartments"),
      accessor: "number_of_apartments",
    },
    {
      Header: t("buildingsTable.columns.description"),
      accessor: "description",
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
  

  

  return {buildingsTableColumns}
}

