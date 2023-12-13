import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '@libs/database';
import { TableRepository } from './table.repository';
import { OrderTable } from './table.entity';
import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { cleanupDB } from '@libs/test-util';

describe('tableRepository 테스트', () => {
    let tableRepository: TableRepository;
    let dataSource: DataSource;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(typeORMConfig),
                TypeOrmModule.forFeature([OrderTable]),
            ],
            providers: [TableRepository],
        }).compile();
        tableRepository = module.get<TableRepository>(TableRepository);
        dataSource = module.get<DataSource>(DataSource);
    });

    afterEach(async () => {
        await cleanupDB(dataSource);
    });

    it('테이블을 저장한다.', async () => {
        // given
        const orderTable = OrderTable.from(4);

        // when
        const savedTable = await tableRepository.save(orderTable);

        // then
        expect(savedTable.id).toBeDefined();
        expect(savedTable.getSeats()).toEqual(4);
        expect(savedTable.empty).toEqual(true);
    });

    it('저장된 테이블을 조회한다.', async () => {
        // given
        const table = await tableRepository.save(OrderTable.from(4));

        // when
        const orderTable = await tableRepository.findTableById(table.id);

        // then
        expect(orderTable.id).toBeDefined();
        expect(orderTable.getSeats()).toEqual(4);
        expect(orderTable.empty).toEqual(true);
    });

    it('ids를 통해 저장된 테이블들을 조회한다.', async () => {
        // given
        const table1 = await tableRepository.save(OrderTable.from(4));
        const table2 = await tableRepository.save(OrderTable.from(6));
        const table3 = await tableRepository.save(OrderTable.from(8));

        // when
        const orderTables = await tableRepository.findTableByIds([
            table1.id,
            table2.id,
            table3.id,
        ]);

        // then
        expect(orderTables).toEqual([table1, table2, table3]);
    });
});
