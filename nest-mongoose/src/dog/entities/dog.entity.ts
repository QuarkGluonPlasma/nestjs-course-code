import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Dog {
    @Prop()
    name: string;

    @Prop()
    age: number;

    @Prop([String])
    tags: string[];
}

export type DogDocument = HydratedDocument<Dog>;

export const DogSchema = SchemaFactory.createForClass(Dog);
