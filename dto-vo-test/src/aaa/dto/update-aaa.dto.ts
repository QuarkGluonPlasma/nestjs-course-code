import { IntersectionType, OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { CreateAaaDto } from "./create-aaa.dto";
import { XxxDto } from './xxx.dto';

export class UpdateAaaDto extends IntersectionType(
    PickType(CreateAaaDto, ['name', 'age']), 
    PartialType(OmitType(XxxDto, ['yyy']))
) {

}