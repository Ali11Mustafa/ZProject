import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      zTower: "Z Tower",
      sidebarLinks: {
        buildings: "Buildings",
        needs: "Needs",
        items: "Items",
        users: "Users",
        orders: "Orders",
        dashboard: "Dashboard",
      },
      dashboard: "Dashboard",
      contract: "Contract",
      logout: "Logout",
      search: "Search",
      signin: {
        title: "Sign In",
        email: "Email",
        password: "Password",
        button: "Sign In",
      },
      contractForm: {
        ownerName: "Owner Name",
        phoneNumber: "Phone Number",
        adress: "Address",
        idCardNumber: "ID Card Number",
        contractDate: "Contract Date",
        apartmentNumber: "Apartment Number",
        totalPaymentPrice: "Total Payment Price",
        pendingPrice: "Pending Price",
        apartmentPrice: "Apartment Price",
        contractType: "Contract Type",
        description: "Description",
      },
      buildingsTable: {
        title: "Buildings",
        columns: {
          name: "NAME",
          numberOfFloors: "NUMBER OF FLOORS",
          apartmentsPerFloor: "APARTMENTS PER FLOOR",
          numberOfApartments: "NUMBER OF APARTMENTS",
          soldApartments: "Sold Apartments",
          totalApartments: "Total Apartments",
          level: "LEVEL",
          actions: "ACTIONS",
        },
      },
      needsTable: {
        title: "Needs",
        columns: {
          need_amount: "NEED AMOUNT",
          item: "ITEM",
          description: "DESCRIPTION",
          remaining_item: "REMAINING ITEM",
          building: "BUILDING",
          username: "USERNAME",
          status: "STATUS",
          item_name: "ITEM NAME",
          item_type: "ITEM TYPE",
        },
      },
      usersUpdate: {
        name: "User Name",
        email: "Email",
        Role: "Role",
        actions: "ACTIONS",
        remainingAmount: "REMAINING AMOUNT",
        totalPrice: "TOTAL PRICE",
        pricePerBuilding: "PRICE PER BUILDING",
        actions: "ACTIONS",
      },
      itemsTable: {
        title: "Items",
        columns: {
          name: "NAME",
          type: "TYPE",
          remainingItem: "REMAINING ITEM",
          amountUnit: "AMOUNT UNIT",
          remainingAmount: "REMAINING AMOUNT",
          totalPrice: "TOTAL PRICE",
          pricePerBuilding: "PRICE PER BUILDING",
          actions: "ACTIONS",
        },
      },
      ordersTable: {
        title: "Orders",
        columns: {
          amount: "AMOUNT",
          unit: "UNIT",
          price: "PRICE",
          status: "STATUS",
          remaining_item: "REMAINING ITEM",
          item_name: "ITEM NAME",
          item_type: "ITEM TYPE",
          username: "USERNAME",
          actions: "ACTIONS",
        },
      },
      usersTable: {
        title: "Users",
        columns: {
          username: "USERNAME",
          email: "EMAIL",
          role: "ROLE",
          salary: "SALARY",
          actions: "ACTIONS",
        },
      },
      newBuilding: {
        title: "Add New Building",
        name: "Name",
        numberOfFloors: "Number of Floors",
        numberOfApartmentsPerFloor: "No. of Apartments per Floor",
        description: "Description",
      },
      newApartment: {
        title: "Add New Apartment",
        name: "Name",
        buildingId: "Building ID",
        typeOfInstallments: "Type of Installments",
        numberOfInstallments: "Number of Installments",
        description: "Description",
      },
      newNeed: {
        title: "Add New Need",
        need_amount: "Need Amount",
        item_name: "Item Name",
        item_type: "Item Type",
        building: "Building",
        description: "Description",
      },
      newItem: {
        title: "Add New Item",
        name: "Name",
        type: "Type",
        amount: "Amount",
        amountUnit: "Amount Unit",
        totalPrice: "Total Price",
      },
      newOrder: {
        title: "Add New Order",
        order_amount: "Order Amount",
        order_unit: "Order Unit",
        order_price: "Order Price",
        item_name: "Item Name",
        item_type: "Item Type",
      },
      newUser: {
        title: "Add New User",
        username: "Name",
        email: "Email",
        password: "Password",
        role: "Role",
        salary: "Salary",
      },
      apartmentsTable: {
        title: "Apartments",
        columns: {
          apartment_number: "Apartment's Number",
          status: "Status",
          building: "Building",
          description: "Description",
          floor_number: "Floor Number",
          area: "Area",
          actions: "ACTIONS",
        },
      },
      actions: {
        update: "Update",
        delete: "Delete",
        apartments: "Aparatments",
        contract: "Contract",
        view: "View",
      },
      langs: {
        en: "English",
        ku: "Kurdish",
        ar: "arabic",
      },
      widgets: {
        numberOfBuildings: "Number of Buildings",
        numberOfApartments: "Number of Apartments",
      },
      formButtons: {
        create: "Create",
        update: "Update",
        close: "Close",
        cancel: "Cancle",
        submit: "Submit",
        edit: "Edit",
        delete: "Delete",
      },
      updatePage: {
        buildings: "Update Building",
        needs: "Update Need",
        items: "Update Item",
        orders: "Update Order",
        users: "Update User",
      },
      alerts: {
        buildings: {
          deleteAlerts: {
            confirmation: "Are you sure?",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            success: {
              title: "Deleted!",
              message: "Building has been deleted.",
            },
            error: {
              title: "Something went wrong",
              message: "Building was not deleted.",
            },
          },
          addAlerts: {
            success: {
              title: "New Building has been created.",
            },
            error: {
              title: "Something went wrong",
            },
          },
          updateAlerts: {
            success: {
              title: "The building has been updated",
            },
            error: {
              title: "Something went wrong",
            },
          },
        },
        apartments: {
          deleteAlerts: {
            confirmation: "Are you sure?",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            success: {
              title: "Deleted!",
              message: "Apartment has been deleted.",
            },
            error: {
              title: "Something went wrong",
              message: "Apartment was not deleted.",
            },
          },
          addAlerts: {
            success: {
              title: "New apartment has been created.",
            },
            error: {
              title: "Something went wrong",
            },
          },
          updateAlerts: {
            success: {
              title: "The apartment has been updated",
            },
            error: {
              title: "Something went wrong",
            },
          },
        },
        items: {
          deleteAlerts: {
            confirmation: "Are you sure?",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            success: {
              title: "Deleted!",
              message: "Item has been deleted.",
            },
            error: {
              title: "Something went wrong",
              message: "Item was not deleted.",
            },
          },
          addAlerts: {
            success: {
              title: "New item has been created.",
            },
            error: {
              title: "Something went wrong",
            },
          },
          updateAlerts: {
            success: {
              title: "The item has been updated",
            },
            error: {
              title: "Something went wrong",
            },
          },
        },
        needs: {
          deleteAlerts: {
            confirmation: "Are you sure?",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            success: {
              title: "Deleted!",
              message: "Need has been deleted.",
            },
            error: {
              title: "Something went wrong",
              message: "Need was not deleted.",
            },
          },
          addAlerts: {
            success: {
              title: "New need has been created.",
            },
            error: {
              title: "Something went wrong",
            },
          },
          updateAlerts: {
            success: {
              title: "The need has been updated",
            },
            error: {
              title: "Something went wrong",
            },
          },
          acceptAlerts: {
            confirmation: "Are you sure?",
            confirmButtonText: "Accept",
            cancelButtonText: "Cancel",
            success: {
              title: "Accepted!",
              message: "Need has been accepted.",
            },
            error: {
              title: "Something went wrong",
              message: "Need was not accepted.",
            },
            buttons: {
              accept: "Accept",
              reject: "Reject",
            },
          },
          rejectAlerts: {
            confirmation: "Are you sure?",
            confirmButtonText: "Reject",
            cancelButtonText: "Cancel",
            success: {
              title: "Rejected!",
              message: "Need has been Rejected.",
            },
            error: {
              title: "Something went wrong",
              message: "Need was not rejected.",
            },
            buttons: {
              accept: "Accept",
              reject: "Reject",
            },
          },
        },
        orders: {
          deleteAlerts: {
            confirmation: "Are you sure?",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            success: {
              title: "Deleted!",
              message: "Order has been deleted.",
            },
            error: {
              title: "Something went wrong",
              message: "Order was not deleted.",
            },
          },
          addAlerts: {
            success: {
              title: "New order has been created.",
            },
            error: {
              title: "Something went wrong",
            },
          },
          updateAlerts: {
            success: {
              title: "The order has been updated",
            },
            error: {
              title: "Something went wrong",
            },
          },
          acceptAlerts: {
            confirmation: "Are you sure?",
            confirmButtonText: "Accept",
            cancelButtonText: "Cancel",
            success: {
              title: "Accepted!",
              message: "Order has been accepted.",
            },
            error: {
              title: "Something went wrong",
              message: "Order was not accepted.",
            },
            buttons: {
              accept: "Accept",
              reject: "Reject",
            },
            acceptAlerts: {
              confirmation: "Are you sure?",
              confirmButtonText: "Accept",
              cancelButtonText: "Cancel",
              success: {
                title: "Accepted!",
                message: "order has been accepted.",
              },
              error: {
                title: "Something went wrong",
                message: "order was not accepted.",
              },
              buttons: {
                accept: "Accept",
                reject: "Reject",
              },
            },
            rejectAlerts: {
              confirmation: "Are you sure?",
              confirmButtonText: "Reject",
              cancelButtonText: "Cancel",
              success: {
                title: "Rejected!",
                message: "order has been Rejected.",
              },
              error: {
                title: "Something went wrong",
                message: "order was not rejected.",
              },
              buttons: {
                accept: "Accept",
                reject: "Reject",
              },
            },
          },
        },
        users: {
          deleteAlerts: {
            confirmation: "Are you sure?",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            success: {
              title: "Deleted!",
              message: "User has been deleted.",
            },
            error: {
              title: "Something went wrong",
              message: "User was not deleted.",
            },
          },
          addAlerts: {
            success: {
              title: "New user has been created.",
            },
            error: {
              title: "Something went wrong",
            },
          },
          updateAlerts: {
            success: {
              title: "The user has been updated",
            },
            error: {
              title: "Something went wrong",
            },
          },
        },
      },
      updateApartment: {
        title: "Update Apartment",
        apartmentNumber: "Aapartment Number",
        description: "Description",
        floorNumber: "Floor Number",
        area: "Area",
      },
      dashboardPage: {
        total_users: "Total Users",
        total_blocks: "Total Buildings",
        total_items: "Total Items",
        total_needs: "Total Needs",
        total_orders: "Total Orders",
      },
    },
  },
  ku: {
    translation: {
      zTower: "زی تاوەر",
      sidebarLinks: {
        buildings: "باڵەخانەکان",
        needs: "پێداویستیەکان",
        items: "کەرەستەکان",
        users: "بەکارهێنەرەکان",
        orders: "داواکاریەکان",
        dashboard: "داشبۆرد",
      },
      dashboard: "داشبۆرد",
      contract: "گرێبەست",
      logout: "چوونە دەرەوە",
      search: "گەڕان",
      signin: {
        title: "چوونە ژوورەوە",
        email: "ئیمەیڵ",
        password: "ژمارەی نهێنی",
        button: "بچۆ ژوورەوە",
      },
      contractForm: {
        ownerName: "ناوی خاوەنەکەی",
        phoneNumber: "ژمارەی تەلەفۆن",
        adress: "ناونیشان",
        idCardNumber: "ژمارەی کارتی ناسنامە",
        contractDate: "بەرواری گرێبەست",
        apartmentNumber: "ژمارەی شوقە",
        totalPaymentPrice: "کۆی گشتی نرخی پارەدان",
        pendingPrice: "نرخی چاوەڕوانکراو",
        apartmentPrice: "نرخی شوقە",
        contractType: "جۆری گرێبەست",
        description: "باسکردن",
      },
      buildingsTable: {
        title: "باڵەخانەکان",
        columns: {
          name: "ناو",
          numberOfFloors: "ژمارەی نهۆمەکان",
          apartmentsPerFloor: "ژمارەی شوقەکان بەپێی هەر نهۆمێک",
          numberOfApartments: "کۆی ژمارەی شوقەکان",
          description: "باسکردن",
          soldApartments: "شوقە فرۆشراوەکان",
          totalApartments: "کۆی گشتی شوقەکان",
          level: "ئاست",
          actions: "کردارەکان",
        },
      },
      needsTable: {
        title: "پێویستیەکان",
        columns: {
          need_amount: "ڕێژەی پێویست",
          item: "کەرەستە",
          description: "باسکردن",
          remaining_item: "کەرەستەی ماوە",
          building: "باڵەخانە",
          username: "ناوی بەکارهێنەر",
          status: "دۆخ",
          item_name: "ناوی کەرەستە",
          item_type: "جۆری کەرەستە",
        },
      },
      itemsTable: {
        title: "کەرەستەکان",
        columns: {
          name: "ناو",
          type: "جۆر",
          remainingItem: "ڕێژە",
          amountUnit: "یەکەی ڕێژە",
          remainingAmount: "ڕێژەی ماوە",
          totalPrice: "کۆی گشتی نرخ",
          pricePerBuilding: "نرخی هەر بینایەک",
          actions: "کردارەکان",
        },
      },
      ordersTable: {
        title: "داواکاریەکان",
        columns: {
          amount: "ڕێژە",
          unit: "یەکە",
          price: "نرخ",
          status: "دۆخ",
          remaining_item: "کەرەستەی ماوە",
          item_name: "ناوی کەرەستە",
          item_type: "جۆری کەرەستە",
          username: "ناوی بەکارهێەر",
          actions: "کردارەکان",
        },
      },
      apartmentsTable: {
        title: "شوقەکان",
        columns: {
          apartment_number: "ژمارەی شوقە",
          status: "دۆخ",
          building: "باڵەخانە",
          description: "باسکردن",
          floor_number: "ژمارەی نهۆم",
          area: "ڕووبەر",
          actions: "کردارەکان",
        },
      },
      usersTable: {
        title: "بەکارهێنەرەکان",
        columns: {
          username: "ناوی بەکارهێنەر",
          email: "ئیمەیڵ",
          role: "ڕۆڵ",
          salary: "موچە",
          actions: "کردارەکان",
        },
      },
      newBuilding: {
        title: "باڵەخانەی نوێ زیاد بکە",
        name: "ناو",
        numberOfFloors: "ژمارەی نهۆمەکان",
        numberOfApartmentsPerFloor: "ژمارەی شوقەکان بۆ هەر نهۆمێک",
        description: "باسکردن",
      },
      newApartment: {
        title: "شوقەی نوێ زیاد بکە",
        name: "ناو",
        buildingId: "ئایدی باڵەخانە",
        typeOfInstallments: "جۆری قیستەکان",
        numberOfInstallments: "ژمارەی قیستەکان",
        description: "باسکردن",
      },
      newNeed: {
        title: "پێداویستی نوێ زیادبکە",
        need_amount: "ڕێژەی پێویست",
        item_name: "ناوی کەرەستە",
        item_type: "جۆری کەرەستە",
        building: "باڵەخانە",
        description: "باسکردم",
      },
      newItem: {
        title: "کەرەستەی نوێ زیادبکە",
        name: "ناو",
        type: "جۆر",
        amount: "ڕێژە",
        amountUnit: "یەکەی ڕێژە",
        totalPrice: "کۆی گشتی بڕه پارە",
      },
      newOrder: {
        title: "زیادکردنی داواکاری نوێ",
        order_amount: "بڕی داواکاری",
        order_unit: "یەکەی داواکاری",
        order_price: "نرخی داواکاری",
        order_type: "جۆری داواکاری",
        item_name: "ناوی کەرەستە",
        item_type: "جۆری کەرەستە",
      },
      newUser: {
        title: "بەکارهێنەری نوێ زیاد بکە",
        username: "ناوی بەکارهێنەر",
        email: "ئیمەیڵ",
        role: "ڕۆڵ",
        password: "تێپەڕە ووشه",
        salary: "موچە",
      },
      actions: {
        update: "نوێکردنەوە",
        delete: "سڕینەوە",
        apartments: "شوقەکان",
        contract: "گرێبەست",
        view: "بینین",
      },
      langs: {
        en: "ئینگلیزی",
        ku: "کوردی",
        ar: "عەرەبی",
      },
      widgets: {
        numberOfBuildings: "ژمارەی باڵەخانەکان",
        numberOfApartments: "ژمارەی شوقەکان",
      },
      formButtons: {
        create: "دروستبکە",
        update: "نوێبکەوە",
        close: "دابخە",
        cancel: "پەشیمانبوونەوە",
        submit: "ناردن",
        edit: "دەستکاریکردن",
        delete: "سڕینەوە",
      },
      updatePage: {
        buildings: "نوێکرندەوەی باڵەخانە",
        needs: "نوێکردنەوەی پێداویستی",
        items: "نوێکردنەوەی کەرەستە",
        orders: "نوێکردنەوەی داواکاری",
        users: "نوێکردنەوەی بەکارهێنەر",
      },
      alerts: {
        buildings: {
          deleteAlerts: {
            confirmation: "دڵنیایی؟",
            confirmButtonText: "سڕینەوە",
            cancelButtonText: "پەشیمانبوونەوە",
            success: {
              title: "سڕایەوە",
              message: "باڵەخانەکە سڕایەوە",
            },
            error: {
              title: "کێشەیەک ڕوویدا",
              message: "باڵەخانە نەسڕایەوە",
            },
          },
          addAlerts: {
            success: {
              title: "باڵەخانە نوێکە زیادکرا",
            },
            error: {
              title: "کێشیەک ڕوویدا",
            },
          },
          updateAlerts: {
            success: {
              title: "باڵەخانەکە نوێکرایەوە",
            },
            error: {
              title: "کێشیەک ڕوویدا",
            },
          },
        },
        items: {
          deleteAlerts: {
            confirmation: "دڵنیایی؟",
            confirmButtonText: "سڕینەوە",
            cancelButtonText: "پەشیمانبوونەوە",
            success: {
              title: "سڕایەوە!",
              message: "کەرەستەکە سڕایەوە",
            },
            error: {
              title: "هەڵەیەک ڕوویدا",
              message: "کەرەستەکە نەسڕایەوە.",
            },
          },
          addAlerts: {
            success: {
              title: "کەرەستەی نوێ زیادکرا",
            },
            error: {
              title: "هەڵەیەک ڕوویدا",
            },
          },
          updateAlerts: {
            success: {
              title: "کەرەستەکە نوێ کرایەوە",
            },
            error: {
              title: "هەڵەیەک ڕوویدا",
            },
          },
        },
        needs: {
          deleteAlerts: {
            confirmation: "دڵنیایی؟",
            confirmButtonText: "سڕینەوە",
            cancelButtonText: "پەشیمانبوونەوە",
            success: {
              title: "سڕایەوە!",
              message: "پێویستیەکە سڕایەوە",
            },
            error: {
              title: "کێشەیەک ڕوویدا!",
              message: "پێویستیەکە نەسڕایەوە.",
            },
          },
          addAlerts: {
            success: {
              title: "پێویستیە نوێیەکە زیادکرا",
            },
            error: {
              title: "کێشەیەک ڕوویدا!",
            },
          },
          updateAlerts: {
            success: {
              title: "پێویستیەکە نوێکرایەوە",
            },
            error: {
              title: "کێشەیەک ڕوویدا!",
            },
          },
          acceptAlerts: {
            confirmation: "دڵنیایی؟",
            confirmButtonText: "قبوڵکردن",
            cancelButtonText: "پەشیمانبوونەوە",
            success: {
              title: "قبوڵکرا",
              message: "پێویستیەکە قبوڵکرا",
            },
            error: {
              title: "کێشەیەک ڕوویدا!",
              message: "پێویستیەکە قبوڵنەکرا",
            },
            buttons: {
              accept: "قبوڵکردن",
              reject: "ڕەتکردنەوە",
            },
          },
          rejectAlerts: {
            confirmation: "دڵنیایی؟",
            confirmButtonText: "ڕەتکردنەوە",
            cancelButtonText: "پەشیمانبوونەوە",
            success: {
              title: "ڕەتکراوە",
              message: "پێویستیەکە ڕەتکرایەوە",
            },
            error: {
              title: "کێشەیەک ڕوویدا!",
              message: "پێویستیەکە ڕەتنەکرایەوە",
            },
            buttons: {
              accept: "قبوڵکردن",
              reject: "ڕەتکردنەوە",
            },
          },
        },
        orders: {
          deleteAlerts: {
            confirmation: "دڵنیایی؟",
            confirmButtonText: "سڕینەوە",
            cancelButtonText: "پەشیمانبوونەوە",
            success: {
              title: "سڕایەوە!",
              message: "داواکاریەکە سڕایەوە",
            },
            error: {
              title: "کێشەیەک ڕوویدا!",
              message: "داواکاریەکە نەسڕایەوە",
            },
          },
          addAlerts: {
            success: {
              title: "داواکاریە نوێکە زیاد بوو",
            },
            error: {
              title: "کێشەیەک ڕوویدا!",
            },
          },
          updateAlerts: {
            success: {
              title: "داواکاریەکە نوێکرایەوە",
            },
            error: {
              title: "کێشەیەک ڕوویدا!",
            },
            acceptAlerts: {
              confirmation: "دڵنیایی؟",
              confirmButtonText: "قبوڵکردن",
              cancelButtonText: "پەشیمانبوونەوە",
              success: {
                title: "قبوڵکرا",
                message: " داواکارییەکە قبوڵکرا",
              },
              error: {
                title: "کێشەیەک ڕوویدا!",
                message: " داواکارییەکە قبوڵنەکرا",
              },
              buttons: {
                accept: "قبوڵکردن",
                reject: "ڕەتکردنەوە",
              },
            },
            rejectAlerts: {
              confirmation: "دڵنیایی؟",
              confirmButtonText: "ڕەتکردنەوە",
              cancelButtonText: "پەشیمانبوونەوە",
              success: {
                title: "ڕەتکراوە",
                message: " داواکارییەکە ڕەتکرایەوە",
              },
              error: {
                title: "کێشەیەک ڕوویدا!",
                message: " داواکارییەکە ڕەتنەکرایەوە",
              },
              buttons: {
                accept: "قبوڵکردن",
                reject: "ڕەتکردنەوە",
              },
            },
          },
          acceptAlerts: {
            confirmation: "دڵنیایی؟",
            confirmButtonText: "قبوڵکردن",
            cancelButtonText: "پەشیمانبوونەوە",
            success: {
              title: "قبوڵکرا",
              message: "داواکاریەکە قبوڵکرا",
            },
            error: {
              title: "کێشەیەک ڕوویدا!",
              message: "داواکاریەکە قبوڵ نەکرا",
            },
            buttons: {
              accept: "قبوڵکردن",
              reject: "ڕەتکردنەوە",
            },
          },
        },
        users: {
          deleteAlerts: {
            confirmation: "دڵنیایی؟",
            confirmButtonText: "سڕینەوە",
            cancelButtonText: "پەشیمانبوونەوە",
            success: {
              title: "سڕایەوە",
              message: "بەکارهێنەرەکە سڕایەوە",
            },
            error: {
              title: "کێشەیەک ڕوویدا!",
              message: "بەکارهێنەرەکە نەسڕایەوە",
            },
          },
          addAlerts: {
            success: {
              title: "بەکارهێنەری نوێ زیاد بوو",
            },
            error: {
              title: "کێشەیەک ڕوویدا!",
            },
          },
          updateAlerts: {
            success: {
              title: "بەکارهێنەرەکە نوێکرایەوە",
            },
            error: {
              title: "کێشەیەک ڕوویدا!",
            },
          },
        },
      },
      updateApartment: {
        title: "نوێکردنەوەی شوقە",
        apartmentNumber: "ژمارەی شوقە",
        description: "وەسف",
        floorNumber: "ژمارەی نهۆم",
        area: "ڕووبەر",
      },
      updateBlock: {
        title: "نوێکردنەوەی باڵەخانە",
      },
      dashboardPage: {
        total_users: "کۆی گشتی بەکارهێنەرەکان",
        total_blocks: "کۆی گشتی باڵەخانەکان",
        total_items: "کۆی گشتی کەرەستەکان",
        total_needs: "کۆی گشتی پێویستیەکان",
        total_orders: "کۆی گشتی داواکاریەکان",
      },
    },
  },
  ar: {
    translation: {
      zTower: "زي تاور",
      sidebarLinks: {
        buildings: "البنايات",
        needs: "الاحتياجات",
        items: "أغراض",
        users: "المستخدمون",
        orders: "اوامر",
        dashboard: "داشبورد",
      },
      dashboard: "داشبورد",
      contract: "عقد",
      logout: "تسجيل خروج",
      search: "يبحث",
      signin: {
        title: "تسجيل الدخول",
        email: "بريد إلكتروني",
        password: "كلمة المرور",
        button: "يدخل",
      },
      contractForm: {
        ownerName: "اسم المالك",
        phoneNumber: "رقم التليفون",
        adress: "عنوان",
        idCardNumber: "رقم بطاقة الهوية",
        contractDate: "تاريخ العقد",
        apartmentNumber: "رقم الشقة",
        totalPaymentPrice: "إجمالي سعر السداد",
        pendingPrice: "السعر المعلق",
        apartmentPrice: "سعر الشقة",
        contractType: "نوع العقد",
        description: "وصف",
      },
      buildingsTable: {
        title: "البنايات",
        columns: {
          name: "اسم",
          numberOfFloors: "عدد الطوابق",
          apartmentsPerFloor: "شقق في الطابق",
          numberOfApartments: "  عدد الشقق",
          soldApartments: "إجمالي بيعها",
          totalApartments: "مجموعه متاحة",
          level: "مستوى",
          actions: "أجراءات",
        },
      },
      needsTable: {
        title: "الاحتياجات",
        columns: {
          need_amount: "المبلغ المطلوب",
          item: "بند",
          description: "وصف",
          remaining_item: "البند المتبقي",
          building: "بناء",
          username: "اسم المستخدم",
          status: "حالة",
          item_name: "اسم العنصر",
          item_type: "نوع العنصر",
        },
      },
      itemsTable: {
        title: "أغراض",
        columns: {
          name: "اسم",
          type: "النوع",
          remainingItem: "المبلغ",
          amountUnit: "وحدة المبلغ",
          remainingAmount: "الكمية المتبقية",
          totalPrice: "السعر الكلي",
          pricePerBuilding: "سعر المبنى",
          actions: "أجراءات",
        },
      },
      ordersTable: {
        title: "اوامر",
        columns: {
          amount: "مبلغ",
          unit: "وحدة",
          price: "سعر",
          status: "حالة",
          remaining_item: "البند المتبقي",
          item_name: "اسم العنصر",
          item_type: "نوع العنصر",
          username: "اسم المستخدم",
          actions: "أجراءات",
        },
      },
      apartmentsTable: {
        title: "الشقق",
        columns: {
          apartment_number: "رقم الشقة",
          status: "الحالة",
          building: "المبنى",
          description: "الوصف",
          floor_number: "رقم الطابق",
          area: "المساحة",
          actions: "الإجراءات",
        },
      },
      usersTable: {
        title: "المستخدمون",
        columns: {
          username: "اسم المستخدم",
          email: "البريد الإلكتروني",
          role: "دور",
          salary: "راتب",
          actions: "الاجراءات",
        },
      },
      newUser: {
        title: "إضافة مستخدم جديد",
        username: "اسم المستخدم",
        email: "البريد الإلكتروني",
        role: "دور",
        password: "كلمة المرور",
        salary: "راتب",
      },
      newBuilding: {
        title: "أضف مبنى جديد",
        name: "اسم",
        numberOfFloors: "عدد الطوابق",
        numberOfApartmentsPerFloor: "عدد الشقق في الطابق",
        description: "وصف",
      },
      newApartment: {
        title: "أضف شقة جديدة",
        name: "اسم",
        buildingId: "معرف البناء",
        typeOfInstallments: "نوع الأقساط",
        numberOfInstallments: "عدد الأقساط",
        description: "وصف",
      },
      newNeed: {
        title: "أضف حاجة جديدة",
        need_amount: "المبلغ المطلوب",
        item_name: "اسم العنصر",
        item_type: "نوع العنصر",
        building: "بناء",
        description: "وصف",
      },
      newItem: {
        title: "أضف أداة جديدة",
        name: "اسم",
        type: "نوع",
        amount: "المبلغ",
        amountUnit: "وحدة المبلغ",
        totalPrice: "السعر الكلي",
      },
      newOrder: {
        title: "إضافة طلب جديد",
        order_amount: "كمية الطلب",
        order_unit: "وحدة الطلب",
        order_price: "سعر الطلب",
        order_type: "نوع الطلب",
        item_name: "اسم العنصر",
        item_type: "نوع العنصر",
      },
      actions: {
        update: "تحديث",
        delete: "يمسح",
        apartments: "شقق سكنية",
        contract: "العقد",
        view: "شاهده",
      },
      updateApartment: {
        title: "تحديث الشقة",
        apartmentNumber: "رقم الشقة",
        description: "الوصف",
        floorNumber: "رقم الطابق",
        area: "المنطقة",
      },
      updateBlock: {
        title: "تحديث البینا",
      },
      langs: {
        en: "الإنكليزية",
        ku: "الكردية",
        ar: "العربية",
      },
      widgets: {
        numberOfBuildings: "عدد المباني",
        numberOfApartments: "عدد الشقق",
      },
      formButtons: {
        create: "يخلق",
        update: "تحديث",
        close: "يغلق",
        cancel: "يلغي",
        submit: "ارسال",
        edit: "تعديل",
        delete: "حذف",
      },
      updatePage: {
        buildings: "تحديث المبنى",
        needs: "تحديث الحاجة",
        items: "تحديث العنصر",
        orders: "تحديث الطلب",
        users: "تحديث المستخدم",
      },
      alerts: {
        buildings: {
          deleteAlerts: {
            confirmation: "هل أنت متأكد؟",
            confirmButtonText: "حذف",
            cancelButtonText: "إلغاء",
            success: {
              title: "تم الحذف!",
              message: "تم حذف المبنى.",
            },
            error: {
              title: "حدث خطأ ما",
              message: "لم يتم حذف المبنى.",
            },
          },
          addAlerts: {
            success: {
              title: "تم إنشاء مبنى جديد.",
            },
            error: {
              title: "حدث خطأ ما",
            },
          },
          updateAlerts: {
            success: {
              title: "تم تحديث المبنى",
            },
            error: {
              title: "حدث خطأ ما",
            },
          },
        },
        items: {
          deleteAlerts: {
            confirmation: "هل أنت متأكد؟",
            confirmButtonText: "حذف",
            cancelButtonText: "إلغاء",
            success: {
              title: "تم الحذف!",
              message: "تم حذف العنصر.",
            },
            error: {
              title: "حدث خطأ ما",
              message: "لم يتم حذف العنصر.",
            },
          },
          addAlerts: {
            success: {
              title: "تم إنشاء عنصر جديد.",
            },
            error: {
              title: "حدث خطأ ما",
            },
          },
          updateAlerts: {
            success: {
              title: "تم تحديث العنصر",
            },
            error: {
              title: "حدث خطأ ما",
            },
          },
        },
        needs: {
          deleteAlerts: {
            confirmation: "هل أنت متأكد؟",
            confirmButtonText: "حذف",
            cancelButtonText: "إلغاء",
            success: {
              title: "تم الحذف!",
              message: "تم حذف الحاجة.",
            },
            error: {
              title: "حدث خطأ ما",
              message: "لم يتم حذف الحاجة.",
            },
          },
          addAlerts: {
            success: {
              title: "تم إنشاء حاجة جديدة.",
            },
            error: {
              title: "حدث خطأ ما",
            },
          },
          updateAlerts: {
            success: {
              title: "تم تحديث الحاجة",
            },
            error: {
              title: "حدث خطأ ما",
            },
          },
          acceptAlerts: {
            confirmation: "هل أنت متأكد؟",
            confirmButtonText: "قبول",
            cancelButtonText: "إلغاء",
            success: {
              title: "تم قبوله!",
              message: "تم قبول الحاجة.",
            },
            error: {
              title: "حدث خطأ ما",
              message: "لم يتم قبول الحاجة.",
            },
            buttons: {
              accept: "قبول",
              reject: "رفض",
            },
          },
          rejectAlerts: {
            confirmation: "هل أنت متأكد؟",
            confirmButtonText: "رفض",
            cancelButtonText: "إلغاء",
            success: {
              title: "تم الرفض!",
              message: "تم رفض الحاجة.",
            },
            error: {
              title: "حدث خطأ ما",
              message: "لم يتم رفض الحاجة.",
            },
            buttons: {
              accept: "قبول",
              reject: "رفض",
            },
          },
        },
        orders: {
          deleteAlerts: {
            confirmation: "هل أنت متأكد؟",
            confirmButtonText: "حذف",
            cancelButtonText: "إلغاء",
            success: {
              title: "تم الحذف!",
              message: "تم حذف الطلب.",
            },
            error: {
              title: "حدث خطأ ما",
              message: "لم يتم حذف الطلب.",
            },
          },
          addAlerts: {
            success: {
              title: "تم إنشاء طلب جديد.",
            },
            error: {
              title: "حدث خطأ ما",
            },
          },
          updateAlerts: {
            success: {
              title: "تم تحديث الطلب",
            },
            error: {
              title: "حدث خطأ ما",
            },
          },
          acceptAlerts: {
            confirmation: "هل أنت متأكد؟",
            confirmButtonText: "قبول",
            cancelButtonText: "إلغاء",
            success: {
              title: "تم قبوله!",
              message: "تم قبول الطلب.",
            },
            error: {
              title: "حدث خطأ ما",
              message: "لم يتم قبول الطلب.",
            },
            buttons: {
              accept: "قبول",
              reject: "رفض",
            },
          },
        },
        users: {
          deleteAlerts: {
            confirmation: "هل أنت متأكد؟",
            confirmButtonText: "حذف",
            cancelButtonText: "إلغاء",
            success: {
              title: "تم الحذف!",
              message: "تم حذف المستخدم.",
            },
            error: {
              title: "حدث خطأ ما",
              message: "لم يتم حذف المستخدم.",
            },
          },
          addAlerts: {
            success: {
              title: "تم إنشاء مستخدم جديد.",
            },
            error: {
              title: "حدث خطأ ما",
            },
          },
          updateAlerts: {
            success: {
              title: "تم تحديث المستخدم",
            },
            error: {
              title: "حدث خطأ ما",
            },
          },
        },
      },
      dashboardPage: {
        total_users: "إجمالي المستخدمين",
        total_blocks: "إجمالي المباني",
        total_items: "إجمالي العناصر",
        total_needs: "إجمالي الاحتياجات",
        total_orders: "إجمالي الطلبات",
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
