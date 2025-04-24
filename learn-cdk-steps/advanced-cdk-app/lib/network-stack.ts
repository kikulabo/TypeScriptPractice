import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export interface NetworkStackProps extends StackProps {
    natGateways: number;
}

export class NetworkStack extends Stack {
  public readonly vpc: ec2.Vpc;

    constructor(scope: Construct, id: string, props: NetworkStackProps) {
        super(scope, id, props);
        this.vpc = new ec2.Vpc(this, 'MyVpc', {
            maxAzs: 2,
            natGateways: props.natGateways,
        });
    }
}
