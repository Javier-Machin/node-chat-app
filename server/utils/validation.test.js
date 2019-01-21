const expect = require('expect');

const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    const nonStringValue = { test: 'test'};

    expect(isRealString(nonStringValue)).toBeFalsy();
  });

  it('should reject strings with only spaces', () => {
    const invalidString = '       ';

    expect(isRealString(invalidString)).toBeFalsy();
  });

  it('should allow strings with non-space characters', () => {
    const validString = '   testChannel    ';

    expect(isRealString(validString)).toBeTruthy()
  });
});