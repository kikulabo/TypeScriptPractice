import { Stack, StackProps, RemovalPolicy, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class AdvancedCdkAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const l2Bucket = new s3.Bucket(this, 'MyL2Bucket', {
      versioned: true,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const l1Bucket = new s3.CfnBucket(this, 'MyL1Bucket', {
      bucketName: 'my-l1-bucket-${this.account}-${this.region}',
      tags: [{ key: 'ConstructLevel', value: 'L1' }],
      versioningConfiguration: {
        status: 'Enabled',
      }
    });

    new CfnOutput(this, 'L1BucketNameOutput', {
      value: l1Bucket.ref, // CfnBucketの参照 (バケット名)
      description: 'Name of the L1 S3 bucket',
    });

    new CfnOutput(this, 'L2BucketNameOutput', {
      value: l2Bucket.bucketName,
      description: 'Name of the L2 S3 bucket',
    });
  }
}
