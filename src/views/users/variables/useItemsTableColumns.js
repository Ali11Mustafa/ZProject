

import { useTranslation } from "react-i18next";

export default function useItemsTableColumns() {
  const {t} = useTranslation()

  const itemsTableColumns = [
    {
      Header: t("usersTable.columns.name"),
      accessor: "name",
    },  
    { 
      Header: t("usersTable.columns.email"),
      accessor: "email", 
    },
    {
      Header: t("usersTable.columns.Role"),
      accessor: "role",
    },
    { 
      Header: t("usersTable.columns.actions"),
      accessor: "actions",
    },
   
  ];
  

  return {itemsTableColumns}
}
