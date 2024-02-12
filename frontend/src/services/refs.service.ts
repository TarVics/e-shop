import { AsyncAxiosResponse, axiosService } from "./axios.service";
import { apiConfig } from "../configs";
// import axios, { AxiosRequestConfig } from "axios";

import {
    ApiKey,
    ApiObject,
    // BrandType,
    // CategoryTreeType,
    // CategoryType,
    // CollectionType,
    // ColorType,
    CurrencyType,
    // GenderType,
    I18nLocale,
    // PaymentMethodType,
    RefsType,
    // ShippingMethodType, SizeType
} from "../interface";
// import {
//     brandsData, // +
//     categoriesData,
//     collectionsData,
//     colorsData,
//     currenciesData,
//     gendersData,  // +
//     paymentMethods,
//     shippingMethods,
//     sizesData // +
// } from "../data";

interface RefsServiceType {
    load: (encode: I18nLocale) => AsyncAxiosResponse<RefsType>;
    getItemById<T extends ApiObject>(items: Array<T>, id: ApiKey): T | null;
    // getCategoryTree: (categories: Array<CategoryType>) => Array<CategoryTreeType>;
    getCurrencyPrice: (currency: CurrencyType | null, price: number) => number;
    getCurrencyText: (currency: CurrencyType | null, price: number) => string;
}

export const refsService: RefsServiceType = {

    // async load(encode: I18nLocale): Promise<RefsType> {
    load(encode: I18nLocale): AsyncAxiosResponse<RefsType> {
        // const brands: Array<BrandType> = brandsData.map(item => ({...item,
        //     name: item.name[encode],
        // }));
        //
        // const collections: Array<CollectionType> = collectionsData.map(item => ({...item,
        //     name: item.name[encode],
        //     description: item.description ? item.description[encode] : null,
        // }));
        //
        // const categories: Array<CategoryType> = categoriesData.map(item => {
        //     const banner = item.banner ?
        //         {
        //             ...item.banner,
        //             name: item.banner.name ? item.banner.name[encode] : null
        //         } : null;
        //
        //     return {...item,
        //         name: item.name[encode],
        //         children: [],
        //         banner,
        //     }
        // });
        //
        // categories.forEach(item => {
        //    if (item.parent) {
        //        const parent = categories.find(value => value.id === item.parent);
        //        if (parent) parent.children?.push(item.id);
        //    }
        // });
        //
        // const colors: Array<ColorType> = colorsData.map(item => ({...item,
        //     name: item.name[encode],
        // }));
        //
        // const currencies: Array<CurrencyType> = currenciesData.map(item => ({...item,
        //     tail: item.tail ? item.tail[encode] : null,
        // }));
        //
        // const genders: Array<GenderType> = gendersData.map(item => ({...item,
        //     name: item.name[encode],
        // }));
        //
        // const sizes: Array<SizeType> = sizesData.map(item => ({...item,
        //     name: item.name[encode],
        // }));
        //
        // const payments: Array<PaymentMethodType> = paymentMethods.map(item => {
        //     return {...item,
        //         name: item.name[encode],
        //         info: item.info[encode],
        //     };
        // });
        //
        // const shipping: Array<ShippingMethodType> = shippingMethods.map(item => {
        //     return {...item,
        //         name: item.name[encode],
        //         info: item.info[encode],
        //     };
        // });
        //
        // return {
        //     brands,
        //     categories,
        //     collections,
        //     colors,
        //     currencies,
        //     genders,
        //     payments,
        //     shipping,
        //     sizes,
        // }

        // const refs = await axiosService.get(apiConfig.uri.refs + '?lang=' + encode);
        return axiosService.get(apiConfig.uri.refs + '?lang=' + encode);
    },

    getItemById<T extends ApiObject>(items: Array<T>, id: ApiKey): T | null {
        return items.find(item => item.id === id) || null;
    },

    // getCategoryTree(categories: Array<CategoryType>): Array<CategoryTreeType> {
    //     console.log(categories);
    //     const tree: Array<CategoryTreeType> = categories.map(item => (
    //         {
    //             ...item,
    //             parentCategory: null,
    //             childCategories: []
    //         }
    //     ));
    //
    //     tree.forEach(category => {
    //         if (category.parent) {
    //             category.parentCategory = tree.find(item => item.id === category.parent) || null;
    //             if (category.parentCategory) category.parentCategory.childCategories.push(category);
    //         }
    //     });
    //
    //     return tree.filter(item => item.parent === null);
    // },

    getCurrencyPrice: function (currency: CurrencyType | null, price: number): number {
        return currency ? (price / currency.rate) : price;
    },

    getCurrencyText: function (currency: CurrencyType | null, price: number): string {
        if (currency) {
            const text = (price / currency.rate).toFixed(2);
            return currency.tail ? text + ' ' + currency.tail : currency.sign + text;
        } else {
            return price.toFixed(2);
        }
    },

}
