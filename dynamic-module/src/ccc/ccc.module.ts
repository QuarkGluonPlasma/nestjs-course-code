import { Module} from '@nestjs/common';
import { CccController } from './ccc.controller';
import { ConfigurableModuleClass } from './ccc.module-definition';

@Module({
  controllers: [CccController]
})
export class CccModule extends ConfigurableModuleClass{}
