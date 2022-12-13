import {DataSource} from 'typeorm';
import {Estimate} from './estimate.entity';
import {EstimateField} from "./estimate-field.entity";

export const estimateProviders = [
    {
        provide: 'ESTIMATE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Estimate),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'ESTIMATE_FIELD_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(EstimateField),
        inject: ['DATA_SOURCE'],
    }
];
