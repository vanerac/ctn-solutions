import {Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Document} from './document.entity'
import {DeleteObjectCommand, PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import configuration from "../configuration";

const s3 = new S3Client({
    region: configuration.AWS_REGION,
    credentials: {
        accessKeyId: configuration.AWS_ACCESS_KEY_ID,
        secretAccessKey: configuration.AWS_SECRET_ACCESS_KEY,
    }
});


@Injectable()
export class DocumentService {


    constructor(
        @Inject('DOCUMENT_REPOSITORY')
        private documentRepository: Repository<Document>,
    ) {
    }

    async create(file: Express.MulterS3.File) {


        return this.documentRepository.save({
            url: file.location,
        })

    }

    async findAll() {
        return this.documentRepository.find();
    }

    async findOne(id: number) {
        return this.documentRepository.findOne({
            where: {
                id: id
            },
            relations: ['signatures']
        });
    }

    async remove(id: number) {

        const document = await this.findOne(id);

        await this.deleteFile(document.url);

        return this.documentRepository.delete(id);

    }

    public async uploadFile(buffer: Buffer, name: string) {
        const uploadParams = {
            Bucket: configuration.AWS_S3_BUCKET_NAME,
            Key: name,
            Body: buffer,
            ACL: 'public-read'
        };


        await s3.send(new PutObjectCommand(uploadParams)).catch((err) => {
            console.log('Error', err);

        })

        const doc = this.documentRepository.create({
            url: `https://${configuration.AWS_S3_BUCKET_NAME}.s3.${configuration.AWS_REGION}.amazonaws.com/${name}`
        })


        return this.documentRepository.save(doc);
    }

    public async deleteFileByKey(key: string) {
        const params = {
            Bucket: configuration.AWS_S3_BUCKET_NAME,
            Key: key,
        };
        return s3.send(new DeleteObjectCommand(params));


    }

    public async deleteFile(url: string) {
        const key = url.split('/').pop();
        return this.deleteFileByKey(key);
    }
}
