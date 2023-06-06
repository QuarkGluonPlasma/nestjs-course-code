import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { User } from './entity/User';
 
@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
 
 listenTo() {
 return User;
 }
 
 beforeInsert(event: InsertEvent<User>) {
    console.log(`Before user inserted: `, event.entity);
 }
 
 afterInsert(event: InsertEvent<User>) {
    console.log(`After user inserted: `, event.entity);
 }
}