import {Test, TestingModule} from '@nestjs/testing';
import {DocumentController} from '../src/document/document.controller';
import {DocumentService} from '../src/document/document.service';

describe('DocumentController', () => {
    let controller: DocumentController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DocumentController],
            providers: [DocumentService],
        }).compile();

        controller = module.get<DocumentController>(DocumentController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
