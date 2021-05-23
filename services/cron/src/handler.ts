import sample from 'sample';
import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const main = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('hi');
  return {
    statusCode: 200,
    body: 'hello world' + sample() + process.env.NAME
  }
});

const check = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  return ({
    before: (handler, next) => {
      console.log(handler.event.headers);
      if (next) next();
    },
  })
}

main.use(check());
module.exports = { main };

