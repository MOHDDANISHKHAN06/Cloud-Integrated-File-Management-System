import { aws_s3 as s3 } from 'aws-cdk-lib';
import { RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket, BucketProps } from 'aws-cdk-lib/aws-s3';

export class S3Setup extends Construct {
    public readonly bucket: Bucket;
    constructor(scope: Construct, id: string, props?: BucketProps) {
        super(scope, id);

        this.bucket = new Bucket(this, 'MyBucket', {
            removalPolicy: RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            cors: [{
                    allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.PUT, s3.HttpMethods.POST],
                    allowedOrigins: ['*'], // Specify actual origins in production
                    allowedHeaders: ['*']
                }],
            ...props
        });
    }
}
