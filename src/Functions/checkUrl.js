export function checkUrl(url) {
    if (url.indexOf('items?categoryId=') !== -1 && url.indexOf('&offset=') !== -1) return 'categoryProductsOffsetRequest';
    if (url.indexOf(`${process.env.REACT_APP_API_URL}/items?q=`) !== -1) return 'productsSearchRequest';
    if (url.indexOf(`${process.env.REACT_APP_API_URL}/items?categoryId=`) !== -1) return 'categoryRequest';
    if (url.indexOf(`${process.env.REACT_APP_API_URL}/items?offset=`) !== -1) return 'allProductsOffsetRequest';
    if (url.indexOf(`${process.env.REACT_APP_API_URL}/items`) !== -1) return 'allProductsRequest';
}