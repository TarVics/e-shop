// export type UriType = 'products' | 'collections';
// const rootUri = process.env.REACT_APP_ROOT_URI;
// export const UriName: { [key in UriType]: string } = {
//     'products': rootUri + '/products',
//     'collections': rootUri + '/collections',
// }
//

export enum UriEnum {
    checkout = 'CHECKOUT',
    collections = 'COLLECTIONS',
    home = 'HOME',
    details = 'DETAILS',
    products = 'PRODUCTS',
    sales = 'SALES',
    shop = 'SHOP',
}

