import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { EmployesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employe.dto';
import { UpdateEmployeeDto } from './dto/update-employe.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('employees')
export class EmployesController {
  constructor(private readonly employesService: EmployesService) {}

  @Post()
  create(@Body() createEmployeDto: CreateEmployeeDto) {
    return this.employesService.create(createEmployeDto);
  }

  @Get()
  findAll(@Body() paginationDto: PaginationDto) {
    return this.employesService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term')  term: string) {
    return this.employesService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateEmployeDto: UpdateEmployeeDto) {
    return this.employesService.update(id, updateEmployeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.employesService.remove(id);
  }
}
