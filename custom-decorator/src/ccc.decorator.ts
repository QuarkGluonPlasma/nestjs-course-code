import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Ccc = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    return 'ccc';
  },
);