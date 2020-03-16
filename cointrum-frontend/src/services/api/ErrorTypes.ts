export interface IError {
  error: number;
  details: {
    message: string;
    name: string;
  };
}

export const Error500: IError = {
  error: 500,
  details: {
    message: "Unexpected API Call Failure, Try again later",
    name: "ServerError"
  }
};

export const Error400 = (message: any): IError => {
  return {
    error: 400,
    details: message
  };
};
