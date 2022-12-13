import {Test, TestingModule} from '@nestjs/testing';
import {EstimateController} from '../src/estimate/estimate.controller';
import {EstimateService} from '../src/estimate/estimate.service';

describe('EstimateController', () => {
    let controller: EstimateController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EstimateController],
            providers: [EstimateService],
        }).compile();

        controller = module.get<EstimateController>(EstimateController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
