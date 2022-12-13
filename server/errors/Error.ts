import moment from 'moment'
import { Messages } from './Message';

export class Error {
    payload: any;
    statusCode: number;
  
    constructor(statusCode: number, errors: any[]) {
      this.statusCode = statusCode;
      this.payload = {
        timestamp: moment(),
        errors: errors,
      };
    }
  }

  export class InternalServerError extends Error {
    constructor(error?: string) {
      super(500, [
        error
          ? `Internal Server Error: ${error}`
          : Messages.INTERNAL_SERVER_ERROR,
      ]);
    }
  }  

  export class NotFoundError extends Error {
    constructor(error: string) {
      super(404, [error]);
    }
  }


  export class BadRequestError extends Error {
    constructor(errors: any[]) {
      super(400, errors);
    }
  }