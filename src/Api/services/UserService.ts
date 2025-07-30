import { USER_ENDPOINTS } from '../endpoints/User';

export async function loginService(credentials: { email: string; password: string }) {
    const res = await fetch(USER_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    return await res.json();
}
export async function registerService(client: any) {
    const res = await fetch(USER_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client),
    });
    return await res.json();
}
