import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Permission } from './user/entities/permission.entity';
import { Role } from './user/entities/role.entity';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { RedisModule } from './redis/redis.module';
import { EmailModule } from './email/email.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuard } from './login.guard';
import { PermissionGuard } from './permission.guard';
import { MeetingRoomModule } from './meeting-room/meeting-room.module';
import { MeetingRoom } from './meeting-room/entities/meeting-room.entity';
import { BookingModule } from './booking/booking.module';
import { Booking } from './booking/entities/booking.entity';
import { StatisticModule } from './statistic/statistic.module';
import { MinioModule } from './minio/minio.module';
import { AuthModule } from './auth/auth.module';
import * as path from 'path';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonLogger, WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import { CustomTypeOrmLogger } from './CustomTypeOrmLogger';
import 'winston-daily-rotate-file';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('jwt_secret'),
          signOptions: {
            expiresIn: '30m' // 默认 30 分钟
          }
        }
      },
      inject: [ConfigService]
    }),
    UserModule, 
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [ path.join(__dirname, '.env'), path.join(__dirname, '.dev.env')]
    }),
    TypeOrmModule.forRootAsync({
      useFactory(configService: ConfigService, logger: WinstonLogger) {
        return {
          type: "mysql",
          host: configService.get('mysql_server_host'),
          port: configService.get('mysql_server_port'),
          username: configService.get('mysql_server_username'),
          password: configService.get('mysql_server_password'),
          database: configService.get('mysql_server_database'),
          synchronize: false,
          logging: true,
          logger: new CustomTypeOrmLogger(logger),
          entities: [
            User, Role, Permission, MeetingRoom, Booking
          ],
          poolSize: 10,
          connectorPackage: 'mysql2',
          extra: {
              authPlugin: 'sha256_password',
          }
        }
      },
      inject: [ConfigService, WINSTON_MODULE_NEST_PROVIDER]
    }),
    WinstonModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        level: 'debug',
        transports: [
          // new winston.transports.File({
          //   filename: `${process.cwd()}/log`,
          // }),
          new winston.transports.DailyRotateFile({
              level: configService.get('winston_log_level'),
              dirname: configService.get('winston_log_dirname'),
              filename: configService.get('winston_log_filename'),
              datePattern: configService.get('winston_log_date_pattern'),
              maxSize: configService.get('winston_log_max_size')
          }),
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              utilities.format.nestLike(),
            ),
          }),
          new winston.transports.Http({
              host: 'localhost',
              port: 3002,
              path: '/log'
          })
        ],
      }),
      inject: [ConfigService]
    }),
    RedisModule, EmailModule, MeetingRoomModule, BookingModule, StatisticModule, MinioModule, AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: LoginGuard
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard
    }
  ]
})
export class AppModule {}
