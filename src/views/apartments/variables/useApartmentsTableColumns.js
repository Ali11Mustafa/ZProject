import { useTranslation } from "react-i18next";

export default function useApartmentsTableColumns() {
  const { t } = useTranslation();

  const apartmentsTableColumns = [
    {
      Header: t("apartmentsTable.columns.apartment_number"),
      accessor: "apartment_number",
    },
    {
      Header: t("apartmentsTable.columns.floor_number"),
      accessor: "floor_number",
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
