import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: [
    {
      emit: 'stdout',
      level: 'query'
    },
  ],
});

async function test1() {
    await prisma.user.create({
        data: {
            name: 'guang',
            email: '111@gaung.com'
        }
    });

    await prisma.user.create({
        data: {
            name: 'dong',
            email: '222@dong.com'
        }
    });

    const users = await prisma.user.findMany();
    console.log(users);
}

// test1();

async function test2() {
    const user = await prisma.user.create({
        data: {
            name: '东东东',
            email: 'dongdong@dong.com',
            posts: {
                create: [
                    {
                        title: 'aaa',
                        content: 'aaaa'
                    },
                    {
                        title: 'bbb',
                        content: 'bbbb'
                    }
                ]
            },
        },
    })
    console.log(user)
}

// test2();

async function test3() {
    await prisma.post.update({
        where: {
            id: 2
        },
        data: {
            content: 'xxx'
        }
    })
}
// test3();

async function test4() {
    await prisma.post.delete({
        where: {
            id: 2
        }
    });
}
test4();
