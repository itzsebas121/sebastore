
import { PRODUCT_ENDPOINTS } from '../endpoints/Product';
import { GetProductsParams } from '../../Types/Product';

export async function getProductsService({ NameFilter, CategoryId, MinPrice, MaxPrice, PageNumber = 1, PageSize = 20 }: GetProductsParams) {
    const queryParams = new URLSearchParams();

    if (NameFilter) queryParams.append('NameFilter', NameFilter);
    if (CategoryId) queryParams.append('CategoryId', String(CategoryId));
    if (MinPrice) queryParams.append('MinPrice', String(MinPrice));
    if (MaxPrice) queryParams.append('MaxPrice', String(MaxPrice));
    queryParams.append('PageNumber', String(PageNumber));
    queryParams.append('PageSize', String(PageSize));

    const res = await fetch(`${PRODUCT_ENDPOINTS.LIST}?${queryParams.toString()}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }

    return await res.json();
}
