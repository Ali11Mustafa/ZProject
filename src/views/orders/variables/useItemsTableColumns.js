

import { useTranslation } from "react-i18next";

export default function useItemsTableColumns() {
  const {t} = useTranslation()
  let usr = JSON.parse(sessionStorage.getItem('user'));
        let userName = usr?.fullname;
        let email = usr?.email;
        let role = usr?.role;
        let usrId = usr?.id;
        let token = usr?.token;
  const itemsTableColumns = [
    {
      Header: t("ordersTable.columns.amount"),
      accessor: "amount",
    },
    {
      Header: t("ordersTable.columns.unit"),
      accessor: "unit",
    },
    {
      Header: t("ordersTable.columns.price"),
      accessor: "price",
    },
    {
      Header: t("ordersTable.columns.status"),
      accessor: "status",
    },
    {
      Header: t("ordersTable.columns.username"),
      accessor: "user_info.name",
    },
    {
      Header: t("ordersTable.columns.item_type"),
      accessor: "item_info.type",
    },
    {
      Header: t("ordersTable.columns.item_name"),
      accessor: "item_info.name",
    },
    {
      Header: t("ordersTable.columns.remaining_item"),
      accessor: "item_info.remaining_item",
    },
    
  
  ];
  if(role==="admin"){
    itemsTableColumns.push(  {
      Header: t("ordersTable.columns.actions"),
      accessor: "actions",
      
    },
   )
    
  }
  

  

  return {itemsTableColumns}
}
