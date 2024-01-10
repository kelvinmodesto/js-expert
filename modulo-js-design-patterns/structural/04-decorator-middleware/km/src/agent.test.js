import { describe, expect, beforeEach, jest, test } from '@jest/globals';
import { Server } from 'http';
import { InjectHttpInterceptor } from './agent';

const originalHttp = jest.createMockFromModule('http');

describe('Agent test suite', () => {
  const eventName = 'request';
  const request = null;
  beforeEach(() => jest.clearAllMocks());

  test('should not change header', () => {
    const response = {
      setHeader: jest.fn().mockReturnThis(),
    };

    const serverInstance = new originalHttp.Server();
    serverInstance.emit(eventName, request, response);

    expect(response.setHeader).not.toHaveBeenCalled();
  });
  test('should activate header interceptor', () => {
    InjectHttpInterceptor();
    const response = {
      setHeader: jest.fn().mockReturnThis(),
    };

    const serverInstance = new Server();
    serverInstance.emit(eventName, request, response);

    expect(response.setHeader).toHaveBeenCalledWith(
      'X-Instrumented-By',
      'kelvinmodesto'
    );
  });
});
