import { applyDecorators } from '@nestjs/common';
import { Validate, ValidationOptions } from 'class-validator';
import { MyValidator } from './my-validator';

export function MyContains(content: string, options?: ValidationOptions) {
  return applyDecorators(
     Validate(MyValidator, [content], options)
  )
}