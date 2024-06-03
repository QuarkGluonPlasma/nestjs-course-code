import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    private readonly users = [
        {
            userId: 1,
            username: '神说要有光',
            password: 'guang',
        },
        {
            userId: 2,
            username: '东东东',
            password: 'dong',
        },
    ];

    async findOne(username: string) {
        return this.users.find(user => user.username === username);
    }
}
