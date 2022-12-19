import {DataSource} from 'typeorm';
import {Document, Signature} from './document.entity'

export const documentProviders = [
    {
        provide: 'DOCUMENT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Document),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'SIGNATURE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Signature),
        inject: ['DATA_SOURCE'],
    }
];
