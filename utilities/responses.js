const buildResponse = (statusCode, body) => {
  const response = {
    statusCode,
    body: JSON.stringify(body)
  };

  console.log(response);

  return response;
};

export const responseSuccess = body => buildResponse(200, body);

export const responseError = body => buildResponse(500, body);
