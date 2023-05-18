import { PartialType } from '@nestjs/mapped-types';
import { CreateBbbDto } from './create-bbb.dto';

export class UpdateBbbDto extends PartialType(CreateBbbDto) {}
