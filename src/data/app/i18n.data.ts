import {I18nEncode, I18nLanguage} from "../../interface";

type I18nKey = "AUTHOR" | "BACKWARD" | "BUDGET" | "COMPANIES" | "COUNTRIES" | "FORWARD" | "GENRES" |
    "ID" | "LANGUAGES" | "PAGE_NOT_FOUND" | "SEARCH" | "SEARCH_PLACEHOLDER" | "THEME" |
    "ALL_CATEGORIES" | "PRODUCTS";

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
            "AUTHOR": "Віктор Таран",
            "BACKWARD": "Назад",
            "BUDGET": 'Бюджет',
            "COMPANIES": 'Компанії',
            "COUNTRIES": 'Країни',
            "FORWARD": "Вперед",
            "GENRES": "Жанри",
            "ID": 'id',
            "LANGUAGES": 'Мови',
            "PAGE_NOT_FOUND": "Сторінку не знайдено",
            "SEARCH": "Пошук",
            "SEARCH_PLACEHOLDER": "Введіть текст для пошуку...",
            "THEME": 'Перемикання теми',

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
            "AUTHOR": "Victor Taran",
            "BACKWARD": "Backward",
            "BUDGET": "Budget",
            "COMPANIES": "Companies",
            "COUNTRIES": "Countries",
            "FORWARD": "Forward",
            "GENRES": "Жанри",
            "ID": "id",
            "LANGUAGES": "Languages",
            "PAGE_NOT_FOUND": "Page not found",
            "SEARCH": "Search",
            "SEARCH_PLACEHOLDER": "Enter text for search...",
            "THEME": "Theme switch",
            "ALL_CATEGORIES": "All Categories",
            "PRODUCTS": "Products",
        }
    }
}
