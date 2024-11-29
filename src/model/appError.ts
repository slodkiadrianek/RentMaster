export class AppError extends Error {
  errorCode: number;
  errorDescription: string;
  typeError: string;
  constructor(typeError: string, errorCode: number, errorDescription: string) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
    this.typeError = typeError;
    Error.captureStackTrace(this);
  }
}
