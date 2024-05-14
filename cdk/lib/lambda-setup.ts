import { Construct } from 'constructs';
import { aws_lambda as lambda, aws_iam as iam } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'; // Ensure to import NodejsFunction

export class LambdaSetup extends Construct {
  public readonly handler: lambda.Function;

  constructor(scope: Construct, id: string, bucket: Bucket) {
    super(scope, id);

    // Lambda Function to generate S3 pre-signed URLs
    this.handler = new NodejsFunction(this, 'GeneratePresignedUrlLambda', {
      runtime: lambda.Runtime.NODEJS_16_X,  // Node.js 16.x runtime
      handler: 'handler',  // Pointing to the specific handler function
      entry: 'resources/lambda/generatePresignedUrl.js',  // Ensure you provide the correct path
      environment: {
        BUCKET_NAME: bucket.bucketName, // Only need the bucket name for generating URLs
      },
      bundling: { // Explicitly specify bundling options
        externalModules: ['aws-sdk'], // 'aws-sdk' is normally not bundled as it is already available in the AWS Lambda environment
        nodeModules: ['nanoid'], // Explicitly bundle 'nanoid'
      },
      initialPolicy: [
        new iam.PolicyStatement({
          actions: ["s3:PutObject"],  // Permission to create 'put' pre-signed URLs
          resources: [`${bucket.bucketArn}/*`],  // Access to the entire S3 bucket
        })
      ]
    });

    // Granting the Lambda function permission to write to the S3 bucket
    bucket.grantPut(this.handler);
  }
}
