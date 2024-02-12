import {UriEnum} from "../enum";
import { UriHeaderType } from "../interface";
import {apiConfig} from "../configs";

const rootUri = process.env.REACT_APP_ROOT_URI || "";

export const uriName: { [key in UriEnum]: string } = {
    [UriEnum.account]: rootUri + "/account",
    [UriEnum.cart]: rootUri + "/cart",
    [UriEnum.checkout]: rootUri + "/checkout",
    [UriEnum.collections]: rootUri + "/collections",
    [UriEnum.recover]: rootUri + "/recover",
    [UriEnum.home]: rootUri + "/home",
    [UriEnum.details]: rootUri + "/details",
    [UriEnum.login]: rootUri + "/login",
    [UriEnum.password]: rootUri + "/password",
    [UriEnum.products]: rootUri + "/products",
    [UriEnum.register]: rootUri + "/register",
    [UriEnum.sales]: rootUri + "/products?sale=1",
    [UriEnum.shop]: rootUri + "/products",
}

export const uriService = {
    uriAccount(): string {
        return uriName[UriEnum.account];
    },
    uriCart(): string {
        return uriName[UriEnum.cart];
    },
    uriCheckout(): string {
        return uriName[UriEnum.checkout];
    },
    uriCategoryBanner(name: string): string {
        return apiConfig.config.baseURL + apiConfig.uri.categoryBanners(name);
    },
    uriCollectionBanner(name: string): string {
        return apiConfig.config.baseURL + apiConfig.uri.collectionBanners(name);
    },
    uriPassword(): string {
        return uriName[UriEnum.password];
    },
    uriRecover(): string {
        return uriName[UriEnum.recover];
    },
    uriHome(): string {
        return uriName[UriEnum.home];
    },
    uriLogin(expSession: boolean = false): string {
        return uriName[UriEnum.login] + (expSession ? "?expSession=true" : "");
    },
    uriProductByUid(Uid: string, tab?: string): string {
        return uriName[UriEnum.products] + "/" + Uid + (tab ? "/" + tab : "");
    },
    uriProducts(): string {
        return uriName[UriEnum.products];
    },
    uriProductImage(name: string): string {
        return apiConfig.config.baseURL + apiConfig.uri.productImages(name);
    },
    uriProductsByCategoryId(categoryId?: string | number): string {
        return categoryId ? uriName[UriEnum.products] + "?category=" + categoryId : ".";
    },
    uriProductsByParentCategoryId(categoryId: string | number): string {
        return uriName[UriEnum.products] + "?parent-category=" + categoryId;
    },
    uriProductsByCollectionId(collectionId: string | number): string {
        return uriName[UriEnum.products] + "?collection=" + collectionId;
    },
    uriProductsSearch(categoryId: string, searchText: string): string {
        const uri = uriName[UriEnum.products];
        const searchParams = new URLSearchParams();

        if (categoryId) searchParams.set("category", categoryId.toString());
        if (searchText) searchParams.set("query", searchText);

        const uriParams = searchParams.toString();
        // console.log(uri + "?" + uriParams);

        return uri + "?" + uriParams;
    },
    uriShop(): string {
        return uriName[UriEnum.products];
    },
    uriRegister(): string {
        return uriName[UriEnum.register];
    },
    uriSales(): string {
        return uriName[UriEnum.sales];
    },
}

export const uriHeader: UriHeaderType[] = [
    {
        id: 1,
        name: {"en-US": "Home", "uk-UA": "Додому"},
        category: null,
        items: [],
        uri: uriService.uriHome(),
    },
    {
        id: 2,
        name: {"en-US": "Shop", "uk-UA": "Магазин"},
        category: null,
        items: [],
        uri: uriService.uriShop(),
    },
    {
        id: 3,
        name: {"en-US": "Women", "uk-UA": "Жінки"},
        category: 1,
        items: [],
        uri: null,
    },
    {
        id: 4,
        name: {"en-US": "Men", "uk-UA": "Чоловіки"},
        category: 2,
        items: [],
        uri: null,
    },
    {
        id: 5,
        name: {"en-US": "Sales", "uk-UA": "Розпродаж"},
        category: null,
        items: [],
        uri: uriService.uriSales(),
    },
    // {
    //     id: 6,
    //     name: {"en-US": "Pages", "uk-UA": "Сторінки"},
    //     category: null,
    //     items: [
    //         {
    //             id: 7,
    //             name: {"en-US": "Home", "uk-UA": "Додому"},
    //             category: null,
    //             items: [],
    //             uri: uriService.uriHome(),
    //         },
    //         {
    //             id: 8,
    //             name: {"en-US": "Products", "uk-UA": "Товари"},
    //             category: null,
    //             items: [],
    //             uri: uriService.uriProducts(),
    //         },
    //         {
    //             id: 9,
    //             name: {"en-US": "Product details", "uk-UA": "Деталі товару"},
    //             category: null,
    //             items: [],
    //             uri: uriService.uriProductByUid("1"),
    //         },
    //         {
    //             id: 10,
    //             name: {"en-US": "Checkout", "uk-UA": "Оформити"},
    //             category: null,
    //             items: [],
    //             uri: uriService.uriCheckout(),
    //         },
    //     ],
    //     uri: null,
    // },
];
