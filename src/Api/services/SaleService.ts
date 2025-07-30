import { SALE_ENDPOINTS } from '../endpoints/Sale';

export async function getSales(params?: Record<string, any>) {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    const res = await fetch(SALE_ENDPOINTS.LIST + query);
    return await res.json();
}

export async function getSaleById(id: number) {
    const res = await fetch(SALE_ENDPOINTS.DETAIL.replace(':id', String(id)));
    return await res.json();
}

export async function createSale(sale: any) {
    const res = await fetch(SALE_ENDPOINTS.CREATE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sale),
    });
    return await res.json();
}

export async function updateSale(id: number, sale: any) {
    const res = await fetch(SALE_ENDPOINTS.UPDATE.replace(':id', String(id)), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sale),
    });
    return await res.json();
}

export async function deleteSale(id: number) {
    const res = await fetch(SALE_ENDPOINTS.DELETE.replace(':id', String(id)), {
        method: 'DELETE'
    });
    return await res.json();
}
