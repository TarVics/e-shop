import {
    BrandType, CategoryTreeType,
    CategoryType,
    CollectionType,
    ColorType,
    CurrencyType,
    GenderType,
    I18nEncode,
    RefsType, SizeType
} from "../interface";
import {brandsData, categoriesData, collectionsData, colorsData, currenciesData, gendersData, sizesData} from "../data";

interface RefsServiceType {
    load: (encode: I18nEncode) => Promise<RefsType>;
    getCategoryById: (categories: Array<CategoryType>, id: string) => CategoryType | null;
    getCategoryTree(categories: Array<CategoryType>): Array<CategoryTreeType>;
    getCollectionById: (collections: Array<CollectionType>, id: string) => CollectionType | null;
    getCurrencyPrice: (currency: CurrencyType | null, price: number) => number;
    getCurrencyText: (currency: CurrencyType | null, price: number) => string;
}

export const refsService: RefsServiceType = {

    async load(encode: I18nEncode): Promise<RefsType> {
        const brands: Array<BrandType> = brandsData.map(item => ({...item}));

        const collections: Array<CollectionType> = collectionsData.map(item => {
            return {...item,
                name: item.name[encode],
                description: item.description ? item.description[encode] : null,
            };
        });

        const categories: Array<CategoryType> = categoriesData.map(item => {
            const banner = item.banner ?
                {
                    ...item.banner,
                    name: item.banner.name ? item.banner.name[encode] : null
                } : null;

            return {...item,
                name: item.name[encode],
                children: [],
                banner,
            }
        });

        categories.forEach(item => {
           if (item.parent) {
               const parent = categories.find(value => value.id === item.parent);
               if (parent) parent.children?.push(item.id);
           }
        });

        const colors: Array<ColorType> = colorsData.map(item => {
            return {...item,
                name: item.name[encode],
            };
        });

        const currencies: Array<CurrencyType> = currenciesData.map(item => {
            return {...item,
                tail: item.tail ? item.tail[encode] : null,
            };
        });

        const genders: Array<GenderType> = gendersData.map(item => {
            return {...item,
                name: item.name[encode],
            };
        });

        const sizes: Array<SizeType> = sizesData.map(item => ({...item}));

        return {
            brands,
            categories,
            collections,
            colors,
            currencies,
            genders,
            sizes,
        }
    },

    getCategoryById(categories: Array<CategoryType>, id: string): CategoryType | null {
        return categories.find(item => item.id === id) || null;
    },

    getCategoryTree(categories: Array<CategoryType>): Array<CategoryTreeType> {
        const tree: Array<CategoryTreeType> = categories.map(item => (
            {
                ...item,
                parentCategory: null,
                childCategories: []
            }
        ));

        tree.forEach(category => {
            if (category.parent) {
                category.parentCategory = tree.find(item => item.id === category.parent) || null;
                if (category.parentCategory) category.parentCategory.childCategories.push(category);
            }
        });

        return tree.filter(item => item.parent === null);
    },

    getCollectionById(collections: Array<CollectionType>, id: string): CollectionType | null {
        return collections.find(item => item.id === id) || null;
    },

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