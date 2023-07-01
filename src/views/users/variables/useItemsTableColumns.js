

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
      Header: t("usersTable.columns.username"),
      accessor: "name",
    },  
    { 
      Header: t("usersTable.columns.email"),
      accessor: "email", 
    },
    {
      Header: t("usersTable.columns.role"),
      accessor: "role",
    },
    {
      Header: t("usersTable.columns.salary"),
      accessor: "salary",
    },
 
   
  ];
  if(usr.role==="admin"){
    itemsTableColumns.push(  {
      Header: t("usersTable.columns.actions"),
      accessor: "actions",
      
    },
   )
    
  }
  

  return {itemsTableColumns}
}
