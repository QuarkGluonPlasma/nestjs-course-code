import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Optional, Inject } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MyValidationPipe implements PipeTransform<any> {

    @Optional()
    @Inject('validation_options') 
    private options;

    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype) {
            return value;
        }
        console.log(this.options)
        const object = plainToInstance(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            throw new BadRequestException('参数验证失败');
        }
        return value;
    }
}