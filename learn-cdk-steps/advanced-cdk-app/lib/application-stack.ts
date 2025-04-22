import { Stack, StackProps, RemovalPolicy, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { MySecureBucket } from './my-custom-constructs';

export interface ApplicationStackProps extends StackProps {
    vpc: ec2.IVpc;
    bucketPrefix: string;
}

export class ApplicationStack extends Stack {
    constructor(scope: Construct, id: string, props: ApplicationStackProps) {
        super(scope, id, props);
        const prefix = props.bucketPrefix;

        const l2Bucket = new s3.Bucket(this, 'MyL2Bucket', {
            versioned: true,
            removalPolicy: RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        });

        new CfnOutput(this, 'VpcIdOutput', { value: props.vpc.vpcId });

        const l1Bucket = new s3.CfnBucket(this, 'MyL1Bucket', {
            bucketName: `${prefix}my-l1-bucket-${this.account}-${this.region}`,
            tags: [{ key: 'ConstructLevel', value: 'L1' }],
            versioningConfiguration: { status: 'Enabled' },
         });
        new CfnOutput(this, 'L1BucketNameOutput', { value: l1Bucket.ref });
 
        const secureBucket = new MySecureBucket(this, 'MyL3SecureBucket', {
            customTagName: 'FinanceData',
            removalPolicy: RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        });
        new CfnOutput(this, 'L3BucketNameOutput', { value: secureBucket.bucket.bucketName });
    }
}
