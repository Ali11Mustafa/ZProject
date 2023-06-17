import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "logo text part1": "Z",
      "logo text part2": "Tower",
      sidebarLinks:{
        "buildings":"Buildings",
        "needs":"Needs",
        "items":"Items",
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
        }
      },
      needsTable:{
        "title":"Needs",
        columns:{
          "name":'NAME',
          "need_amount":'NEED AMOUNT',
          "item":'ITEM',
          "description":'DESCRIPTION',
          "building":'BUILDING',
      }
      }
      ,
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
        "name":"Name",
        "usedAmount":"Used Amount",
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
        "title":"پێداویستیەکان",
        columns:{
          "item":'کەرەستە',
          "need_amount":'ڕێژەی بەکارهاتوو',
          "building":'باڵەخانە',
          "description":'باسکردن',
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
        "descriptioon":"باسکردن",
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
        "name":"ناو",
        "usedAmount":"ڕێژەی بەکارهاتوو",
        "building":"باڵەخانە",
        "description":"باسکردن",
       
        
      },
      newItem:{
        "title":"کەرەستەی نوێ زیادبکە",
        "name":"ناو",
        "type":"جۆر",
        "amount":"ڕێژە",
        "amountUnit":"یەکەی ڕێژە",
        "totalPrice":"کۆی گشتی بڕه پارە",
       
        
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
          "need_amount":' المبلغ المستخدم ',
          "item":'مادة',
          "description":'وصف',
          "building":'البناء',
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
        "descriptioon":"وصف",
        
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
        "name":"اسم",
        "usedAmount":"المبلغ المستخدم",
        "building":"البناء",
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
    },
   
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;