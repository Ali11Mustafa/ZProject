import { useTranslation } from "react-i18next";

export default function useApartmentsTableColumns() {
  const { t } = useTranslation();

  const apartmentsTableColumns = [
    {
      Header: t("apartmentsTable.columns.apartment_number"),
      accessor: "apartment_number",
    },
    {
      Header: t("apartmentsTable.columns.building"),
      accessor: "building",
    },
    {
      Header: t("apartmentsTable.columns.description"),
      accessor: "description",
    },
    {
      Header: t("apartmentsTable.columns.floor"),
      accessor: "floor",
    },
    {
      Header: t("apartmentsTable.columns.area"),
      accessor: "area",
    },
    {
      Header: t("apartmentsTable.columns.status"),
      accessor: "status",
    },
    {
      Header: t("apartmentsTable.columns.actions"),
      accessor: "actions",
    },
  ];

  return { apartmentsTableColumns };
}