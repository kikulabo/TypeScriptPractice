import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Runtime, FunctionUrlAuthType } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class Chapter4Stack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
    }
    const lambdaFunction = new NodejsFunction(this,'SampleLambda', {
        entry:'src/index.ts',
        handler: 'handler',
        runtime: Runtime.NODEJS_LATEST,
    });
    const functionUrl = lambdaFunction.addFunctionUrl({
        authType: FunctionUrlAuthType.NONE,
    });
    new cdk.CfnOutput(this,'SampleFunctionUrl', {
        value: functionUrl.url,
    });
}
