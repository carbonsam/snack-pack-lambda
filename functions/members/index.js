import uuid from 'uuid';
import * as dynamoDb from '../../utilities/dynamodb';
import { responseSuccess, responseError } from '../../utilities/responses';

export const createMember = async event => {
  const eventBody = JSON.parse(event.body);

  const dbParams = {
    TableName: 'snack_pack_members',
    Item: {
      memberId: eventBody.memberId, // unique member id
      organizationId: eventBody.organizationId, // unique id for the member's current organization
      preferences: {
        availableWeekDays: eventBody.availableWeekDays || [], // Mon-Fri, e.g. '0'
        availableLunchTimes: eventBody.availableLunchTimes || [] // hour slots for lunches, e.g. '11:00-12:00'
      },
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
  };

  try {
    if (dbParams.Item.memberId && dbParams.Item.organizationId) {
      await dynamoDb.call('put', dbParams);
      return responseSuccess(dbParams.Item);
    } else {
      console.log('Error - Missing Required Parameter');
      return responseError({
        status: false,
        message: 'missing required parameter'
      });
    }
  } catch (error) {
    console.log(error);
    return responseError({ status: false, message: '' });
  }
};
