import {I18nEncode, I18nLanguage} from "../../interface";

/*
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
*/

type I18nKey =
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
    "CREATE_ACCOUNT" |

    "WELCOME" | "PAGE_NOT_FOUND" | "ALL_CATEGORIES" | "PRODUCTS";

type I18nValue = Record<I18nKey, string>;

export type I18nDescription = {
    caption: string;
    encode: I18nEncode;
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
            "CREATE_ACCOUNT": "Новий профіль",

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
            "CREATE_ACCOUNT": "Create An Account",


            "WELCOME": "Welcome to E-shop!",
            "PAGE_NOT_FOUND": "Page not found",
            "ALL_CATEGORIES": "All Categories",
            "PRODUCTS": "Products",
        }
    }
}
