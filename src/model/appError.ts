export class AppError extends Error {
  constructor(
    public typeError: string,
    public errorCode: number,
    public errorDescription: string,
  ) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
    this.typeError = typeError;
    Error.captureStackTrace(this);
  }
}
