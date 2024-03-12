import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateDogDto {

    @IsString()
    @IsNotEmpty()
    @Length(30)
    name: string;

    @IsNumber()
    @IsNotEmpty()
    age: number;
  
    tags: string[];
}
