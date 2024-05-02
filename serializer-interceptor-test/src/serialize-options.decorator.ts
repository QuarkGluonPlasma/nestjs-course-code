import { SetMetadata } from '@nestjs/common';
import { ClassTransformOptions } from 'class-transformer';

export const CLASS_SERIALIZER_OPTIONS = 'class_serializer:options';

export const SerializeOptions = (options: ClassTransformOptions) =>
    SetMetadata(CLASS_SERIALIZER_OPTIONS, options);