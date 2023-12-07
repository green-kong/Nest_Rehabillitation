import { DataSource, DataSourceOptions } from 'typeorm';
import { typeORMConfig } from '../config/TypeORM.config';

class TestUtil {
    private readonly testUtil: TestUtil;
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
    const testUtil: TestUtil = new TestUtil(typeORMConfig);
    afterEach(async () => {
        await testUtil.removeAll();
    });
};
