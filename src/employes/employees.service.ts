import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ILike, Repository } from 'typeorm';
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
        this.handleException(error.detail);
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
    let employees: Employee[];
    if (isUUID(term)) {
      const employee = await this.employeeRepository.findOneBy({
        id: term,
      });
      employees.push(employee); //TODO
    } else {
      employees = await this.employeeRepository.find({
        where: [
          {name: ILike(`%${term}%`)},
          {surname: ILike(`%${term}%`)},
          {identityNumber: ILike(`%${term}%`)},
          {phoneNumber: ILike(`%${term}%`)}
        ]
      });
    }
    console.log(employees);
    
    if (!employees || employees.length === 0) { //TODO
      this.handleException(`The employee with term \"${term}\" not found`);
    }

    return employees;
  }

  async update(id: string, updateEmployeDto: UpdateEmployeeDto) {
    const employee = await this.employeeRepository.findOneBy({
      id: id,
    });

    if (!employee) {
      this.handleException(`The employee with id ${id} not found`);
    }
    // No deja modificar el atributo active
    if (updateEmployeDto.isActive) {
      updateEmployeDto.isActive = employee.isActive;
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
    if (!employee) {
      this.handleException(`The employee with id ${id} not found`);
    }
    if (employee.isActive) {
      employee.isActive = !employee.isActive;
    }

    return await this.employeeRepository.save(employee);
  }

  async activateEmployee(id: string) {
    const employee = await this.employeeRepository.findOneBy({
      id: id,
    });

    employee.isActive = true;

    return this.employeeRepository.save(employee);
  }

  private handleException(message: any) {
    this.logger.error(message);
    throw new BadRequestException(message);
  }
}
