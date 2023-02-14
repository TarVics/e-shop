import {ProductListQueryType, ProductListType, ProductType} from "../interface";
import {productsData} from "../data";
import {PageLimitEnum} from "../enum";

export const productsService = {
    async loadProducts(params: ProductListQueryType): Promise<ProductListType> {
        // const results: Array<ProductType> = productsData.map(item => {
        //     return {...item,
        //         name: item.name[params.encode],
        //         image: {
        //             column: item.image.column,
        //             detail: [...item.image.detail]
        //         },
        //         description: item.description[params.encode],
        //         details: item.details[params.encode],
        //     }
        // });

        const pageLimit = params.show === PageLimitEnum.limit30 ? 30 :
            params.show === PageLimitEnum.limit20 ? 20 : 10;
        const total_results = 200;
        const total_pages = Math.ceil(total_results / pageLimit);
        const page = params.page > total_pages ? total_pages :
            params.page < 1 ? 1 : params.page;

        const results: Array<ProductType> = [];

        const startPos = (page - 1) * pageLimit;
        const endPos = Math.min(startPos + pageLimit, total_results);

        for (let i = startPos; i < endPos; i++) {
            const item = productsData[i % 9];
            results.push({
                ...item,
                id: String(i + 1),
                name: item.name[params.encode],
                image: {
                    column: item.image.column,
                    detail: [...item.image.detail]
                },
                description: item.description[params.encode],
                details: item.details[params.encode],
            });
        }

        console.log({
            page,
            results,
            total_pages,
            total_results,
        });

        return {
            page,
            results,
            total_pages,
            total_results,
        };
    }
}