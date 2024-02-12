import {I18nLocale, I18nLanguage} from "../../interface";

export type I18nKey =
    "RECOVER_PASSWORD" |

    "SESSION_EXPIRED" |
    "ERR_CONNECTION" |
    "ERR_UNAUTHORIZED" |

    "REGISTER_LETTER_INFO" |
    "RECOVER_LETTER_INFO" |

    "ACCOUNT_EXISTS_QUESTION" |

    "CHANGE_PASSWORD_QUESTION" |

    "USER_OR_LOGIN_INVALID" |
    "USER_LOGIN" |

    "USER_NEW" |

    "USER_RECOVER" |
    "USER_RECOVER_INFO" |

    "USER_NEW_PASSWORD" |
    "USER_NEW_PASSWORD_INFO" |

    "NEED_ACCOUNT_QUESTION" |
    "SIGN_UP_HERE" |
    "FORGOT_QUESTION" |

    "JOI_W20" |
    "JOI_EMPTY" |
    "JOI_EMAIL" |
    "JOI_ZIP" |
    "JOI_PHONE" |
    "JOI_PASSWORD" |
    "JOI_PASSWORD_CONFIRM" |
    // "JOI_PASSWORD_REGEX" |

    "ENTER_NEW_PASSWORD" |
    "ENTER_OLD_PASSWORD" |
    "ENTER_YOUR_PASSWORD" |
    "REENTER_YOUR_PASSWORD" |
    "ENTER_PASSWORD_INFO" |
    "RE_ENTER_PASSWORD_INFO" |

    "HOME" |

    "ALREADY_CUSTOMER_QUESTION" |
    "BILLING_DETAILS" |
    "USER_DETAILS" |
    "SHIPPING_METHODS" |
    "PAYMENT_METHODS" |
    "NEW_ACCOUNT" |
    "NEW_ACCOUNT_CONFIRM" |
    "NEW_ACCOUNT_QUESTION" |

    "ACCOUNT_CONFIRM" |

    "ERROR" |
    "CONFIRM_ERROR" |
    "TOKEN_ERROR" |

    "ORDER_REVIEW" |

    "ORDER_PRODUCT" |
    "ORDER_PRICE" |
    "ORDER_QUANTITY" |
    "ORDER_TOTAL" |

    "SUBTOTAL" |
    "SHIPPING" |
    "TOTAL" |

    "PLACE_ORDER" |

    "FORM_FIRST_NAME" |
    "FORM_LAST_NAME" |
    "FORM_EMAIL" |
    "FORM_ADDRESS" |
    "FORM_CITY" |
    "FORM_COUNTRY" |
    "FORM_ZIP_CODE" |
    "FORM_TELEPHONE" |

    "FORM_VALUE_MISSING" |
    "FORM_EMAIL_MISMATCH" |

    "DESCRIPTION" |
    "DETAILS" |
    "REVIEWS" |
    "WRITE_YOUR_REVIEW" |
    "EMAIL_NOT_PUBLISHED" |
    "YOUR_NAME" |
    "EMAIL_ADDRESS" |
    "YOUR_REVIEW" |
    "YOUR_RATING" |
    "SUBMIT" |

    "REVIEWS_N" |
    "ADD_REVIEW" |
    "IN_STOCK" |
    "NOT_IN_STOCK" |
    "AVAILABLE" |
    "BRAND" |
    "SIZE" |
    "COLOR" |
    "QTY" |
    "OK" |
    "FILTER_BY_PRICE" |
    "FILTER_BY_COLOR" |
    "FILTER_BY_SIZE" |
    "FILTER_BY_BRAND" |
    "FILTER_BY_GENDER" |
    "TOP_RATED_PRODUCTS" |

    "CLEAR_ALL" |
    "SHOP_BY" |
    "KEYWORD_PLACEHOLDER" |
    "QUICK_VIEW" |
    "PAGE" |
    "SHOW" |
    "SORT_BY" |
    "PICKED_FOR_YOU" |
    "LATEST_PRODUCTS" |
    "NEW" |
    "ADD_TO_CART" |
    "SHOP_NOW" |
    "DEALS_OF_DAY" |

    "EMAIL_PLACEHOLDER" |
    "JOIN_NEWSLETTER" |

    "STAY_CONNECT" |

    "CUSTOMER_SERVICE" |
    "ABOUT_US" |
    "SHIP_N_RETURN" |
    "SHIP_GUIDE" |

    "VIEW_ALL" |
    "CATEGORIES" |

    "MY_CART" |
    "VIEW_CART" |

    "STORE" |
    "NEWSLETTER" |

    "MY_ACCOUNT" |
    "JOIN" |
    "MY_WISHLIST" |
    "COMPARE" |
    "CHECKOUT" |
    "LOGIN" |
    "LOGOUT" |

    "WELCOME" | "PAGE_NOT_FOUND" | "ALL_CATEGORIES" | "PRODUCTS";

type I18nValue = Record<I18nKey, string>;

export type I18nDescription = {
    caption: string;
    encode: I18nLocale;
    name: I18nLanguage;
    short: string;
    value: I18nValue;
}

export type I18nData = Record<I18nLanguage, I18nDescription>;

export const i18nData: I18nData = {
    "ukrainian": {
        caption: "Українська",
        encode: "uk-UA",
        name: "ukrainian",
        short: "UKR",
        value: {
            "RECOVER_PASSWORD": "Відновлення пароля",
            "SESSION_EXPIRED": "Сеанс завершився",

            "ERR_CONNECTION": "Помилка з'єднання",
            "ERR_UNAUTHORIZED": "Помилка авторизації",

            "REGISTER_LETTER_INFO": "На вказану електронну адресу буде надіслано електронний лист із запитом на підтвердження реєстрації.",
            "RECOVER_LETTER_INFO": "На вказану електронну адресу буде надіслано електронний лист із запитом на підтвердження відновлення паролю.",

            "ACCOUNT_EXISTS_QUESTION": "Обліковий запис вже створено?",

            "CHANGE_PASSWORD_QUESTION": "Змінити пароль?",

            "USER_OR_LOGIN_INVALID": "Користувач або пароль недійсні!",
            "USER_LOGIN": "Вхід Користувача",

            "USER_NEW": "Новий користувач",
            "USER_RECOVER": "Відновлення користувача",
            "USER_RECOVER_INFO": "Вкажіть нові значення автентифікації користувача",

            "USER_NEW_PASSWORD_INFO": "Вкажіть нове значення пароля для автентифікації користувача",
            "USER_NEW_PASSWORD": "Зміна паролю",

            "NEED_ACCOUNT_QUESTION": "Потрібен обліковий запис?",
            "SIGN_UP_HERE": "Зареєструйтеся тут",
            "FORGOT_QUESTION": "Забули свій пароль?",

            "JOI_W20": "Пароль має містити великі, малі латинські літери, спецсимволи та цифри",
            "JOI_EMPTY": "Значення не може бути порожнім",
            "JOI_EMAIL": "Помилковий формат адреси Email",
            "JOI_ZIP": "Помилковий формат поштового індексу",
            "JOI_PHONE": "Помилковий формат номера телефону",
            "JOI_PASSWORD": "Пароль має бути довжиною від 4 до 20 символів",
            "JOI_PASSWORD_CONFIRM": "Підтвердження паролю повинне співпадати із паролем",
            // "JOI_PASSWORD_REGEX": "Пароль має містити великі, малі латинські літери, спецсимволи та цифри",

            "ENTER_YOUR_PASSWORD": "Введіть ваш пароль",
            "ENTER_NEW_PASSWORD": "Введіть новий пароль",
            "ENTER_OLD_PASSWORD": "Введіть старий пароль",
            "REENTER_YOUR_PASSWORD": "Введіть повторно ваш пароль",
            "ENTER_PASSWORD_INFO": "Для того, щоб мати можливість авторизуватись необхідно вказати пароль",
            "RE_ENTER_PASSWORD_INFO": "Для зміни паролю необхідно вказати нове значення у наведених полях",

            "HOME": "Додому",

            "ALREADY_CUSTOMER_QUESTION": "Вже клієнт?",
            "BILLING_DETAILS": "Платіжні реквізити",
            "USER_DETAILS": "Інформація про користувача",
            "SHIPPING_METHODS": "Способи доставки",
            "PAYMENT_METHODS": "Способи оплати",
            "NEW_ACCOUNT": "Новий профіль",
            "NEW_ACCOUNT_CONFIRM": "Підтвердження нового профіля",
            "NEW_ACCOUNT_QUESTION": "Створити профіль?",
            "ORDER_REVIEW": "Огляд замовлення",

            "ACCOUNT_CONFIRM": "Підтвердження профіля",

            "ERROR": "Помилка",
            "CONFIRM_ERROR": "Помилка підтвердження",
            "TOKEN_ERROR": "Відсутній або помилковий токен",

            "ORDER_PRODUCT": "Товар",
            "ORDER_PRICE": "Ціна",
            "ORDER_QUANTITY": "Кількість",
            "ORDER_TOTAL": "Всього",

            "SUBTOTAL": "ПРОМІЖНИЙ ПІДСУМОК",
            "SHIPPING": "ДОСТАВКА",
            "TOTAL": "РАЗОМ",

            "PLACE_ORDER": "Зробити замовлення",

            "FORM_FIRST_NAME": "Ім'я",
            "FORM_LAST_NAME": "Прізвище",
            "FORM_EMAIL": "Email",
            "FORM_ADDRESS": "Адреса",
            "FORM_CITY": "Місто",
            "FORM_COUNTRY": "Країна",
            "FORM_ZIP_CODE": "Поштовий індекс",
            "FORM_TELEPHONE": "Телефон, напр. +380974443322",

            "FORM_VALUE_MISSING": "Будь ласка, заповніть це поле.",
            "FORM_EMAIL_MISMATCH": "Введіть адресу електронної пошти.",

            "DESCRIPTION": "Опис",
            "DETAILS": "Деталі",
            "REVIEWS": "Огляди",
            "WRITE_YOUR_REVIEW": "Напишіть ваш огляд",
            "EMAIL_NOT_PUBLISHED": "Вашу email адресу не буде опубліковано.",
            "YOUR_NAME": "Ваше ім'я",
            "EMAIL_ADDRESS": "Email адреса",
            "YOUR_REVIEW": "Ваш огляд",
            "YOUR_RATING": "Ваш рейтинг",
            "SUBMIT": "Надіслати",

            "REVIEWS_N": "огляд(и)",
            "ADD_REVIEW": "Додати огляд",
            "IN_STOCK": "В наявності",
            "NOT_IN_STOCK": "Очікується",

            "AVAILABLE": "Наявність",
            "BRAND": "Бренд",
            "SIZE": "Розмір",
            "COLOR": "Колір",
            "QTY": "К-сть",

            "OK": "Гаразд",

            "FILTER_BY_PRICE": "Ціна",
            "FILTER_BY_COLOR": "Колір",
            "FILTER_BY_SIZE": "Розмір",
            "FILTER_BY_BRAND": "Бренд",
            "FILTER_BY_GENDER": "Стать",
            "TOP_RATED_PRODUCTS": "Найвищий рейтинг",

            "CLEAR_ALL": "Очистити",
            "SHOP_BY": "Фільтр",
            "KEYWORD_PLACEHOLDER": "Введіть ключове слово",
            "QUICK_VIEW": "Перегляд",
            "PAGE": "Сторінка",
            "SHOW": "Показати",
            "SORT_BY": "Сортувати",
            "PICKED_FOR_YOU": "Підібрано для вас",
            "LATEST_PRODUCTS": "Найновіші товари",
            "NEW": "Нове",
            "ADD_TO_CART": "До кошика",
            "SHOP_NOW": "Перейти",

            "DEALS_OF_DAY": "Пропозиції дня",

            "EMAIL_PLACEHOLDER": "Вкажіть Email адресу",
            "JOIN_NEWSLETTER": "Підписатись",

            "STAY_CONNECT": "На зв'язку",

            "CUSTOMER_SERVICE": "Служба Підтримки",
            "ABOUT_US": "Про Нас",
            "SHIP_N_RETURN": "Доставка та Повернення",
            "SHIP_GUIDE": "Питання по доставці",

            "VIEW_ALL": "Перегляд усіх",

            "CATEGORIES": "Категорії",

            "MY_CART": "Кошик",
            "VIEW_CART": "Перегляд",

            "STORE": "Магазин",
            "NEWSLETTER": "Повідомлення",

            "MY_ACCOUNT": "Мій профіль",
            "JOIN": "Новий",
            "MY_WISHLIST": "Список бажань",
            "COMPARE": "Порівняти",
            "CHECKOUT": "Оформити",
            "LOGIN": "Вхід",
            "LOGOUT": "Вихід",

            "WELCOME": "Ласкаво просимо до E-shop!",
            "PAGE_NOT_FOUND": "Сторінку не знайдено",
            "ALL_CATEGORIES": "Усі Категорії",
            "PRODUCTS": "Товари",
        }
    },
    "english": {
        caption: "English",
        encode: "en-US",
        name: "english",
        short: "ENG",
        value: {
            "RECOVER_PASSWORD": "Password recover",
            "SESSION_EXPIRED": "The session has expired",
            "ERR_CONNECTION": "Connection Error",
            "ERR_UNAUTHORIZED": "Authorization Error",

            "REGISTER_LETTER_INFO": "An email will be sent to the specified email address with a request for confirmation of registration.",
            "RECOVER_LETTER_INFO": "An email will be sent to the specified email address with a request for confirmation of the password recover.",

            "ACCOUNT_EXISTS_QUESTION": "An account has already been created?",

            "CHANGE_PASSWORD_QUESTION": "Change Password?",

            "USER_OR_LOGIN_INVALID": "User or password are not valid!",
            "USER_LOGIN": "User Login",

            "USER_NEW": "New User",
            "USER_RECOVER": "User Recover",
            "USER_RECOVER_INFO": "Specify new user authentication data",

            "USER_NEW_PASSWORD_INFO": "Specify new user password for an authentication",
            "USER_NEW_PASSWORD": "New Password",

            "NEED_ACCOUNT_QUESTION": "Need an account?",
            "SIGN_UP_HERE": "Sign up here",
            "FORGOT_QUESTION": "Forgot your password?",

            "JOI_W20": "Password must contain uppercase and lowercase Latin letters, special characters and digits",
            "JOI_EMPTY": "Value is not allowed to be empty",
            "JOI_EMAIL": "Email address format mismatch",
            "JOI_ZIP": "Zip code format mismatch",
            "JOI_PHONE": "Phone number mismatch",
            "JOI_PASSWORD": "Password must be between 4 and 20 characters long",
            "JOI_PASSWORD_CONFIRM": "Password confirmation must match the password",
            // "JOI_PASSWORD_REGEX": "Password must contain uppercase and lowercase Latin letters, special characters and digits",

            "ENTER_YOUR_PASSWORD": "Enter Your Password",
            "ENTER_NEW_PASSWORD": "Enter New Password",
            "ENTER_OLD_PASSWORD": "Enter Old Password",
            "REENTER_YOUR_PASSWORD": "Reenter Your Password",
            "ENTER_PASSWORD_INFO": "In order to be able to log in, you need to enter a password",
            "RE_ENTER_PASSWORD_INFO": "To change the password, you must enter a new value in the given fields",

            "HOME": "Home",

            "ALREADY_CUSTOMER_QUESTION": "Already a customer?",
            "BILLING_DETAILS": "Billing Details",
            "USER_DETAILS": "User Details",
            "SHIPPING_METHODS": "Shipping Methods",
            "PAYMENT_METHODS": "Payments Methods",
            "NEW_ACCOUNT": "New Account",
            "NEW_ACCOUNT_CONFIRM": "New Account Confirmation",
            "NEW_ACCOUNT_QUESTION": "Create Account?",
            "ORDER_REVIEW": "Order Review",

            "ACCOUNT_CONFIRM": "Account Confirmation",

            "ERROR": "Error",
            "CONFIRM_ERROR": "Confirm Error",
            "TOKEN_ERROR": "Missing or invalid token",

            "ORDER_PRODUCT": "Product",
            "ORDER_PRICE": "Price",
            "ORDER_QUANTITY": "Quantity",
            "ORDER_TOTAL": "Total",

            "SUBTOTAL": "SUBTOTAL",
            "SHIPPING": "SHIPPING",
            "TOTAL": "TOTAL",

            "PLACE_ORDER": "Place Order",

            "FORM_FIRST_NAME": "First Name",
            "FORM_LAST_NAME": "Last Name",
            "FORM_EMAIL": "Email",
            "FORM_ADDRESS": "Address",
            "FORM_CITY": "City",
            "FORM_COUNTRY": "Country",
            "FORM_ZIP_CODE": "ZIP Code",
            "FORM_TELEPHONE": "Telephone, ex. +380974443322",

            "FORM_VALUE_MISSING": "Please fill in this field.",
            "FORM_EMAIL_MISMATCH": "Enter your email address.",

            "DESCRIPTION": "Description",
            "DETAILS": "Details",
            "REVIEWS": "Reviews",
            "WRITE_YOUR_REVIEW": "Write Your Review",
            "EMAIL_NOT_PUBLISHED": "Your email address will not be published.",
            "YOUR_NAME": "Your Name",
            "EMAIL_ADDRESS": "Email Address",
            "YOUR_REVIEW": "Your review",
            "YOUR_RATING": "Your Rating",
            "SUBMIT": "Submit",

            "REVIEWS_N": "Review(s)",
            "ADD_REVIEW": "Add Review",
            "IN_STOCK": "In Stock",
            "NOT_IN_STOCK": "Not In Stock",

            "AVAILABLE": "Availability",
            "BRAND": "Brand",
            "SIZE": "Size",
            "COLOR": "Color",
            "QTY": "QTY",

            "OK": "Ok",

            "FILTER_BY_PRICE": "Filter by Price",
            "FILTER_BY_COLOR": "Filter By Color",
            "FILTER_BY_SIZE": "Filter By Size",
            "FILTER_BY_BRAND": "Filter by Brand",
            "FILTER_BY_GENDER": "Filter by Gender",
            "TOP_RATED_PRODUCTS": "Top Rated Product",

            "CLEAR_ALL": "Clear All",
            "SHOP_BY": "Shop by",
            "KEYWORD_PLACEHOLDER": "Enter your keyword",
            "QUICK_VIEW": "Quick view",
            "PAGE": "Page",
            "SHOW": "Show",
            "SORT_BY": "Sort By",
            "PICKED_FOR_YOU": "Picked For You",
            "LATEST_PRODUCTS": "Latest Products",
            "NEW": "New",
            "ADD_TO_CART": "Add to Cart",
            "SHOP_NOW": "Shop Now",

            "DEALS_OF_DAY": "Deals Of The Day",

            "EMAIL_PLACEHOLDER": "Enter Email Address",
            "JOIN_NEWSLETTER": "Join Newslatter",

            "STAY_CONNECT": "Stay Connected",

            "CUSTOMER_SERVICE": "Customer Service",
            "ABOUT_US": "About Us",
            "SHIP_N_RETURN": "Shiping & Return",
            "SHIP_GUIDE": "Shiping Guide",

            "VIEW_ALL": "View All",

            "CATEGORIES": "Categories",

            "MY_CART": "My Cart",
            "VIEW_CART": "View Cart",

            "STORE": "Store",
            "NEWSLETTER": "Newsletter",

            "MY_ACCOUNT": "My Account",
            "JOIN": "Join",
            "MY_WISHLIST": "My Wishlist",
            "COMPARE": "Compare",
            "CHECKOUT": "Checkout",
            "LOGIN": "Login",
            "LOGOUT": "Logout",


            "WELCOME": "Welcome to E-shop!",
            "PAGE_NOT_FOUND": "Page not found",
            "ALL_CATEGORIES": "All Categories",
            "PRODUCTS": "Products",
        }
    }
}
