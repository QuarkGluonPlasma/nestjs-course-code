import { PartialType } from '@nestjs/mapped-types';
import { CreateAaaDto } from './create-aaa.dto';

export class UpdateAaaDto extends PartialType(CreateAaaDto) {}
