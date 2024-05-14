import { Construct } from 'constructs';
import { RestApi, LambdaIntegration, Cors } from 'aws-cdk-lib/aws-apigateway';
import { Function as LambdaFunction } from 'aws-cdk-lib/aws-lambda';

export class ApiGatewaySetup extends Construct {
  public readonly api: RestApi;

  constructor(scope: Construct, id: string, lambdaHandler: LambdaFunction) {
    super(scope, id);

    this.api = new RestApi(this, 'MyApi', {
      restApiName: 'ServiceApi',
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: Cors.DEFAULT_HEADERS.concat(['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key', 'X-Amz-Security-Token', 'xsrf-token']),
        allowCredentials: true,
      }
    });

    const resource = this.api.root.addResource('upload');
    const lambdaIntegration = new LambdaIntegration(lambdaHandler, {
      integrationResponses: [{
        statusCode: '200',
        responseParameters: {
          'method.response.header.Access-Control-Allow-Origin': "'*'",
          'method.response.header.Access-Control-Expose-Headers': "'*'",
          'method.response.header.Access-Control-Allow-Headers': "'*'",

        }
      }],
      requestTemplates: {
        "application/json": '{ "statusCode": 200 }'
      }
    });

    resource.addMethod('POST', lambdaIntegration, {
      methodResponses: [{
        statusCode: '200',
        responseParameters: {
          'method.response.header.Access-Control-Allow-Origin': true,
          'method.response.header.Access-Control-Expose-Headers': true,
          'method.response.header.Access-Control-Allow-Headers': true,
        }
      }]
    });
  }
}
