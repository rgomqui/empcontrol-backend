import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { CreateEmployeeDto } from './dto/create-employe.dto';
import { UpdateEmployeeDto } from './dto/update-employe.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployesService {
  private readonly logger = new Logger('EmployeesService');
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}
  async create(createEmployeDto: CreateEmployeeDto) {
    return await this.employeeRepository
      .save(createEmployeDto)
      .catch((error) => {
        console.log(error);

        this.logger.error(error.detail);

        throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
      });
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;
    return await this.employeeRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(term: string) {
    if (isUUID(term)) {
      return await this.employeeRepository.findOneBy({
        id: term,
      });
    }
    return 'no es uuid';
  }

  async update(id: string, updateEmployeDto: UpdateEmployeeDto) {
    const employee = await this.employeeRepository.findOneBy({
      id: id,
    });

    if (!employee) {
      throw new NotFoundException(`The employee with id ${id} not found`);
    }
    await this.employeeRepository.update(id, updateEmployeDto);
    return this.employeeRepository.findOneBy({
      id: id,
    });
  }

  async remove(id: string) {
    const employee = await this.employeeRepository.findOneBy({
      id: id,
    });

    if (employee.isActive) {
      employee.isActive = !employee.isActive;
    }

    return await this.employeeRepository.save(employee);
  }
}
