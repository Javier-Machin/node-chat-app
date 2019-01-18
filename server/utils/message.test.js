const expect = require('expect');
const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'testUser';
    const text = 'test message';

    const message = generateMessage(from, text);

    // older versions used toInclude
    expect(message).toMatchObject({from, text});
    // older versions used toExist
    expect(message.createdAt).toBeTruthy();
  });
});