import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class AaaPipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value, metadata);
    return 'aaa';
  }
}
