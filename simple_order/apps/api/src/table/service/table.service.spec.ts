import { Test, TestingModule } from '@nestjs/testing';
import { TableService } from './table.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '@libs/database';
import { OrderTable } from '../domain/table.entity';
import { TableRepository } from '../domain/table.repository';
import { TableCreateRequest } from '../controller/dto/tableCreateRequest';
import { DataSource } from 'typeorm';
import { cleanupDB } from '@libs/test-util';

describe('TableService', () => {
    let service: TableService;
    let repository: TableRepository;
    let dataSource: DataSource;

    afterEach(async () => {
        await cleanupDB(dataSource);
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(typeORMConfig),
                TypeOrmModule.forFeature([OrderTable]),
            ],
            providers: [TableService, TableRepository],
        }).compile();

        service = module.get<TableService>(TableService);
        repository = module.get<TableRepository>(TableRepository);
        dataSource = module.get<DataSource>(DataSource);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('테이블을 저장한다.', async () => {
        // given
        const tableCreateRequest = TableCreateRequest.from(4);

        // when
        const savedId = await service.saveTable(tableCreateRequest);

        // then
        const orderTable = await repository.findTableById(savedId);
        expect(orderTable.id).toEqual(savedId);
        expect(orderTable.getSeats()).toEqual(4);
    });

    it('저장된 테이블을 조회한다.', async () => {
        // given
        const orderTable = await repository.save(OrderTable.from(4));

        // when
        const tableResponse = await service.findTableById(orderTable.id);

        // then
        expect(tableResponse.id).toEqual(orderTable.id);
        expect(tableResponse.seats).toEqual(4);
        expect(tableResponse.empty).toEqual(true);
    });
});
