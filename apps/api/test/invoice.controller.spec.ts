import {Test, TestingModule} from '@nestjs/testing';
import {InvoiceController} from '../src/invoice/invoice.controller';
import {InvoiceService} from '../src/invoice/invoice.service';

describe('InvoiceController', () => {
    let controller: InvoiceController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [InvoiceController],
            providers: [InvoiceService],
        }).compile();

        controller = module.get<InvoiceController>(InvoiceController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
