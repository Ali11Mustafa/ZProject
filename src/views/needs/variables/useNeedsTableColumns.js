

import { useTranslation } from "react-i18next";



export default function useNeedsTableColumns() {
  const {t} = useTranslation()
  let usr = JSON.parse(sessionStorage.getItem('user'));
        let userName = usr?.fullname;
        let email = usr?.email;
        let role = usr?.role;
        let usrId = usr?.id;
        let token = usr?.token;

  const needsTableColumns = [
    {
      Header: t("needsTable.columns.need_amount"),
      accessor: "need_amount",
    },
    {
      Header: t("needsTable.columns.description"),
      accessor: "description",
    },
    {
      Header: t("needsTable.columns.status"),
      accessor: "status",
    },
    {
      Header: t("needsTable.columns.username"),
      accessor: "user_info.name",
    },
    {
      Header: t("needsTable.columns.item"),
      accessor: "item_info.type",
    },
    {
      Header: t("needsTable.columns.item_name"),
      accessor: "item_info.name",
    },
    {
      Header: t("needsTable.columns.remaining_item"),
      accessor: "item_info.remaining_item",
    },
    {
      Header: t("needsTable.columns.building"),
      accessor: "block_info.name",
    },
   

  ];
  if(usr.role==="admin"){
    needsTableColumns.push(  {
      Header: t("itemsTable.columns.actions"),
      accessor: "actions",
      
    },
   )
    
  }
  
  

  

  return {needsTableColumns}
}

