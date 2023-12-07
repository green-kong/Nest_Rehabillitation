import { DataSource, DataSourceOptions } from 'typeorm';

export class TestUtil {
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
