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
    const aaa = await prisma.aaa.findUnique({
        where: {
            id: 1
        }
    });
    console.log(aaa);

    const bbb = await prisma.aaa.findUnique({
        where: {
            email: 'bbb@xx.com'
        },
        select: {
            id: true,
            email: true
        }
    });
    console.log(bbb);
}

async function test2() {
    const aaa = await prisma.aaa.findUniqueOrThrow({
        where: {
            id: 10
        }
    });
    console.log(aaa);
}

async function test3() {
    const res = await prisma.aaa.findMany({
        where: {
            email: {
                contains: 'xx'
            }
        },
        select: {
            id: true,
            email: true,
        },
        orderBy: {
            name: 'desc'
        },
        skip: 2,
        take: 3
    });
    console.log(res);
}

async  function test4() {
    const res = await prisma.aaa.findFirst({
        where: {
            email: {
                contains: '',
                endsWith: '',
                equals: '',
                gt: '',
                gte: '',
                in: [''],
                lt: '',
                lte: '',
                not: '',
                notIn: [''],
                startsWith: '',
            }
        },
        select: {
            id: true,
            email: true,
        },
        orderBy: {
            name: 'desc'
        },
        skip: 2,
        take: 3
    });
    console.log(res);
}

async  function test5() {
    const res = await prisma.aaa.create({
        data: {
            name: 'kk',
            email: 'kk@xx.com'
        },
        select: {
            email: true
        }
    });
    console.log(res);
}

async function test6() {
    const res = await prisma.aaa.update({
        where: { id: 3 },
        data: { email: '3333@xx.com' },
        select: {
            id: true,
            email: true
        }
    });
    console.log(res);
}

// test6();

async function test7() {
    const res = await prisma.aaa.updateMany({
        where: { 
            email: {
                contains: 'xx.com'
            } 
        },
        data: { name: '666' },
    });
    console.log(res);
}

// test7();

async function test8() {
    const res = await prisma.aaa.upsert({
        where: { id: 11 },
        update: { email: 'yy@xx.com' },
        create: { 
            id:  11,
            name: 'xxx',
            email: 'xxx@xx.com'
        },
    });
    console.log(res);
}

// test8();

async function test9() {
    await prisma.aaa.delete({
        where: { id: 1 },
    });

    await prisma.aaa.deleteMany({
        where: {
            id: {
                in: [11, 2]
            }
        }
    });
}

// test9();

async function test10() {
    const res = await prisma.aaa.count({
        where: {
            email: {
                contains: 'xx'
            }
        },
        orderBy: {
            name: 'desc'
        },
        skip: 2,
        take: 3
    });
    console.log(res);
}
// test10();

async function test11() {
    await prisma.aaa.update({
        where: {
            id: 3
        },
        data: {
            age: 3
        }
    });

    await prisma.aaa.update({
        where: {
            id: 5
        },
        data: {
            age: 5
        }
    });
}
// test11();

async function test12() {
    const res = await prisma.aaa.aggregate({
        where: {
            email: {
                contains: 'xx.com'
            }
        },
        _count: {
            _all: true,
        },
        _max: {
            age: true
        },
        _min: {
            age: true
        },
        _avg: {
            age: true
        }
    });
    console.log(res);
}
// test12();

async function test13() {
    const res = await prisma.aaa.groupBy({
        by: ['email'],
        _count: {
          _all: true
        },
        _sum: {
          age: true,
        },
        having: {
          age: {
            _avg: {
              gt: 2,
            }
          },
        },
    })
    console.log(res);
}

test13();
