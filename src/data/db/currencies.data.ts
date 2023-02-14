import {CurrencyDbType} from "../../interface";

export const currenciesData: Array<CurrencyDbType> = [
    {
        id: '1',
        name: "UAH",
        sign: "₴",
        tail: {"en-US": "", "uk-UA": "грн"},
        rate: 1.0,
        createdAt: "2023-02-03T17:46:00.924Z",
        changedAt: "2023-02-03T17:46:00.924Z",
    },
    {
        id: '2',
        name: "USD",
        sign: "$",
        tail: null,
        rate: 36.5686,
        createdAt: "2023-02-03T17:46:00.924Z",
        changedAt: "2023-02-03T17:46:00.924Z",
    },
    {
        id: '3',
        name: "EUR",
        sign: "€",
        tail: null,
        rate: 39.8323,
        createdAt: "2023-02-03T17:46:00.924Z",
        changedAt: "2023-02-03T17:46:00.924Z",
    },
];