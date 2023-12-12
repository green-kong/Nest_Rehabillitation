import { DataSource, DataSourceOptions, EntityManager } from 'typeorm';
import { typeORMConfig } from '@libs/database';
import { INestApplication } from '@nestjs/common';

class DBCleaner {
    private readonly testUtil: DBCleaner;
    private readonly datasource: DataSource;
    private isInitialized: boolean = false;

    constructor(option: DataSourceOptions) {
        if (process.env.NODE_ENV !== 'test') {
            throw new Error('TEST-UTILS-ONLY-FOR-TESTS');
        }
        if (this.testUtil) {
            return this.testUtil;
        }

        this.datasource = new DataSource(option);
        this.testUtil = this;
    }

    public async removeAll() {
        if (!this.isInitialized) {
            await this.datasource.initialize();
            this.isInitialized = true;
        }
        await this.datasource.dropDatabase();
    }
}

export const afterEachCleanupDB = async () => {
    const testUtil: DBCleaner = new DBCleaner(typeORMConfig);
    afterEach(async () => {
        await testUtil.removeAll();
    });
};

export const testCleanupDB = async (app: INestApplication): Promise<void> => {
    const entityManager = app.get<EntityManager>(EntityManager);
    const tableNames = entityManager.connection.entityMetadatas
        .map((entity) => entity.tableName)
        .join(', ');

    await entityManager.query(
        `truncate ${tableNames} restart identity cascade;`,
    );
};
