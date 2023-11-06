import { useTranslation } from "react-i18next";

export default function useAccountantInvoicesTableColumns() {
  const { t } = useTranslation();

  const accountantInvoicesTableColumns = [
    {
      Header: t("accountantInvoiceTable.fields.invoice_item_name"),
      accessor: "invoice_item",
    },
    {
      Header: t("accountantInvoiceTable.fields.invoice_date"),
      accessor: "invoice_date",
    },
    {
      Header: t("accountantInvoiceTable.fields.invoice_price"),
      accessor: "invoice_price",
    },
    {
      Header: t("accountantInvoiceTable.fields.invoice_remaining_price"),
      accessor: "invoice_remaining_price",
    },
    {
      Header: t("accountantInvoiceTable.fields.para_wargr_name"),
      accessor: "para_wargr_name",
    },
    {
      Header: t("accountantInvoiceTable.fields.para_dar_name"),
      accessor: "para_dar_name",
    },
    {
      Header: t("accountantInvoiceTable.fields.invoice_type"),
      accessor: "invoice_type",
    },
    {
      Header: t("accountantInvoiceTable.fields.is_approved"),
      accessor: "is_approved",
    },

    {
      Header: t("accountantInvoiceTable.fields.actions"),
      accessor: "actions",
    },
  ];

  return { accountantInvoicesTableColumns };
}
