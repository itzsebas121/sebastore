import { CART_ENDPOINTS } from '../endpoints/Cart';

export async function getCarts(params?: Record<string, any>) {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    const res = await fetch(CART_ENDPOINTS.LIST + query);
    return await res.json();
}

export async function getCartById(id: number) {
    const res = await fetch(CART_ENDPOINTS.DETAIL.replace(':id', String(id)));
    return await res.json();
}

export async function createCart(cart: any) {
    const res = await fetch(CART_ENDPOINTS.CREATE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cart),
    });
    return await res.json();
}

export async function updateCart(id: number, cart: any) {
    const res = await fetch(CART_ENDPOINTS.UPDATE.replace(':id', String(id)), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cart),
    });
    return await res.json();
}

export async function deleteCart(id: number) {
    const res = await fetch(CART_ENDPOINTS.DELETE.replace(':id', String(id)), {
        method: 'DELETE'
    });
    return await res.json();
}
