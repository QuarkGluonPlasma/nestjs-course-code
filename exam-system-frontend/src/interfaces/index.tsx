import axios from "axios";
import { RegisterUser } from "../pages/Register";

const userServiceInstance = axios.create({
    baseURL: 'http://localhost:3001/',
    timeout: 3000
});

export async function login(username: string, password: string) {
    return await userServiceInstance.post('/user/login', {
        username, password
    });
}

export async function registerCaptcha(email: string) {
    return await userServiceInstance.get('/user/register-captcha', {
        params: {
            address: email
        }
    });
}

export async function register(registerUser: RegisterUser) {
    return await userServiceInstance.post('/user/register', registerUser);
}