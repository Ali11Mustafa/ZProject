import { useTranslation } from "react-i18next";

export default function useApartmentsTableColumns() {
  const { t } = useTranslation();

  const apartmentsTableColumns = [
    {
      Header: t("apartmentsTable.columns.owner_name"),
      accessor: "owner_name",
    },
    {
      Header: t("apartmentsTable.columns.phone_number"),
      accessor: "phone_number",
    },
    {
      Header: t("apartmentsTable.columns.contract_date"),
      accessor: "contract_date",
    },
    {
      Header: t("apartmentsTable.columns.apartment_number"),
      accessor: "apartment_number",
    },
    {
      Header: t("apartmentsTable.columns.total"),
      accessor: "total",
    },
    {
      Header: t("apartmentsTable.columns.apartment_price"),
      accessor: "apartment_price",
    },
    {
      Header: t("apartmentsTable.columns.remaining_money"),
      accessor: "remaining_money",
    },
    {
      Header: t("apartmentsTable.columns.actions"),
      accessor: "actions",
    },
  ];

  return { apartmentsTableColumns };
}