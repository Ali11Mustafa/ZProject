

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
      Header: t("itemsTable.columns.name"),
      accessor: "name",
    },
    {
      Header: t("itemsTable.columns.remainingAmount"),
      accessor: "remaining_item",
    },
    {
      Header: t("itemsTable.columns.type"),
      accessor: "type",
    }
   
  ];
  if(usr.role==="admin"){
    itemsTableColumns.push(  {
      Header: t("itemsTable.columns.actions"),
      accessor: "actions",
      
    },
   )
    
  }
  
  

  

  return {itemsTableColumns}
}
