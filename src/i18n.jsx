import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "logo text part1": "Z",
      "logo text part2": "Tower",
      sidebarLinks:{
        "buildings":"Buildings",
        "needs":"Needs",
        "items":"Items",
        "users":"Users",
        "orders":"Orders"

      },
      "dashboard": "Dashboard",
      "logout": "Logout",
      "search":"Search",
      signin:{
        "title":"Sign In",
        "email":"Email",
        "password":"Password",
        "button":"Sign In"
      },
      buildingsTable:{
        "title":"Buildings",
        columns:{
          "name":'NAME',
          "numberOfFloors":'NUMBER OF FLOORS',
          "apartmentsPerFloor":'APARTMENTS PER FLOOR',
          "numberOfApartments":'NUMBER OF APARTMENTS',
          "description":'DESCRIPTION',
          "level":'LEVEL',
          "actions":'ACTIONS',
        },
      },
      needsTable:{
        "title":"Needs",
        columns:{ 
          "need_amount":'NEED AMOUNT',
          "item":'ITEM',
          "description":'DESCRIPTION',
          "remaining_item":'REMAINING ITEM',
          "building":'BUILDING',
          "username":'USERNAME',  
          "status":'STATUS',
          "item_name":'ITEM NAME',
          "item_type":'ITEM TYPE',
      }
      }
      ,
      usersTable:{ 
        "title":"Users",
        "title1":"Add New User",
        columns:{
          "name":'UserName',
          "email":'Email',
          "Role":'Role',
          "salary":"salary",
          "actions":'ACTIONS',
          "remainingAmount":'REMAINING AMOUNT',
          "totalPrice":'TOTAL PRICE',
          "pricePerBuilding":'PRICE PER BUILDING',
          "actions":'ACTIONS',
      },
      },
      usersUpdate:{ 
     
          "name":'User Name',
          "email":'Email',
          "Role":'Role',
          "actions":'ACTIONS',
          "remainingAmount":'REMAINING AMOUNT',
          "totalPrice":'TOTAL PRICE',
          "pricePerBuilding":'PRICE PER BUILDING',
          "actions":'ACTIONS',
      },
      itemsTable:{ 
        "title":"Items",
        columns:{
          "name":'NAME',
          "type":'TYPE',
          "remainingItem":'REMAINING ITEM',
          "amountUnit":'AMOUNT UNIT',
          "remainingAmount":'REMAINING AMOUNT',
          "totalPrice":'TOTAL PRICE',
          "pricePerBuilding":'PRICE PER BUILDING',
          "actions":'ACTIONS',
      },
      },
      ordersTable:{
        "title":"Orders",
        columns:{
          "amount":'AMOUNT',
          "unit":'UNIT',
          "price":'PRICE',
          "status":'STATUS',
          "remaining_item":'REMAINING ITEM',
          "item_name":'ITEM NAME',
          "item_type":'ITEM TYPE',
          "username":'USERNAME',  
          "actions":'ACTIONS',
      },
      },
     
      newBuilding:{
        "title":"Add New Building",
        "name":"Name",
        "numberOfFloors":"Number of Floors",
        "numberOfApartmentsPerFloor":"No. of Apartments per Floor",
        "description":"Description",
      },
      newApartment:{
        "title":"Add New Apartment",
        "name":"Name",
        "buildingId":"Building ID",
        "typeOfInstallments":"Type of Installments",
        "numberOfInstallments":"Number of Installments",
        "description":"Description",
  
      },
      newNeed:{
        "title":"Add New Need",
        "need_amount":"Need Amount",
        "item_name":"Item Name",
        "item_type":"Item Type",
        "building":"Building",
        "description":"Description",
        
      },
      newItem:{
        "title":"Add New Item",
        "name":"Name",
        "type":"Type",
        "amount":"Amount",
        "amountUnit":"Amount Unit",
        "totalPrice":"Total Price",
        
      },
      newOrder:{
        "title":"Add New Order",
        "order_amount":"Order Name",
        "order_unit":"Order Unit",
        "order_price":"Order Price", 
        "item_name":"Item Name",
        "item_type":"Item Type",
        
      }
      ,
      apartmentsTable:{
        "title":"Apartments",
          columns:{
            "buildingId":'BUILDING ID',
            "name":'NAME',
            "type":'TYPE',
            "numberOfInstallments":'NUMBER OF INSTALLMENTS',
            "pricePerInstallments":'PRICE PER INSTALLMENTS',
            "remaininPrice":'REMAINING PRICE',
            "totalPrice":'TOTAL PRICE',
            "description":'DESCRIPTION',
            "actions":'ACTIONS',
        }
      },
      actions:{
        "update":"Update",
        "delete":"Delete",
        "apartments":"Aparatments",
      },
      langs:{
        "en":"English",
        "ku":"Kurdish",
        "ar":"arabic"
      },
      widgets:{
        "numberOfBuildings":"Number of Buildings",
        "numberOfApartments":"Number of Apartments",
      },
      formButtons:{
        "create":"Create",
        "update":"Update",
        "close":"Close",
        "cancel":"Cancle",
      },
      updatePage:{
        "buildings":"Update Building",
        "needs":"Update Need",
        "items":"Update Item",
        "orders":"Update Order",
      }
    }
    
  },
  ku: {
    translation: {
      "logo text part1":"زی",
      "logo text part2": "تاوەر",
      sidebarLinks:{
        "buildings":"باڵەخانەکان",
        "needs":"پێداویستیەکان",
        "items":"کەرەستەکان",
        "users":"بەکارهێنەرەکان",
        "orders":"داواکاریەکان"
      },
      "dashboard":"داشبۆرد",
      "logout": "چوونە دەرەوە",
      "search":"گەڕان",
      signin:{
        "title":"چوونە ژوورەوە",
        "email":"ئیمەیڵ",
        "password":"ژمارەی نهێنی",
        "button":"بچۆ ژوورەوە"
      },
      buildingsTable:{
        "title":"باڵەخانەکان",
        columns:{
          "name":'ناو',
          "numberOfFloors":'ژمارەی نهۆمەکان',
          "apartmentsPerFloor":'ژمارەی شوقەکان بەپێی هەر نهۆمێک',
          "numberOfApartments":'کۆی ژمارەی شوقەکان',
          "description":'باسکردن',
          "level":'ئاست',
          "actions":'کردارەکان',
        }
      },
      needsTable:{
        "title":"پێویستیەکان",
        columns:{ 
          "need_amount":'ڕێژەی پێویست',
          "item":'کەرەستە',
          "description":'باسکردن',
          "remaining_item":'کەرەستەی ماوە',
          "building":'باڵەخانە',
          "username":'ناوی بەکارهێنەر',
          "status":'دۆخ',
          "item_name":'ناوی کەرەستە',
          "item_type":'جۆری کەرەستە',
      }
      },
      itemsTable:{
        "title":"کەرەستەکان",
        columns:{
          "name":'ناو',
          "type":'جۆر',
          "remainingItem":'ڕێژە',
          "amountUnit":'یەکەی ڕێژە',
          "remainingAmount":'ڕێژەی ماوە',
          "totalPrice":'کۆی گشتی نرخ',
          "pricePerBuilding":'نرخی هەر بینایەک',
          "actions":'کردارەکان',
      },
      },
      usersTable:{ 
        "title":"Users",
        "title1":"Add New User",
        columns:{
          "name":'UserName',
          "email":'Email',
          "Role":'Role',
          "salary":"salary",
          "actions":'ACTIONS',
          "remainingAmount":'REMAINING AMOUNT',
          "totalPrice":'TOTAL PRICE',
          "pricePerBuilding":'PRICE PER BUILDING',
          "actions":'ACTIONS',
      },
      },
      ordersTable:{
        "title":"داواکاریەکان",
        columns:{
          "amount":'ڕێژە',
          "unit":'یەکە',
          "price":'نرخ',
          "status":'دۆخ',
          "remaining_item":'کەرەستەی ماوە',
          "item_name":'ناوی کەرەستە',
          "item_type":'جۆری کەرەستە',
          "username":'ناوی بەکارهێەر',  
          "actions":'کردارەکان',
      },
      },
      apartmentsTable:{
        "title":"شوقەکان",
          columns:{
            "buildingId":'ئایدی باڵەخانە',
            "name":'ناو',
            "type":'جۆر',
            "numberOfInstallments":'ژمارەی قیستەکان',
            "pricePerInstallments":'نرخ بۆ هەر قیستێک',
            "remaininPrice":'نرخی ماوە',
            "totalPrice":'نرخی گشتی',
            "description":'باسکردن',
            "actions":'کردارەکان',
        }
      },
      newBuilding:{
        "title":"باڵەخانەی نوێ زیاد بکە",
        "name":"ناو",
        "numberOfFloors":"ژمارەی نهۆمەکان",
        "numberOfApartmentsPerFloor":"ژمارەی شوقەکان بۆ هەر نهۆمێک",
        "description":"باسکردن",
      },
      newApartment:{
        "title":"شوقەی نوێ زیاد بکە",
        "name":"ناو",
        "buildingId":"ئایدی باڵەخانە",
        "typeOfInstallments":"جۆری قیستەکان",
        "numberOfInstallments":"ژمارەی قیستەکان",
        "description":"باسکردن",
      },
      newNeed:{
        "title":"پێداویستی نوێ زیادبکە",
        "need_amount":"ڕێژەی پێویست",
        "item_name":"ناوی کەرەستە",
        "item_type":"جۆری کەرەستە",
        "building":"باڵەخانە",
        "description":"باسکردم",
       
        
      },
      newItem:{
        "title":"کەرەستەی نوێ زیادبکە",
        "name":"ناو",
        "type":"جۆر",
        "amount":"ڕێژە",
        "amountUnit":"یەکەی ڕێژە",
        "totalPrice":"کۆی گشتی بڕه پارە",
       
        
      },
      newOrder:{
        "title":"زیادکردنی داواکاری نوێ",
        "order_amount":"ناوی داواکاوی",
        "order_unit":"یەکەی داواکاری",
        "order_price":"نرخی داواکاری", 
        "order_type":"جۆری داواکاری",
        "item_name":"ناوی کەرەستە",
        "item_type":"جۆری کەرەستە",
        
      },
      actions:{
        "update":"نوێکردنەوە",
        "delete":"سڕینەوە",
        "apartments":"شوقەکان",
      }
      ,
      langs:{
        "en":"ئینگلیزی",
        "ku":"کوردی",
        "ar":"عەرەبی"
      },
      widgets:{
        "numberOfBuildings":"ژمارەی باڵەخانەکان",
        "numberOfApartments":"ژمارەی شوقەکان",
      },
      formButtons:{
        "create":"دروستبکە",
        "update":"نوێبکەوە",
        "close":"دابخە",
        "cancel":"پەشیمانبوونەوە",
      
      },
      updatePage:{
        "buildings":"نوێکرندەوەی باڵەخانە",
        "needs":"نوێکردنەوەی پێداویستی",
        "items":"نوێکردنەوەی کەرەستە",
        "orders":"نوێکردنەوەی داواکاری",
      }
      
    },
  
  },
  ar: {
    translation: {
      "logo text part1":"ز‌‌‌ى",
      "logo text part2": "تاور",
      sidebarLinks:{
        "buildings":"البنايات",
        "needs":"الاحتياجات",
        "items":"أغراض",
        "users":"المستعملون",
        "orders":"اوامر"
      },
      "dashboard":"داشبورد",
      "logout": "تسجيل خروج",
      "search":"يبحث",
      signin:{
        "title":"تسجيل الدخول",
        "email":"بريد إلكتروني",
        "password":"كلمة المرور",
        "button":"يدخل"
      },
      buildingsTable:{
        "title":"البنايات",
        columns:{
          "name":'اسم',
          "numberOfFloors":'عدد الطوابق',
          "apartmentsPerFloor":'شقق في الطابق',
          "numberOfApartments":'  عدد الشقق',
          "description":'    وصف',
          "level":'مستوى',
          "actions":'أجراءات',
        }
      },
      needsTable:{
        "title":"الاحتياجات",
        columns:{ 
          "need_amount":'المبلغ المطلوب',
          "item":'بند',
          "description":'وصف',
          "remaining_item":'البند المتبقي',
          "building":'بناء',
          "username":'اسم المستخدم',
          "status":'حالة',
          "item_name":'اسم العنصر',
          "item_type":'نوع العنصر',
      }
      },
      itemsTable:{
        "title":"أغراض",
        columns:{
          "name":'اسم',
          "type":'النوع',
          "remainingItem":'المبلغ',
          "amountUnit":'وحدة المبلغ',
          "remainingAmount":'الكمية المتبقية',
          "totalPrice":'السعر الكلي',
          "pricePerBuilding":'سعر المبنى',
          "actions":'أجراءات',
      },
      },
      ordersTable:{
        "title":"اوامر",
        columns:{
          "amount":'مبلغ',
          "unit":'وحدة',
          "price":'سعر',
          "status":'حالة',
          "remaining_item":'البند المتبقي',
          "item_name":"اسم العنصر",
          "item_type":"نوع العنصر",
          "username":'اسم المستخدم',  
          "actions":'أجراءات',
      },
      },
      apartmentsTable:{
        "title":"شقق",
          columns:{
            "buildingId":'معرف البناء',
            "name":'اسم',
            "type":'نوع',
            "numberOfInstallments":'عدد الأقساط',
            "pricePerInstallments":'السعر لكل قسط',
            "remaininPrice":'السعر المتبقي',
            "totalPrice":'السعر الكلي',
            "description":'وصف',
            "actions":'أجراءات',
        }
      },
      newBuilding:{
        "title":"أضف مبنى جديد",
        "name":"اسم",
        "numberOfFloors":"عدد الطوابق",
        "numberOfApartmentsPerFloor":"عدد الشقق في الطابق",
        "description":"وصف",
        
      }
      ,
      newApartment:{
        "title":"أضف شقة جديدة",
        "name":"اسم",
        "buildingId":"معرف البناء",
        "typeOfInstallments":"نوع الأقساط",
        "numberOfInstallments":"عدد الأقساط",
        "description":"وصف",
      
      },
      newNeed:{
        "title":"أضف حاجة جديدة",
        "need_amount":"المبلغ المطلوب",
        "item_name":"اسم العنصر",
        "item_type":"نوع العنصر",
        "building":"بناء",
        "description":"وصف",
      
        
      },
      newItem:{
        "title":"أضف أداة جديدة",
        "name":"اسم",
        "type":"نوع",
        "amount":"المبلغ",
        "amountUnit":"وحدة المبلغ",
        "totalPrice":"السعر الكلي",
       
        
        
      },
      newOrder:{
        "title":"إضافة طلب جديد",
        "order_amount":"اسم الطلب",
        "order_unit":"وحدة الطلب",
        "order_price":"سعر الطلب", 
        "order_type":"نوع الطلب",
        "item_name":"اسم العنصر",
        "item_type":"نوع العنصر",
        
      },
      actions:{
        "update":"تحديث",
        "delete":"يمسح",
        "apartments":"شقق سكنية",
      },

      langs:{
        "en":"الإنكليزية",
          "ku":"الكردية",
          "ar":"العربية"
      },
      widgets:{
        "numberOfBuildings":"عدد المباني",
        "numberOfApartments":"عدد الشقق",
      },
      formButtons:{
        "create":"يخلق",
        "update":"تحديث",
        "close":"يغلق",
        "cancel":"يلغي",
      }
      ,
      updatePage:{
        "buildings":"تحديث المبنى",
        "needs":"تحديث الحاجة",
        "items":"تحديث العنصر",
        "orders":"تحديث الطلب",
      }
    },
   
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;