import AWS from 'aws-sdk';
import environment from './environment';

AWS.config.update({
  region: environment.aws.region,
  credentials: environment.aws.credentials,
});

export const lexRuntime = new AWS.LexRuntimeV2(); 
