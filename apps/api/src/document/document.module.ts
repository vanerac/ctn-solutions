import {Module} from '@nestjs/common';
import {DocumentService} from './document.service';
import {DocumentController} from './document.controller';
import {DatabaseModule} from "../database/database.module";
import {documentProviders} from "./document.provider";

@Module({
    imports: [DatabaseModule],
    controllers: [DocumentController],
    providers: [DocumentService, ...documentProviders],
})
export class DocumentModule {
}
