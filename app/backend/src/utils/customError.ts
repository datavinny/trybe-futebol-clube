class CustomError extends Error {
  public foo: string;
  public name: string;
  public date: Date;
  public statusCode: number;

  constructor(statusCode: number, message: string, name = 'CustomError', foo = 'baz') {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.name = name;
    this.statusCode = statusCode;
    // Custom debugging information
    this.foo = foo;
    this.date = new Date();
  }
}

export default CustomError;
