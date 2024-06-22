import { DataSource } from "typeorm";
import { config } from 'dotenv';

import { Permission } from './user/entities/permission.entity';
import { Role } from './user/entities/role.entity';
import { User } from './user/entities/user.entity';
import { MeetingRoom } from './meeting-room/entities/meeting-room.entity';
import { Booking } from "./booking/entities/booking.entity";

config({ path: 'src/.env-migration' });

// console.log(process.env);

export default new DataSource({
    type: "mysql",
    host: `${process.env.mysql_server_host}`,
    port: +`${process.env.mysql_server_port}`,
    username: `${process.env.mysql_server_username}`,
    password: `${process.env.mysql_server_password}`,
    database: `${process.env.mysql_server_database}`,
    synchronize: false,
    logging: true,
    entities: [
      User, Role, Permission, MeetingRoom, Booking
    ],
    poolSize: 10,
    migrations: ['src/migrations/**.ts'],
    connectorPackage: 'mysql2',
    extra: {
        authPlugin: 'sha256_password',
    }
});
