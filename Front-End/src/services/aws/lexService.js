import { lexRuntime } from '../../config/aws.config';
import environment from '../../config/environment';

export const sendMessageToLex = async (text, sessionId, language = 'en_US') => {
  const params = {
    botId: environment.aws.lex.botId,
    botAliasId: environment.aws.lex.botAliasId,
    localeId: language,
    sessionId,
    text,
  };

  try {
    const response = await lexRuntime.recognizeText(params).promise();
    return response;
  } catch (error) {
    console.error('Error with Lex:', error);
    throw error;
  }
}; 
