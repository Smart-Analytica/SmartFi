// import { Amplify } from 'aws-amplify';

// const amplifyConfig = {
//   aws_project_region: 'us-east-1',
//   Interactions: {
//     bots: {
//       '<your-bot-name>': {
//         name: 'examplebot',
//         aliasId: 'EPCWFYWNHR',
//         botId: 'A1CDQHQ55N',
//         localeId: 'en_US',
//         region: 'us-east-1',
//       },
//     },
//   },
// };

// Amplify.configure(amplifyConfig);




import { Amplify } from 'aws-amplify';

const amplifyConfig = {
  aws_project_region: 'us-east-1',
  Interactions: {
    bots: {
      'clinical-bot': {
        name: 'examplebot',
        aliasId: '3LNPJAPGTQ',
        botId: '6LBRMUXHNT',
        localeId: 'es_US',
        region: 'us-east-1',
      },
    },
  },
};

Amplify.configure(amplifyConfig);

export default amplifyConfig;