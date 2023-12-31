import { DataSource } from 'typeorm';

const validateEnvironment = () => {
    if (process.env.NODE_ENV !== 'test') {
        throw Error('cleanupDB() MUST run in test environment');
    }
};

export const cleanupDB = async (dataSource: DataSource): Promise<void> => {
    validateEnvironment();
    const entityManager = dataSource.createEntityManager();
    const tableNames = entityManager.connection.entityMetadatas
        .map((entity) => entity.tableName)
        .join(', ');

    await entityManager.query(
        `truncate ${tableNames} restart identity cascade;`,
    );
};
