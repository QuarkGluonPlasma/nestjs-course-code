import { SetMetadata } from '@nestjs/common';

export const Aaa = (...args: string[]) => SetMetadata('aaa', args);

