import { IsNotEmpty, IsNumber, MinLength } from "class-validator";

export class XxxDto {
    @IsNotEmpty()
    @MinLength(4)
    xxx: string;

    @IsNotEmpty()
    @IsNumber()
    yyy: number;
}
