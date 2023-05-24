import { applyDecorators, Controller, SetMetadata } from '@nestjs/common';

export const Ddd = (path, metadata) => {
    return applyDecorators(
        Controller(path),
        SetMetadata('ddd', metadata)
      )
};

