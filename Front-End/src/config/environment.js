const environment = {
  aws: {
    region: process.env.REACT_APP_AWS_REGION,
    credentials: {
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    },
    lex: {
      botId: process.env.REACT_APP_LEX_BOT_ID,
      botAliasId: process.env.REACT_APP_LEX_BOT_ALIAS_ID,
    }
  },
  vapi: {
    assistantId: process.env.REACT_APP_ASSISTANT_ID,
    apiKey: process.env.REACT_APP_VAPI_API_KEY,
  }
};

export default environment; 
