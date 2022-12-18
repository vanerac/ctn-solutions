export default {
    JWT_SECRET: process.env.JWT_SECRET ?? 'secret',

    AWS_ACCESS_KEY_ID: process.env.AWS ?? 'AKIAREG3ZSCKHAIYMW4G',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ?? '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',
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME ?? 'ctn-solutions-cdn' ?? 'ctn-solutions-cdn.s3-ap-southeast-2.amazonaws.com',
    AWS_REGION: process.env.AWS_REGION ?? 'ap-southeast-2',
}
