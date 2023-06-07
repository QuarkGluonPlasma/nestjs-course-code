import { AppDataSource } from "./data-source"
import { Article } from "./entity/Article"
import { Tag } from "./entity/Tag";

AppDataSource.initialize().then(async () => {

    const a1 = new Article();
    a1.title = 'aaaa';
    a1.content = 'aaaaaaaaaa';

    const a2 = new Article();
    a2.title = 'bbbbbb';
    a2.content = 'bbbbbbbbbb';

    const t1 = new Tag();
    t1.name = 'ttt1111';

    const t2 = new Tag();
    t2.name = 'ttt2222';

    const t3 = new Tag();
    t3.name = 'ttt33333';

    a1.tags = [t1,t2];
    a2.tags = [t1,t2,t3];

    const entityManager = AppDataSource.manager;

    // await entityManager.save(t1);
    // await entityManager.save(t2);
    // await entityManager.save(t3);

    // await entityManager.save(a1);
    // await entityManager.save(a2);

    
    // const article = await entityManager.find(Article, {
    //     relations: {
    //         tags: true
    //     }
    // });

    // console.log(article);
    // console.log(article.map(item=> item.tags))



    // const article = await entityManager
    //     .createQueryBuilder(Article, "a")
    //     .leftJoinAndSelect("a.tags", "t")
    //     .getMany()
    // console.log(article);
    // console.log(article.map(item=> item.tags))

    // const article = await entityManager
    //     .getRepository(Article)
    //     .createQueryBuilder( "a")
    //     .leftJoinAndSelect("a.tags", "t")
    //     .getMany()
    // console.log(article);
    // console.log(article.map(item=> item.tags))



    // const article = await entityManager.findOne(Article, {
    //     where: {
    //         id: 2
    //     },
    //     relations: {
    //         tags: true
    //     }
    // });

    // article.title = "ccccc";
    // article.tags = article.tags.filter(item => item.name.includes('ttt111'));

    // await entityManager.save(article);


    const tags = await entityManager.find(Tag, {
        relations: {
            articles: true
        }
    });

    console.log(tags);

}).catch(error => console.log(error))