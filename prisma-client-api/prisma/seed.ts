import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: [
    {
      emit: 'stdout',
      level: 'query'
    },
  ],
});

async function main() {
    await prisma.aaa.createMany({
        data: [
            {
                name: 'aaa',
                email: 'aaa@xx.com'
            },
            {
                name: 'bbb',
                email: 'bbb@xx.com'
            },
            {
                name: 'ccc',
                email: 'ccc@xx.com'
            },
            {
                name: 'ddd',
                email: 'ddd@xx.com'
            },
            {
                name: 'eee',
                email: 'eee@xx.com'
            },
        ]
    });
    console.log('done');
}

main();