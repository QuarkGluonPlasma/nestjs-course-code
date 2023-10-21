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
   await prisma.department.create({
        data: {
            name: '技术部',
            employees: {
                create: [
                    {
                        name: '小张',
                        phone: '13333333333'
                    },
                    {
                        name: '小李',
                        phone: '13222222222'
                    }
                ]
            }
        }
   })
}

// test1();

async function test2() {
    await prisma.department.create({
         data: {
             name: '技术部',
             employees: {
                 createMany: {
                    data: [
                        {
                            name: '小王',
                            phone: '13333333333'
                        },
                        {
                            name: '小周',
                            phone: '13222222222'
                        }
                    ],

                 }
             }
         }
    })
 }

//  test2();

async function test3() {
    const res1 = await prisma.department.findUnique({
        where: {
            id: 1
        },
        include: {
            employees: true
        }
    });
    console.log(res1);

    const res2 = await prisma.department.findUnique({
        where: {
            id: 1
        },
        include: {
            employees: {
                where: {
                    name: '小张'
                },
                select: {
                    name: true
                }
            }
        }
    });
    console.log(res2);

    const res3 = await prisma.department.findUnique({
        where: {
            id: 1
        }
    }).employees();
    console.log(res3);
}

// test3();

async function test4() {
    const res1 = await prisma.department.update({
        where: {
            id: 1
        },
        data: {
            name: '销售部',
            employees: {
                create: [
                    {
                        name: '小刘',
                        phone: '13266666666'
                    }
                ]
            }
        }
    });
    console.log(res1);
}

// test4();

async function test5() {
    const res1 = await prisma.department.update({
        where: {
            id: 1
        },
        data: {
            name: '销售部',
            employees: {
                connect: [
                    {
                        id: 4
                    }
                ]
            }
        }
    });
    console.log(res1);
}
// test5();

async function test6() {
    const res1 = await prisma.department.update({
        where: {
            id: 1
        },
        data: {
            name: '销售部',
            employees: {
                connectOrCreate: {
                    where: {
                        id: 6
                    },
                    create: {
                        id: 6,
                        name: '小张',
                        phone: '13256665555'
                    }
                }
            }
        }
    });
    console.log(res1);
}
// test6();

async function test7() {
    await prisma.employee.deleteMany({
        where: {
            department: {
                id: 1
            }
        },
    });
}
// test7();

async function test8() {
    await prisma.$executeRaw`TRUNCATE TABLE Employee`;

    const res = await prisma.$queryRaw`select * from Department`;
    console.log(res);
}
test8();

