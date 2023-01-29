import { Module } from '@nestjs/common';
import { EmployesService } from './employees.service';
import { EmployesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';

@Module({
  controllers: [EmployesController],
  providers: [EmployesService],
  imports: [
    TypeOrmModule.forFeature([ Employee ]),
  ],
})
export class EmployesModule {}
