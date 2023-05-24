import { PartialType } from '@nestjs/mapped-types';
import { CreateCccDto } from './create-ccc.dto';

export class UpdateCccDto extends PartialType(CreateCccDto) {}
