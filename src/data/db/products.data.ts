import {ProductDbType} from "../../interface";
import imagesData from "../db/images.data";

export const productsData: Array<ProductDbType> = [
    {
        id: "1",
        category: "12",
        collection: "1",
        brand: "1",
        gender: "1",
        name: {"en-US": "Product Name Goes Here", "uk-UA": "Тут вказується назва продукту"},
        price: 45.00,
        sale: 20.0,
        saleStop: "2023-02-03T17:46:00.924Z",
        rating: 8,
        isNew: true,
        image: {
            column: imagesData.product01,
            detail: [
                {main: imagesData.mainProduct01, thumb: imagesData.thumbProduct01},
                {main: imagesData.mainProduct02, thumb: imagesData.thumbProduct02},
                {main: imagesData.mainProduct03, thumb: imagesData.thumbProduct03},
                {main: imagesData.mainProduct04, thumb: imagesData.thumbProduct04},
            ]
        },
        description: {
            "en-US": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "uk-UA": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        details: {
            "en-US": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "uk-UA": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        createdAt: "2023-02-03T17:46:00.924Z",
        changedAt: "2023-02-03T17:46:00.924Z",
    },
    {
        id: "2",
        category: "12",
        collection: "2",
        brand: "2",
        gender: "2",
        name: {"en-US": "Product Name Goes Here", "uk-UA": "Тут вказується назва продукту"},
        price: 45.00,
        sale: 20.0,
        saleStop: "2023-02-03T17:46:00.924Z",
        rating: 8,
        isNew: false,
        image: {
            column: imagesData.product02,
            detail: [
                {main: imagesData.mainProduct01, thumb: imagesData.thumbProduct01},
                {main: imagesData.mainProduct02, thumb: imagesData.thumbProduct02},
                {main: imagesData.mainProduct03, thumb: imagesData.thumbProduct03},
                {main: imagesData.mainProduct04, thumb: imagesData.thumbProduct04},
            ]
        },
        description: {
            "en-US": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "uk-UA": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        details: {
            "en-US": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "uk-UA": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        createdAt: "2023-02-03T17:46:00.924Z",
        changedAt: "2023-02-03T17:46:00.924Z",
    },
    {
        id: "3",
        category: "12",
        collection: null,
        brand: "3",
        gender: null,
        name: {"en-US": "Product Name Goes Here", "uk-UA": "Тут вказується назва продукту"},
        price: 45.00,
        sale: 20.0,
        saleStop: "2023-02-03T17:46:00.924Z",
        rating: 8,
        isNew: true,
        image: {
            column: imagesData.product03,
            detail: [
                {main: imagesData.mainProduct01, thumb: imagesData.thumbProduct01},
                {main: imagesData.mainProduct02, thumb: imagesData.thumbProduct02},
                {main: imagesData.mainProduct03, thumb: imagesData.thumbProduct03},
                {main: imagesData.mainProduct04, thumb: imagesData.thumbProduct04},
            ]
        },
        description: {
            "en-US": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "uk-UA": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        details: {
            "en-US": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "uk-UA": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        createdAt: "2023-02-03T17:46:00.924Z",
        changedAt: "2023-02-03T17:46:00.924Z",
    },
    {
        id: "4",
        category: "12",
        collection: null,
        brand: "4",
        gender: "1",
        name: {"en-US": "Product Name Goes Here", "uk-UA": "Тут вказується назва продукту"},
        price: 45.00,
        sale: 20.0,
        saleStop: "2023-02-13T17:46:00.924Z",
        rating: 8,
        isNew: true,
        image: {
            column: imagesData.product04,
            detail: [
                {main: imagesData.mainProduct01, thumb: imagesData.thumbProduct01},
                {main: imagesData.mainProduct02, thumb: imagesData.thumbProduct02},
                {main: imagesData.mainProduct03, thumb: imagesData.thumbProduct03},
                {main: imagesData.mainProduct04, thumb: imagesData.thumbProduct04},
            ]
        },
        description: {
            "en-US": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "uk-UA": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        details: {
            "en-US": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "uk-UA": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        createdAt: "2023-02-03T17:46:00.924Z",
        changedAt: "2023-02-03T17:46:00.924Z",
    },
    {
        id: "5",
        category: "12",
        collection: null,
        brand: "1",
        gender: "2",
        name: {"en-US": "Product Name Goes Here", "uk-UA": "Тут вказується назва продукту"},
        price: 45.00,
        sale: 20.0,
        saleStop: "2023-02-03T17:46:00.924Z",
        rating: 8,
        isNew: false,
        image: {
            column: imagesData.product05,
            detail: [
                {main: imagesData.mainProduct01, thumb: imagesData.thumbProduct01},
                {main: imagesData.mainProduct02, thumb: imagesData.thumbProduct02},
                {main: imagesData.mainProduct03, thumb: imagesData.thumbProduct03},
                {main: imagesData.mainProduct04, thumb: imagesData.thumbProduct04},
            ]
        },
        description: {
            "en-US": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "uk-UA": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        details: {
            "en-US": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "uk-UA": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        createdAt: "2023-02-03T17:46:00.924Z",
        changedAt: "2023-02-03T17:46:00.924Z",
    },
    {
        id: "6",
        category: "12",
        collection: null,
        brand: "2",
        gender: null,
        name: {"en-US": "Product Name Goes Here", "uk-UA": "Тут вказується назва продукту"},
        price: 32.50,
        sale: 0,
        saleStop: null,
        rating: 5,
        isNew: false,
        image: {
            column: imagesData.product06,
            detail: [
                {main: imagesData.mainProduct01, thumb: imagesData.thumbProduct01},
                {main: imagesData.mainProduct02, thumb: imagesData.thumbProduct02},
                {main: imagesData.mainProduct03, thumb: imagesData.thumbProduct03},
                {main: imagesData.mainProduct04, thumb: imagesData.thumbProduct04},
            ]
        },
        description: {
            "en-US": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "uk-UA": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        details: {
            "en-US": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "uk-UA": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        createdAt: "2023-02-03T17:46:00.924Z",
        changedAt: "2023-02-03T17:46:00.924Z",
    },
    {
        id: "7",
        category: "12",
        collection: null,
        brand: "3",
        gender: "1",
        name: {"en-US": "Product Name Goes Here", "uk-UA": "Тут вказується назва продукту"},
        price: 45.00,
        sale: 20,
        saleStop: null,
        rating: 5.4,
        isNew: false,
        image: {
            column: imagesData.product07,
            detail: [
                {main: imagesData.mainProduct01, thumb: imagesData.thumbProduct01},
                {main: imagesData.mainProduct02, thumb: imagesData.thumbProduct02},
                {main: imagesData.mainProduct03, thumb: imagesData.thumbProduct03},
                {main: imagesData.mainProduct04, thumb: imagesData.thumbProduct04},
            ]
        },
        description: {
            "en-US": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "uk-UA": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        details: {
            "en-US": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "uk-UA": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        createdAt: "2023-02-03T17:46:00.924Z",
        changedAt: "2023-02-03T17:46:00.924Z",
    },
    {
        id: "8",
        category: "12",
        collection: null,
        brand: "4",
        gender: "2",
        name: {"en-US": "Product Name Goes Here", "uk-UA": "Тут вказується назва продукту"},
        price: 32.50,
        sale: 0,
        saleStop: null,
        rating: 5.4,
        isNew: false,
        image: {
            column: imagesData.product08,
            detail: [
                {main: imagesData.mainProduct01, thumb: imagesData.thumbProduct01},
                {main: imagesData.mainProduct02, thumb: imagesData.thumbProduct02},
                {main: imagesData.mainProduct03, thumb: imagesData.thumbProduct03},
                {main: imagesData.mainProduct04, thumb: imagesData.thumbProduct04},
            ]
        },
        description: {
            "en-US": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "uk-UA": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        details: {
            "en-US": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "uk-UA": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        createdAt: "2023-02-03T17:46:00.924Z",
        changedAt: "2023-02-03T17:46:00.924Z",
    },
    {
        id: "9",
        category: "12",
        collection: null,
        brand: "1",
        gender: null,
        name: {"en-US": "Product Name Goes Here", "uk-UA": "Тут вказується назва продукту"},
        price: 32.50,
        sale: 0,
        saleStop: null,
        rating: 7.4,
        isNew: true,
        image: {
            column: imagesData.product08,
            detail: [
                {main: imagesData.mainProduct01, thumb: imagesData.thumbProduct01},
                {main: imagesData.mainProduct02, thumb: imagesData.thumbProduct02},
                {main: imagesData.mainProduct03, thumb: imagesData.thumbProduct03},
                {main: imagesData.mainProduct04, thumb: imagesData.thumbProduct04},
            ]
        },
        description: {
            "en-US": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "uk-UA": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        details: {
            "en-US": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "uk-UA": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        createdAt: "2023-02-03T17:46:00.924Z",
        changedAt: "2023-02-03T17:46:00.924Z",
    },
];