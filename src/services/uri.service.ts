import {UriEnum} from "../enum";
import {UriHeaderType} from "../interface";

const rootUri = process.env.REACT_APP_ROOT_URI || "";

export const uriName: { [key in UriEnum]: string } = {
    [UriEnum.checkout]: rootUri + "/checkout",
    [UriEnum.collections]: rootUri + "/collections",
    [UriEnum.home]: rootUri + "/home",
    [UriEnum.details]: rootUri + "/details",
    [UriEnum.products]: rootUri + "/products",
    [UriEnum.sales]: rootUri + "/sales",
    [UriEnum.shop]: rootUri + "/products",
}

export const uriService = {
    uriCheckout(): string {
        return uriName[UriEnum.checkout];
    },
    uriHome(): string {
        return uriName[UriEnum.home];
    },
    uriProductById(Id: string): string {
        return uriName[UriEnum.products] + "/" + Id;
    },
    uriProducts(): string {
        return uriName[UriEnum.products];
    },
    uriProductsByCategoryId(categoryId: string): string {
        return uriName[UriEnum.products] + "?category=" + categoryId;
    },
    uriProductsByParentCategoryId(categoryId: string): string {
        return uriName[UriEnum.products] + "?parent-category=" + categoryId;
    },
    uriProductsByCollectionId(collectionId: string): string {
        return uriName[UriEnum.products] + "?collection=" + collectionId;
    },
    uriProductsSearch(categoryId: string, searchText: string): string {
        const uri = uriName[UriEnum.products];
        const searchParams = new URLSearchParams();

        if (categoryId) searchParams.set("category", categoryId);
        if (searchText) searchParams.set("search", searchText);

        const uriParams = searchParams.toString();
        console.log(uri + "?" + uriParams);

        return uri + "?" + uriParams;
    },
    uriShop(): string {
        return uriName[UriEnum.products];
    },
    uriSales(): string {
        return uriName[UriEnum.sales];
    },
}

export const uriHeader: UriHeaderType[] = [
    {
        id: "1",
        name: {"en-US": "Home", "uk-UA": "Додому"},
        category: null,
        items: [],
        uri: uriService.uriHome(),
    },
    {
        id: "2",
        name: {"en-US": "Shop", "uk-UA": "Магазин"},
        category: null,
        items: [],
        uri: uriService.uriShop(),
    },
    {
        id: "3",
        name: {"en-US": "Women", "uk-UA": "Жінки"},
        category: "1",
        items: [],
        uri: null,
    },
    {
        id: "4",
        name: {"en-US": "Men", "uk-UA": "Чоловіки"},
        category: "2",
        items: [],
        uri: null,
    },
    {
        id: "5",
        name: {"en-US": "Sales", "uk-UA": "Розпродаж"},
        category: null,
        items: [],
        uri: uriService.uriSales(),
    },
    {
        id: "6",
        name: {"en-US": "Pages", "uk-UA": "Сторінки"},
        category: null,
        items: [
            {
                id: "7",
                name: {"en-US": "Home", "uk-UA": "Додому"},
                category: null,
                items: [],
                uri: uriService.uriHome(),
            },
            {
                id: "8",
                name: {"en-US": "Products", "uk-UA": "Товари"},
                category: null,
                items: [],
                uri: uriService.uriProducts(),
            },
            {
                id: "9",
                name: {"en-US": "Product details", "uk-UA": "Деталі товару"},
                category: null,
                items: [],
                uri: uriService.uriProductById("1"),
            },
            {
                id: "10",
                name: {"en-US": "Checkout", "uk-UA": "Оформити"},
                category: null,
                items: [],
                uri: uriService.uriCheckout(),
            },
        ],
        uri: null,
    },
];