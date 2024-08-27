import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { RegisterUser } from "../pages/Register";
import { UpdatePassword } from "../pages/UpdatePassword";
import { message } from "antd";
import { ExamAdd } from "../pages/ExamList/ExamAddModal";

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

export async function updatePasswordCaptcha(email: string) {
    return await userServiceInstance.get('/user/update_password/captcha', {
        params: {
            address: email
        }
    });
}

export async function updatePassword(data: UpdatePassword) {
    return await userServiceInstance.post('/user/update_password', data);
}

const examServiceInstance = axios.create({
    baseURL: 'http://localhost:3002/',
    timeout: 3000
});

const requestInterceptor = function (config: InternalAxiosRequestConfig) {
    const accessToken = localStorage.getItem('token');

    if(accessToken) {
        config.headers.authorization = 'Bearer ' + accessToken;
    }
    return config;
}

examServiceInstance.interceptors.request.use(requestInterceptor)

const responseIntercepor = (response: AxiosResponse) => {
    const newToken = response.headers['token'];
    if(newToken) {
        localStorage.setItem('token', newToken);
    }
    return response;
}

const responseErrorIntercepor = async (error: any) => {
    if(!error.response) {
        return Promise.reject(error);
    }
    let { data } = error.response;
    if (data.statusCode === 401) {
        message.error(data.message);

        setTimeout(() => {
            window.location.href = '/login';
        }, 1500);
    } else {
        return Promise.reject(error);
    }
}

examServiceInstance.interceptors.response.use(
    responseIntercepor, 
    responseErrorIntercepor
)

export async function examList() {
    return await examServiceInstance.get('/exam/list');
}

export async function examAdd(values: ExamAdd) {
    return await examServiceInstance.post('/exam/add', values);
}

export async function examPublish(id: number) {
    return await examServiceInstance.get('/exam/publish/' + id );
}

export async function examUnpublish(id: number) {
    return await examServiceInstance.get('/exam/unpublish/' + id );
}

export async function examDelete(id: number) {
    return await examServiceInstance.delete('/exam/delete/' + id );
}

export async function examFind(id: number) {
    return await examServiceInstance.get('/exam/find/' + id );
}

export async function examSave(data: { id: number, content: string}) {
    return await examServiceInstance.post('/exam/save', data);
}

const answerServiceInstance = axios.create({
    baseURL: 'http://localhost:3003/',
    timeout: 3000
});

answerServiceInstance.interceptors.request.use(requestInterceptor)

answerServiceInstance.interceptors.response.use(
    responseIntercepor, 
    responseErrorIntercepor
)

export async function answerAdd(data: { examId: number, content: string}) {
    return await answerServiceInstance.post('/answer/add', data);
}

export async function answerFind(id: number) {
    return await answerServiceInstance.get('/answer/find/' + id);
}

export async function answerExport(examId: number) {
    return await answerServiceInstance.get('/answer/export', {
        params: {
            examId
        }
    });
}

const analyseServiceInstance = axios.create({
    baseURL: 'http://localhost:3004/',
    timeout: 3000
});

analyseServiceInstance.interceptors.request.use(requestInterceptor)

analyseServiceInstance.interceptors.response.use(
    responseIntercepor, 
    responseErrorIntercepor
)

export async function ranking(examId: number) {
    return await analyseServiceInstance.get('/analyse/ranking', {
        params: {
            examId
        }
    });
}
