import {Test, TestingModule} from '@nestjs/testing';
import {CompanyController} from '../src/company/company.controller';
import {CompanyService} from '../src/company/company.service';

describe('CompanyController', () => {
    let controller: CompanyController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CompanyController],
            providers: [CompanyService],
        }).compile();

        controller = module.get<CompanyController>(CompanyController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
