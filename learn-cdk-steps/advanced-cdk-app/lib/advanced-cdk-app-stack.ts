#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { NetworkStack } from '../lib/network-stack';
import { ApplicationStack } from '../lib/application-stack';

const app = new cdk.App();

const envName = app.node.tryGetContext('env') || 'dev';
const envContext = app.node.tryGetContext(envName);
if (!envContext) {
  throw new Error(`Context for environment "${envName}" not found in cdk.json. Please define it.`);
}

const stackProps: cdk.StackProps = {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  terminationProtection: envName === 'prd',
};

const networkStack = new NetworkStack(app, `NetworkStack-${envName}`, {
  ...stackProps,
  natGateways: envContext.natGateways,
});

const appStack = new ApplicationStack(app, `ApplicationStack-${envName}`, {
  ...stackProps,
  vpc: networkStack.vpc,
  bucketPrefix: envContext.bucketPrefix,
});

cdk.Tags.of(app).add('Environment', envName);
cdk.Tags.of(app).add('App', 'AdvancedCdkApp');
