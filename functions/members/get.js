import * as dynamoDb from '../../utilities/dynamodb';
import { responseSuccess, responseError } from '../../utilities/responses';

export const main = async event => {
  const eventBody = JSON.parse(event.body);
  const organizationId = eventBody.organizationId;
  const memberId = eventBody.memberId;
  const params = {
    TableName: 'snack_pack_members',
    Key: {
      memberId,
      organizationId
    }
  };

  try {
    if (memberId && organizationId) {
      const result = await dynamoDb.call('get', params);

      if (result.Item) {
        return responseSuccess(result.Item);
      } else {
        return responseError({ status: false, error: 'Member not found.' });
      }
    } else {
      return responseError({
        status: false,
        message: 'missing required parameter'
      });
    }
  } catch (error) {
    console.log(error);
    return responseError({ status: false });
  }
};
