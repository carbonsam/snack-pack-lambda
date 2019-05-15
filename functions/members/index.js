import uuid from 'uuid';
import * as dynamoDb from '../../utilities/dynamodb';
import { responseSuccess, responseError } from '../../utilities/responses';

export const createMember = async event => {
  const eventBody = JSON.parse(event.body);

  const dbParams = {
    TableName: 'snack_pack_members',
    Item: {
      memberId: 'TEST_MEMBER_ID', // unique member id
      organizationId: 'TEST_ORGANIZATION_ID', // unique id for the member's current organization
      preferences: {
        availableWeekDays: [0, 1, 2, 3, 4], // 0-4: Mon-Fri
        availableLunchTimes: ['11-12', '11:30-12:30', '12-1'] // hour slots for lunches
      }
    }
  };

  try {
    await dynamoDb.call('put', dbParams);
    return responseSuccess(dbParams.Item);
  } catch (error) {
    console.log(error);
    return responseError({ status: false });
  }
};
