import {DataSource} from 'typeorm';
import {Project} from "./project.entity";

export const projectProviders = [
    {
        provide: 'PROJECT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Project),
        inject: ['DATA_SOURCE'],
    },

];
