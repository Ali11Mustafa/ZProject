import { useTranslation } from "react-i18next";

export default function useBuildingsTableColumns() {
  const {t} = useTranslation()
  let usr = JSON.parse(sessionStorage.getItem('user'));
  let userName = usr?.fullname;
  let email = usr?.email;
  let role = usr?.role;
  let usrId = usr?.id;
  let token = usr?.token;


  const buildingsTableColumns = [
    {
      Header: t("buildingsTable.columns.name"),
      //data name
      accessor: "name",
      //id of the column
    },
    {
      Header: t("buildingsTable.columns.numberOfFloors"),
      accessor: "number_of_floor",
    },
    {
      Header: t("buildingsTable.columns.apartmentsPerFloor"),
      accessor: "apartment_per_floor",
    },
   
    {
      Header: t("buildingsTable.columns.description"),
      accessor: "description",
    },
    {
      Header: t("buildingsTable.columns.level"),
      accessor: "level",
    },
    
  ];

  if(usr.role==="admin"){
    buildingsTableColumns.push(  {
      Header: t("buildingsTable.columns.actions"),
      accessor: "actions",
      
    },
   )
    
  }
  

  

  return {buildingsTableColumns}
}
