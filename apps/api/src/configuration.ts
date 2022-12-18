import * as dotenv from 'dotenv';

dotenv.config();

export default {
    JWT_SECRET: process.env.JWT_SECRET ?? 'secret',

    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ?? '',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME ?? 'ctn-solutions-cdn',
    AWS_REGION: process.env.AWS_REGION ?? 'ap-southeast-2',
}
