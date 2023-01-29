import { Test, TestingModule } from '@nestjs/testing';
import { EmployesController } from './employees.controller';
import { EmployesService } from './employees.service';

describe('EmployesController', () => {
  let controller: EmployesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployesController],
      providers: [EmployesService],
    }).compile();

    controller = module.get<EmployesController>(EmployesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
