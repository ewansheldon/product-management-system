export class ApiError extends Error {
  status: number;
  body?: unknown;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}