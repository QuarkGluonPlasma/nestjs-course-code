import { AppDataSource } from "./data-source"
import { IdCard } from "./entity/IdCard"
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {

    // const user = new User();
    // user.firstName = 'guang';
    // user.lastName = 'guang';
    // user.age = 20;
    
    // const idCard = new IdCard();
    // idCard.cardName = '1111111';
    // idCard.user = user;
    
    // await AppDataSource.manager.save(user);
    // await AppDataSource.manager.save(idCard);



    // const ics = await AppDataSource.manager.find(IdCard, {});
    // console.log(ics);




    // const ics = await AppDataSource.manager.find(IdCard, {
    //     relations: {
    //         user: true
    //     }
    // });
    // console.log(ics);




    // const ics = await AppDataSource.manager.getRepository(IdCard)
    //     .createQueryBuilder("ic")
    //     .leftJoinAndSelect("ic.user", "u")
    //     .getMany();

    // console.log(ics);



    // const ics = await AppDataSource.manager.createQueryBuilder(IdCard, "ic")
    //     .leftJoinAndSelect("ic.user", "u")
    //     .getMany();
    // console.log(ics);



    // const user = new User();
    // user.id = 1;
    // user.firstName = 'guang1111';
    // user.lastName = 'guang1111';
    // user.age = 20;
    
    // const idCard = new IdCard();
    // idCard.id = 1;
    // idCard.cardName = '22222';
    // idCard.user = user;
    
    // await AppDataSource.manager.save(idCard);



    // await AppDataSource.manager.delete(User, 1)

    
    // const idCard = await AppDataSource.manager.findOne(IdCard, {
    //     where: {
    //         id: 1
    //     },
    //     relations: {
    //         user: true
    //     }
    // })
    // await AppDataSource.manager.delete(User, idCard.user.id)
    // await AppDataSource.manager.delete(IdCard, idCard.id)


    const user = await AppDataSource.manager.find(User, {
        relations: {
            idCard: true
        }
    });
    console.log(user);

}).catch(error => console.log(error))
