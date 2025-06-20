// src/app/core/mocks/admin-dashboard-textsmock.ts

export const adminDashboardTexts = {
    title: ["ადმინისტრატორის დაფა", "Admin Dashboard", "Административная панель"],
    loading: ["მონაცემები იტვირთება...", "Loading data...", "Загрузка данных..."],
    retry: ["ხელახლა ცდა", "Retry", "Попробовать снова"],
    usersSection: {
        title: ["რეგისტრირებული მომხმარებლები", "Registered Users", "Зарегистрированные пользователи"],
        columns: {
            id: ["ID", "ID", "ID"],
            name: ["სახელი", "Name", "Имя"],
            company: ["კომპანია", "Company", "Компания"],
            email: ["Email", "Email", "Email"],
            phone: ["ტელეფონი", "Phone", "Телефон"],
            registered: ["რეგისტრაციის თარიღი", "Registered", "Дата регистрации"]
        }
    },
    numbersSection: {
        title: ["ტელეფონის ნომრები", "Phone Numbers", "Телефонные номера"],
        columns: {
            id: ["ID", "ID", "ID"],
            number: ["ტელეფონის ნომერი", "Phone Number", "Телефонный номер"],
            registered: ["რეგისტრაციის თარიღი", "Registered", "Дата регистрации"]
        }
    },
    errors: {
        loadUsers: ["მომხმარებლების ჩატვირთვა ვერ მოხერხდა", "Failed to load users", "Не удалось загрузить пользователей"],
        loadNumbers: ["ტელეფონის ნომრების ჩატვირთვა ვერ მოხერხდა", "Failed to load phone numbers", "Не удалось загрузить номера телефонов"]
    }
};