import {DataSource} from 'typeorm';
import {Export} from './export.entity'

export const exportProviders = [
    {
        provide: 'EXPORT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Export),
        inject: ['DATA_SOURCE'],
    }
];
