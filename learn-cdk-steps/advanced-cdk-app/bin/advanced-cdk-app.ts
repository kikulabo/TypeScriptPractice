#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { NetworkStack } from '../lib/network-stack';
import { ApplicationStack } from '../lib/application-stack';

const app = new cdk.App();

const networkStack = new NetworkStack(app, 'NetworkStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION }
});

new ApplicationStack(app, 'ApplicationStack', {
  vpc: networkStack.vpc,
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION }
});

cdk.Tags.of(app).add('App', 'AdvancedCdkApp');
