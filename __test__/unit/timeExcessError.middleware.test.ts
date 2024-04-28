import { Request, Response, NextFunction } from 'express';
import { TimeExcessException } from '../../src/common/exceptions/timeExcess.exception';
import { TimeExcessErrorMiddleware } from '../../src/middleware/errorMiddleware/timeExcessError.middleware';

describe('TimeExcessErrorMiddleware', () => {
  const mockRequest = {} as Request;
  const mockResponse = {
    formatResponse: jest.fn(),
  } as unknown as Response;
  const mockNextFunction = jest.fn() as NextFunction;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should handle TimeExcessException by sending a 400 response', () => {
    const error = new TimeExcessException('Time limit exceeded');
    TimeExcessErrorMiddleware(error, mockRequest, mockResponse, mockNextFunction);
    expect(mockResponse.formatResponse).toHaveBeenCalledWith('Time limit exceeded', 400);
  });

  it('should pass other types of errors to the next middleware', () => {
    const error = new Error('Another error');
    TimeExcessErrorMiddleware(error, mockRequest, mockResponse, mockNextFunction);
    expect(mockNextFunction).toHaveBeenCalledWith(error);
  });
});
