import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Reciept from "./Reciept";

function RecieptDownloadBtn({ invoiceId }) {
  const [recieptData, setRecieptData] = useState([]);

  let usr = JSON.parse(sessionStorage.getItem("user"));
  let token = usr?.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    getAccountantInvoices();
  }, []);

  async function getAccountantInvoices() {
    const API = "https://api.hirari-iq.com/api/invoice/accountant";
    try {
      let res = await axios(API, config);
      const invoices = res.data.data;

      const currentInvoice = invoices.find(
        (invoice) => invoice.id === invoiceId
      );

      if (currentInvoice) {
        setRecieptData({
          invoice_price: currentInvoice.invoice_price,
          invoice_date: currentInvoice.invoice_date,
          para_dar_name: currentInvoice.para_dar_name,
          para_wargr_name: currentInvoice.para_wargr_name,
          invoice_remaining_price: currentInvoice.invoice_remaining_price,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  const { t } = useTranslation();

  return (
    <>
      {recieptData && (
        <div>
          <PDFDownloadLink
            document={<Reciept recieptData={recieptData} />}
            filename="reciept"
          >
            {({ loading }) =>
              loading ? (
                <span className="text-white">Loading Document...</span>
              ) : (
                <button
                  type="button"
                  id="pdf-download-button"
                  className="rounded-sm bg-blue-400 p-2 text-sm text-black"
                >
                  {t("downloadReciept")}
                </button>
              )
            }
          </PDFDownloadLink>
        </div>
      )}
    </>
  );
}

export default RecieptDownloadBtn;
