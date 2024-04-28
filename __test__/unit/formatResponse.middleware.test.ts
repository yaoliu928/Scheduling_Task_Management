import { Request, Response, NextFunction } from 'express';
import { formatResponseMiddleware } from '../../src/middleware/formatResponse.middleware';

describe('formatResponseMiddleware', () => {
  const mockRequest = {} as Request;
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;
  const mockNextFunction = jest.fn() as NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should attach formatResponse to res object and call next', () => {
    formatResponseMiddleware(mockRequest, mockResponse, mockNextFunction);
    expect(typeof mockResponse.formatResponse).toBe('function');
    expect(mockNextFunction).toHaveBeenCalled();
  });

  it('should correctly format a successful response', () => {
    formatResponseMiddleware(mockRequest, mockResponse, mockNextFunction);
    const testData = { message: 'Success' };
    mockResponse.formatResponse(testData, 200);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 200,
      data: testData,
    });
  });

  it('should correctly format an error response', () => {
    formatResponseMiddleware(mockRequest, mockResponse, mockNextFunction);
    const errorData = { message: 'Error' };
    mockResponse.formatResponse(errorData, 400);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 400,
      error: errorData,
    });
  });

  it('should handle custom object in response', () => {
    formatResponseMiddleware(mockRequest, mockResponse, mockNextFunction);
    const customObject = { customKey: 'customValue' };
    const data = { message: 'Custom data' };
    mockResponse.formatResponse(data, 200, customObject);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 200,
      data,
      ...customObject,
    });
  });
});
