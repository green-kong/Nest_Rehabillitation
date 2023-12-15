import { Test, TestingModule } from '@nestjs/testing';
import { TableGroupService } from './table-group.service';

describe('TableGroupService', () => {
  let service: TableGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TableGroupService],
    }).compile();

    service = module.get<TableGroupService>(TableGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
