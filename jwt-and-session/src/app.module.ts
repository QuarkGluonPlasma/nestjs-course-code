import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // JwtModule.register({
    //   secret: 'guang',
    //   signOptions: {
    //     expiresIn: '7d'
    //   }
    // })
    JwtModule.registerAsync({
      async useFactory() {
        await 111;
        return {
          secret: 'guang',
          signOptions: {
            expiresIn: '7d'
          }
        }
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
