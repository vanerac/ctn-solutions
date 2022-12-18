import {DataSource} from 'typeorm';
import {Document} from './document.entity'

export const documentProviders = [
    {
        provide: 'DOCUMENT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Document),
        inject: ['DATA_SOURCE'],
    }
];
