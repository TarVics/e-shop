import {I18nEncode, ProductDbType, ProductType, SummaryType} from "../interface";
import {summaryData, productsData} from "../data";

export const summaryService = {

    async loadSummary(encode: I18nEncode): Promise<SummaryType> {

        // Обираємо товари з максимальною знижкою. Найбільша "HOT" знижка буде у позиції 0
        const sortBySale = (a: ProductDbType, b: ProductDbType) => (b.sale || 0) - (a.sale || 0);
        const deals: Array<ProductDbType> = productsData.sort(sortBySale).slice(0, 9);
        const deals2: Array<ProductDbType> = [deals[0]];
        deals.splice(0, 1);
        productsData.forEach(item => {
            if (~deals.findIndex(value => value.id === item.id)) {
                deals2.push(item);
            }
        });

        const dealsProducts: Array<ProductType> = deals2.map((item, index) => {

            return {...item,
                isHot: index === 0,
                name: item.name[encode],
                description: item.description[encode],
                details: item.details[encode],
            }
        });

        // Обираємо товари, які були додані пізніше всього
        const sortByDate = (a: ProductDbType, b: ProductDbType) =>
            a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0;
        const latest = productsData.sort(sortByDate).slice(0, 7);
        const latest2 = productsData.filter(item => ~latest.findIndex(value => value.id === item.id));
        const latestProducts: Array<ProductType> = latest2.map(item => {
            return {...item,
                name: item.name[encode],
                description: item.description[encode],
                details: item.details[encode],
            }
        });

        // Обираємо товари, які мають найбільший рейтинг
        const sortByRating = (a: ProductDbType, b: ProductDbType) => (b.rating || 0) - (a.rating || 0);
        const picked: Array<ProductDbType> = productsData.sort(sortByRating).slice(0, 4);
        const picked2 = productsData.filter(item => ~picked.findIndex(value => value.id === item.id));
        const pickedProducts: Array<ProductType> = picked2.map(item => {
            return {...item,
                name: item.name[encode],
                description: item.description[encode],
                details: item.details[encode],
            }
        });

        return {...summaryData,
            home: {
                collectionLarge: [...summaryData.home.collectionLarge],
                collectionNormal: [...summaryData.home.collectionNormal],
            },
            deals: {
                collectionColumn: summaryData.deals.collectionColumn,
                products: dealsProducts,
            },
            hot: {
                collectionLarge: summaryData.hot.collectionLarge,
                collectionNormal: [...summaryData.hot.collectionNormal],
            },
            latest: {
                collectionColumn: summaryData.latest.collectionColumn,
                products: latestProducts,
            },
            picked: pickedProducts,
        }
    }
}