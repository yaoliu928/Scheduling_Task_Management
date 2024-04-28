import { Request, Response, NextFunction } from 'express';
import { notFoundErrorMiddleware } from '../../src/middleware/errorMiddleware/notFoundError.middleware';
import { NotFoundException } from '../../src/common/exceptions/notFound.exception';

describe('notFoundErrorMiddleware', () => {
  const mockRequest = {} as Request;
  const mockResponse = {
    formatResponse: jest.fn(),
  } as unknown as Response;
  const mockNextFunction = jest.fn() as NextFunction;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should handle NotFoundException by sending a 404 response', () => {
    const error = new NotFoundException('Resource not found');
    notFoundErrorMiddleware(error, mockRequest, mockResponse, mockNextFunction);
    expect(mockResponse.formatResponse).toHaveBeenCalledWith('Resource not found', 404);
  });

  it('should call next function for errors', () => {
    const error = new Error('Other error');
    notFoundErrorMiddleware(error, mockRequest, mockResponse, mockNextFunction);
    expect(mockNextFunction).toHaveBeenCalledWith(error);
  });
});
