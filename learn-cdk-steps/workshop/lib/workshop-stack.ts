import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as rds from "aws-cdk-lib/aws-rds";
import * as elbv2 from "aws-cdk-lib/aws-elasticloadbalancingv2";
import * as targets from "aws-cdk-lib/aws-elasticloadbalancingv2-targets";

import { WebServerInstance } from './constructs/web-server-instance';

export class CdkWorkshopStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "BlogVpc", {
      ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
    });

    const webServer1 = new WebServerInstance(this, 'WebServer1', {
      vpc
    });

    const webServer2 = new WebServerInstance(this, 'WebServer2', {
      vpc
    });

    const dbServer = new rds.DatabaseInstance(this, "WordPressDB", {
      vpc,
      engine: rds.DatabaseInstanceEngine.mysql({ version: rds.MysqlEngineVersion.VER_8_0_36 }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.SMALL),
      databaseName: "wordpress",
      multiAz: true,
    });

    dbServer.connections.allowDefaultPortFrom(webServer1.instance);
    dbServer.connections.allowDefaultPortFrom(webServer2.instance);

    const alb = new elbv2.ApplicationLoadBalancer(this, "LoadBalancer", {
      vpc,
      internetFacing: true,
    });
    const listener = alb.addListener("Listener", {
      port: 80,
    });
    listener.addTargets("ApplicationFleet", {
      port: 80,
      targets: [new targets.InstanceTarget(webServer1.instance, 80),
        new targets.InstanceTarget(webServer2.instance, 80)],
      healthCheck: {
        path: "/wp-includes/images/blank.gif",
      },
    });

    webServer1.instance.connections.allowFrom(alb, ec2.Port.tcp(80));
    webServer2.instance.connections.allowFrom(alb, ec2.Port.tcp(80));
  }
}
