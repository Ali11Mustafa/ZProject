import { useTranslation } from "react-i18next";

export default function useApartmentsTableColumns() {
  const {t} = useTranslation()

  const apartmentsTableColumns = [
  
    {
      Header: t("apartmentsTable.columns.buildingId"),
      accessor: "building_id",
    },
    {
      Header: t("apartmentsTable.columns.name"),
      accessor: "name",
    },
    {
      Header: t("apartmentsTable.columns.numberOfInstallments"),
      accessor: "number_of_installments",
    },
    {
      Header: t("apartmentsTable.columns.pricePerInstallments"),
      accessor: "price_per_installments",
    },
    {
      Header: t("apartmentsTable.columns.remaininPrice"),
      accessor: "remaining_price",
    },
    {
      Header: t("apartmentsTable.columns.totalPrice"),
      accessor: "total_price",
    },
    {
      Header: t("apartmentsTable.columns.description"),
      accessor: "description",
    },
    {
      Header: t("apartmentsTable.columns.actions"),
      accessor: "actions",
    },
  ];
  
  

  

  return {apartmentsTableColumns}
}

