// D:\ZURIKO\WORK\CAR SERVICE MANAGEMENT SYSTEM\CSMS\SRC\app\core\mocks\sections\section1mock.ts

export const section1Mocks = {
  header: {
    functions: ["ფუნქციები", "Features", "Функции"],
    basic: {
      name: ["საბაზისო", "Basic", "Базовый"],
      price: "$900",
      perMonth: ["/თვეში", "/month", "/месяц"],
      button: ["დემოს ნახვა", "View Demo", "Смотреть демо"],
    },
    standard: {
      name: ["სტანდარტი", "Standard", "Стандартный"],
      price: "$1100",
      perMonth: ["/თვეში", "/month", "/месяц"],
      button: ["დემოს ნახვა", "View Demo", "Смотреть демо"],
    },
    premium: {
      name: ["პრემიუმი", "Premium", "Премиум"],
      price: "$1500",
      perMonth: ["/თვეში", "/month", "/месяц"],
      button: ["დემოს ნახვა", "View Demo", "Смотреть демо"],
    },
  },
  rows: [
    {
      type: "header",
      text: ["მონიტორინგის დაფა", "Monitoring Dashboard", "Панель мониторинга"],
      basic: null,
      standard: null,
      premium: null,
    },
    {
      type: "feature",
      text: ["ზოგადი სტატისტიკა", "General Statistics", "Общая статистика"],
      basic: true,
      standard: true,
      premium: true,
    },
    {
      type: "feature",
      text: ["სიახლეები და შეტყობინებები", "News and Notifications", "Новости и уведомления"],
      basic: false,
      standard: true,
      premium: true,
    },
    {
      type: "header",
      text: ["ცნობარები", "Directories", "Справочники"],
      basic: null,
      standard: null,
      premium: null,
    },
    {
      type: "feature",
      text: ["სასაქონლო ნომეკლატურა", "Product Nomenclature", "Номенклатура товаров"],
      basic: true,
      standard: true,
      premium: true,
    },
    {
      type: "feature",
      text: ["სატრანსპორტო საშუალებები", "Vehicles", "Транспортные средства"],
      basic: true,
      standard: true,
      premium: true,
    },
    {
      type: "feature",
      text: ["კლიენტები", "Clients", "Клиенты"],
      basic: true,
      standard: true,
      premium: true,
    },
    {
      type: "feature",
      text: ["საწყობები", "Warehouses", "Склады"],
      basic: true,
      standard: true,
      premium: true,
    },
    {
      type: "feature",
      text: ["კომპანიის მანქანები", "Company Cars", "Автомобили компании"],
      basic: false,
      standard: true,
      premium: true,
    },
    {
      type: "feature",
      text: ["ძირითადი საშუალებები", "Fixed Assets", "Основные средства"],
      basic: false,
      standard: false,
      premium: true,
    },
  ],
  footer: {
    text: ["ერთჯერადი დანერგვის ღირებულება", "One-time implementation cost", "Единоразовая стоимость внедрения"],
    price: "$1500"
  }
};