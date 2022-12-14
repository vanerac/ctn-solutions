import {Test, TestingModule} from '@nestjs/testing';
import {InvoiceService} from '../src/invoice/invoice.service';

describe('InvoiceService', () => {
    let service: InvoiceService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [InvoiceService],
        }).compile();

        service = module.get<InvoiceService>(InvoiceService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
