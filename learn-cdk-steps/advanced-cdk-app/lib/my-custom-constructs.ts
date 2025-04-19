import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { RemovalPolicy, Tags } from 'aws-cdk-lib';

export interface MySecureBucketProps extends s3.BucketProps {
  customTagName?: string;
}

export class MySecureBucket extends Construct {
  public readonly bucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: MySecureBucketProps) {
    super(scope, id);

    this.bucket = new s3.Bucket(this, 'SecureBucketResource', {
      ...props,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      versioned: true,
      removalPolicy: props.removalPolicy ?? RemovalPolicy.RETAIN,
      autoDeleteObjects: props.autoDeleteObjects ?? false,
    });

    Tags.of(this).add('Project', 'AdvancedCdkApp');
    if (props.customTagName) {
      Tags.of(this).add('CustomTag', props.customTagName);
    }
  }
}
