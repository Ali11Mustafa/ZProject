import { useTranslation } from "react-i18next";

export default function useInvoicesTableColumns() {
  const { t } = useTranslation();

  const invoicesTableColumns = [
    {
      Header: t("itemInvoiceTable.fields.invoice_item_name"),
      accessor: "invoice_item_name",
    },
    {
      Header: t("itemInvoiceTable.fields.invoice_item_need_status"),
      accessor: "invoice_item_need_status",
    },
    {
      Header: t("itemInvoiceTable.fields.actions"),
      accessor: "actions",
    },
  ];

  return { invoicesTableColumns };
}
