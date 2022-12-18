import {Controller, Delete, Get, Param, Post, Req, Res, UseInterceptors} from '@nestjs/common';
import {DocumentService} from './document.service';
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Document} from "./document.entity";
import {FilesInterceptor} from "@nestjs/platform-express";
import configuration from "../configuration";
import {S3Client} from '@aws-sdk/client-s3';
import * as multerS3 from 'multer-s3';


const s3 = new S3Client({
    region: 'eu-west-3',
    credentials: {
        accessKeyId: configuration.AWS_ACCESS_KEY_ID,
        secretAccessKey: configuration.AWS_SECRET_ACCESS_KEY,
    }
});

@ApiTags('document')
@Controller('document')
export class DocumentController {
    constructor(private readonly documentService: DocumentService) {
    }

//     multer({
//                storage: multerS3({
//     s3: s3,
//     bucket: configuration.AWS_S3_BUCKET_NAME,
//     acl: 'public-read',
//     key: function (request, file, cb) {
//     cb(null, `${Date.now().toString()} - ${file.originalname}`);
// },
// })


    @UseInterceptors(
        FilesInterceptor('file', 1, {
            storage: multerS3({
                s3: s3,
                bucket: configuration.AWS_S3_BUCKET_NAME,
                contentType: multerS3.AUTO_CONTENT_TYPE,
                acl: 'public-read',
                key: function (request, file, cb) {
                    cb(null, `${Date.now().toString()} - ${file.originalname}`);
                },
            }),
            fileFilter: () => {
                return true;
            },
        }),
    )
    @ApiOkResponse({type: Document})
    @Post('upload')
    create(@Req() req, @Res() res) {
        return this.documentService.create(req.files);
    }

    @ApiOkResponse({type: Document, isArray: true})
    @Get()
    findAll() {
        return this.documentService.findAll();
    }

    @ApiOkResponse({type: Document})
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.documentService.findOne(+id);
    }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto) {
    //     return this.documentService.update(+id, updateDocumentDto);
    // }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.documentService.remove(+id);
    }
}
