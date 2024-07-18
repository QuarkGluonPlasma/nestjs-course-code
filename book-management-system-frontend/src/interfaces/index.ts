import axios from "axios";
import { CreateBook } from "../pages/BookManage/CreateBookModal";
import { UpdateBook } from "../pages/BookManage/UpdateBookModal";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 3000
});

export async function register(username: string, password: string) {
    return await axiosInstance.post('/user/register', {
        username, password
    });
}

export async function login(username: string, password: string) {
    return await axiosInstance.post('/user/login', {
        username, password
    });
}

export async function list(name: string) {
    return await axiosInstance.get('/book/list', {
        params: {
            name
        }
    });
}

export async function create(book: CreateBook) {
    return await axiosInstance.post('/book/create', {
        name: book.name,
        author: book.author,
        description: book.description,
        cover: book.cover
    });
}

export async function detail(id: number) {
    return await axiosInstance.get(`/book/${id}`);
}

export async function update(book: UpdateBook) {
    return await axiosInstance.put('/book/update', {
        id: book.id,
        name: book.name,
        author: book.author,
        description: book.description,
        cover: book.cover
    });
}

export async function deleteBook(id: number) {
    return await axiosInstance.delete(`/book/delete/${id}`);
}