import * as dynamoDb from '../../utilities/dynamodb';
import { responseSuccess, responseError } from '../../utilities/responses';

export const main = async event => {
  const eventBody = JSON.parse(event.body);

  const dbParams = {
    TableName: 'snack_pack_members',
    Key: {
      memberId: eventBody.memberId,
      organizationId: eventBody.organizationId
    },
    UpdateExpression: `SET
      preferences.availableWeekDays = :availableWeekDays,
      preferences.availableLunchTimes = :availableLunchTimes,
      updatedAt = :updatedAt
    `,
    ExpressionAttributeValues: {
      ':availableWeekDays': eventBody.availableWeekDays,
      ':availableLunchTimes': eventBody.availableLunchTimes,
      ':updatedAt': Date.now()
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    const result = await dynamoDb.call('get', dbParams);
    if (result) {
      await dynamoDb.call('update', dbParams);
      return responseSuccess({ status: true });
    } else {
      return failure({
        status: false,
        error: 'Member not found'
      });
    }
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
};
