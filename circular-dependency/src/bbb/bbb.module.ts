import { forwardRef, Module } from '@nestjs/common';
import { AaaModule } from 'src/aaa/aaa.module';

@Module({
    imports: [
        forwardRef(() => AaaModule)
    ]
})
export class BbbModule {}
