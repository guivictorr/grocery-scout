export class BaseError extends Error {
  statusCode: number;
  action: string;

  constructor() {
    super();
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status_code: this.statusCode,
      action: this.action,
    };
  }
}
export class ValidationError extends BaseError {
  constructor(
    private propertyName: string,
    private errorMessage: string,
  ) {
    super();
    this.message = `The property ${this.propertyName} is invalid.`;
    this.name = "ValidationError";
    this.statusCode = 400;
    this.action = this.errorMessage;
  }
}
export class ConflictError extends BaseError {
  constructor() {
    super();
    this.message =
      "The entity you are trying to create already exists in the database.";
    this.name = "ConflictError";
    this.statusCode = 409;
    this.action =
      "Please verify the entity's unique identifier (e.g., EAN) and try again. If you intended to update the existing entity, consider using a PUT request instead.";
  }
}
export class NotFoundError extends BaseError {
  constructor() {
    super();
    this.message = "This route doesn't exist.";
    this.name = "NotFoundError";
    this.statusCode = 404;
    this.action =
      "Verify if the address is correct or if the http verb is valid.";
  }
}
export class InternalServerError extends Error {
  readonly statusCode: number;
  readonly action: string;

  constructor({ cause }: { cause: Error }) {
    super("An unexpected error occurred on our servers.", {
      cause,
    });
    this.name = "InternalServerError";
    this.statusCode = 500;
    this.action = "Contact the support.";
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status_code: this.statusCode,
      action: this.action,
    };
  }
}
