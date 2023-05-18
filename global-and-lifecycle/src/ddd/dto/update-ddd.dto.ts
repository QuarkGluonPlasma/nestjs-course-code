import { PartialType } from '@nestjs/mapped-types';
import { CreateDddDto } from './create-ddd.dto';

export class UpdateDddDto extends PartialType(CreateDddDto) {}
