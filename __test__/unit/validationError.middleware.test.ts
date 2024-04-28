import { Request, Response, NextFunction } from 'express';
import { validationErrorMiddleware } from '../../src/middleware/errorMiddleware/validationError.middleware';

describe('validationErrorMiddleware', () => {
  const mockRequest = {} as Request;
  const mockResponse = {
    formatResponse: jest.fn(),
  } as unknown as Response;
  const mockNextFunction = jest.fn() as NextFunction;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should handle ValidationError by sending a 400 response and formatting the message', () => {
    const error = new Error('Invalid error');
    error.name = 'ValidationError';
    validationErrorMiddleware(error, mockRequest, mockResponse, mockNextFunction);
    expect(mockResponse.formatResponse).toHaveBeenCalledWith('Invalid error', 400);
  });

  it('should pass other types of errors to the next middleware', () => {
    const error = new Error('Some other error');
    validationErrorMiddleware(error, mockRequest, mockResponse, mockNextFunction);
    expect(mockNextFunction).toHaveBeenCalledWith(error);
  });
});
