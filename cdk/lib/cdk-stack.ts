// File: lib/cdk-stack.ts

import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { DynamoDbSetup } from './dynamodb-setup';
import { S3Setup } from './s3-setup';
import { ApiGatewaySetup } from './api-gateway-setup';
import { LambdaSetup } from './lambda-setup';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { aws_lambda as lambda } from 'aws-cdk-lib';
import { Architecture } from 'aws-cdk-lib/aws-lambda';


export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const dynamoDbSetup = new DynamoDbSetup(this, 'DynamoDbSetup');
    const s3Setup = new S3Setup(this, 'S3Setup');
    const lambdaSetup = new LambdaSetup(this, 'LambdaSetup', s3Setup.bucket);
    
    // API Gateway setup is configured to use the Lambda function
    const apiGatewaySetup = new ApiGatewaySetup(this, 'ApiGatewaySetup', lambdaSetup.handler);

    // Additional Lambda function for saving metadata
    const metadataLambda = new NodejsFunction(this, 'MetadataLambda', {
      entry: 'resources/lambda/saveMetaData.js',
      handler: 'saveMetadataHandler',
      runtime: lambda.Runtime.NODEJS_16_X,
      environment: {
        DYNAMODB_TABLE_NAME: dynamoDbSetup.table.tableName
      },
      architecture: Architecture.ARM_64
    });

    // Dynamically add more routes or methods as needed
    const metadataResource = apiGatewaySetup.api.root.addResource('metadata');
    metadataResource.addMethod('POST', new LambdaIntegration(metadataLambda));
    
    // Grant the metadata Lambda function permissions to write to the DynamoDB table
    dynamoDbSetup.table.grantWriteData(metadataLambda);
  }
}
