import { CfnOutput } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { readFileSync } from "fs";

export interface WebServerInstanceProps {
  readonly vpc: ec2.IVpc
}

export class WebServerInstance extends Construct {
  public readonly instance: ec2.Instance;

  constructor(scope: Construct, id: string, props: WebServerInstanceProps) {
    super(scope, id);

    const { vpc } = props;

    const instance = new ec2.Instance(this, "Instance", {
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.SMALL),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
    });

    const script = readFileSync("./lib/resources/user-data.sh", "utf8");
    instance.userData.addCommands(script);

    instance.connections.allowFromAnyIpv4(ec2.Port.tcp(80));

    this.instance = instance;
  
    new CfnOutput(this, "WordpressServer1PublicIPAddress", {
      value: `http://${instance.instancePublicIp}`,
    });
  }
}
