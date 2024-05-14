#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { CdkStack } from '../lib/cdk-stack';

const app = new App();
new CdkStack(app, 'CdkStack', {
  /* If you need to pass environment or stack-specific parameters */
});