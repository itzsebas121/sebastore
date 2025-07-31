import { USER_ENDPOINTS } from '../endpoints/User';

export async function loginService(credentials: { Email: string; Password: string }) {
    const res = await fetch(USER_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    return await res.json();
}
export async function registerService(client: any) {
    const clientData = {
        Email: client.correo,
        Password: client.contrasena,
        FirstName: client.nombre,
        LastName: client.apellido,
        Phone: client.telefono,
    };
    const res = await fetch(USER_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData),
    });
    return await res.json();
}
