const { responseSuccess } = require('../../utilities/responses');

export const receiveMessage = async (event, context) =>
  responseSuccess({
    type: 'message',
    text: 'Hello user',
    body: event
  });
