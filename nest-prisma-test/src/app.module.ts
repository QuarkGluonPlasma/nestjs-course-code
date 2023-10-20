import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { DepartmentService } from './department.service';
import { EmployeeService } from './employee.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, DepartmentService, EmployeeService],
})
export class AppModule {}
