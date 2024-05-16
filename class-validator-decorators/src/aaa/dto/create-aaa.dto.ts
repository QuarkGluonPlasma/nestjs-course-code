import { ArrayContains, ArrayMaxSize, ArrayMinSize, ArrayNotContains, ArrayUnique, Contains, IsAlphanumeric, IsArray, IsBoolean, IsDate, IsDateString, IsDefined, IsDivisibleBy, IsEmail, IsEnum, IsHexColor, IsIn, IsInstance, IsJSON, IsNotEmpty, IsNotIn, IsOptional, IsPositive, IsString, Length, Max, MaxDate, MaxLength, Min, MinDate, MinLength, Validate, ValidateIf, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { MyContains } from "src/my-contain.decorator";
import { MyValidator } from "src/my-validator";

export class CreateAaaDto {

    @IsNotEmpty({message: 'aaa 不能为空'})
    @IsString({message: 'aaa 必须是字符串'})
    @IsEmail({}, {message: 'aaa 必须是邮箱'})
    @IsNotIn(['aaa@aa.com', 'bbb@bb.com'])
    aaa: string;


    @IsArray()
    @ArrayNotContains(['aaa'])
    @ArrayMinSize(2)
    @ArrayMaxSize(5)
    @ArrayUnique()
    bbb:string;

    @IsDefined()
    // @IsNotEmpty()
    ccc: string;

    @IsPositive()
    @Min(1)
    @Max(10)
    @IsDivisibleBy(2)
    ddd:number;

    @IsDateString()
    eee: string;

    @IsAlphanumeric()
    @Contains('aaa')
    fff: string;

    @MinLength(2)
    @MaxLength(6)
    // @Length(2, 6)
    ggg: string;

    @IsBoolean()
    hhh: boolean;

    @ValidateIf(o => o.hhh === true)
    @IsNotEmpty()
    @IsHexColor()
    iii: string;

    // @Validate(MyValidator, [11, 22], {
    //     message: 'jjj 校验失败',
    // })
    @MyContains('111', {
        message: 'jjj 必须包含 111'
    })
    jjj: string;
}

