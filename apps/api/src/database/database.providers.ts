import {DataSource} from 'typeorm';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: process.env.DB_HOST ?? 'localhost',
                port: +process.env.DB_PORT ?? 5432,
                username: process.env.DB_USER ?? 'postgres',
                password: process.env.DB_PASSWORD ?? 'postgres',
                database: process.env.DB_NAME ?? 'postgres',
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                synchronize: false,

            });

            return dataSource.initialize();
        },
    },
];
