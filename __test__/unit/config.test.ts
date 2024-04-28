jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

describe('Configuration Tests', () => {
  beforeAll(() => {
    process.env.DATABASE_URL = 'postgresql://localhost:5432/db?schema=public';
  });

  import { optionalConfig, requiredConfig } from '../../src/config';

  afterAll(() => {
    delete process.env.DATABASE_URL;
  });

  it('should load optional configuration with defaults', () => {
    expect(optionalConfig.PORT).toEqual(process.env.PORT || 3000);
    expect(optionalConfig.NODE_ENV).toEqual(process.env.NODE_ENV || 'dev');
  });

  it('should load required configuration correctly', () => {
    expect(requiredConfig.DATABASE_URL).toEqual('postgresql://localhost:5432/db?schema=public');
  });

  it('should throw an error if a required configuration is missing', () => {
    delete process.env.DATABASE_URL;

    expect(() => {
      jest.resetModules();
      require('./config');
    }).toThrow('Missing value for DATABASE_URL');
  });
});
