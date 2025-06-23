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
    actions: {
        title: ["მოქმედებები", "Actions", "Действия"],
        delete: ["წაშლა", "Delete", "Удалить"],
        confirm: ["დადასტურება", "Confirm", "Подтвердить"],
        cancel: ["გაუქმება", "Cancel", "Отмена"],
        clearAll: ["ყველას წაშლა", "Clear All", "Удалить все"]
    },
    confirmation: {
        deleteUserTitle: ["მომხმარებლის წაშლა", "Delete User", "Удаление пользователя"],
        deleteUserMessage: ["დარწმუნებული ხართ, რომ გსურთ ამ მომხმარებლის წაშლა?", "Are you sure you want to delete this user?", "Вы уверены, что хотите удалить этого пользователя?"],
        deleteNumberTitle: ["ნომრის წაშლა", "Delete Number", "Удаление номера"],
        deleteNumberMessage: ["დარწმუნებული ხართ, რომ გსურთ ამ ნომრის წაშლა?", "Are you sure you want to delete this number?", "Вы уверены, что хотите удалить этот номер?"],
        clearAllUsersTitle: ["ყველა მომხმარებლის წაშლა", "Delete All Users", "Удаление всех пользователей"],
        clearAllUsersMessage: ["დარწმუნებული ხართ, რომ გსურთ ყველა მომხმარებლის წაშლა? ეს მოქმედება შეუქცევადია.", "Are you sure you want to delete all users? This action cannot be undone.", "Вы уверены, что хотите удалить всех пользователей? Это действие нельзя отменить."],
        clearAllNumbersTitle: ["ყველა ნომრის წაშლა", "Delete All Numbers", "Удаление всех номеров"],
        clearAllNumbersMessage: ["დარწმუნებული ხართ, რომ გსურთ ყველა ნომრის წაშლა? ეს მოქმედება შეუქცევადია.", "Are you sure you want to delete all numbers? This action cannot be undone.", "Вы уверены, что хотите удалить все номера? Это действие нельзя отменить."]
    },
    errors: {
        loadUsers: ["მომხმარებლების ჩატვირთვა ვერ მოხერხდა", "Failed to load users", "Не удалось загрузить пользователей"],
        loadNumbers: ["ტელეფონის ნომრების ჩატვირთვა ვერ მოხერხდა", "Failed to load phone numbers", "Не удалось загрузить номера телефонов"],
        deleteUser: ["მომხმარებლის წაშლა ვერ მოხერხდა", "Failed to delete user", "Не удалось удалить пользователя"],
        deleteNumber: ["ნომრის წაშლა ვერ მოხერხდა", "Failed to delete number", "Не удалось удалить номер"],
        clearAllUsers: ["მომხმარებლების წაშლა ვერ მოხერხდა", "Failed to delete all users", "Не удалось удалить всех пользователей"],
        clearAllNumbers: ["ნომრების წაშლა ვერ მოხერხდა", "Failed to delete all numbers", "Не удалось удалить все номера"]
    }
};