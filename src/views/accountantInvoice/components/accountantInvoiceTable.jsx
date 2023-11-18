import Card from "components/card";
import { useTranslation } from "react-i18next";
import InvoiceTable from "./InvoiceTable";
import { default as NewAccountantInvoice } from "./NewAccountantInvoice";

const AccountantInvoicesTable = (props) => {
  const {
    columnsData,
    tableData,
    GetNewItem,
    total,
    currentPage,
    HandleFetch,
    perPage,
    loading,
  } = props;
  const { t } = useTranslation();

  let usr = JSON.parse(sessionStorage.getItem("user"));
  let role = usr?.role;
  return (
    <Card extra={"w-full h-full  px-5 mt-7"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl  font-semibold text-navy-700 dark:text-white">
          {t("accountantInvoiceTable.title")}
        </div>
        {role === "accountant" && (
          <div className="relative flex items-center gap-10 ">
            <NewAccountantInvoice GetNewItem={GetNewItem} />
          </div>
        )}
      </header>
      <InvoiceTable
        columnsData={columnsData}
        tableData={tableData}
        GetNewItem={GetNewItem}
        total={total}
        currentPage={currentPage}
        HandleFetch={HandleFetch}
        perPage={perPage}
        loading={loading}
      />
    </Card>
  );
};

export default AccountantInvoicesTable;
