const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

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

describe('generateLocationMessage', () => {
  it('should generate a correct location object', () => {
    const from = 'testUser';
    const latitude = 25;
    const longitude = 35;

    const message = generateLocationMessage(from, latitude, longitude);

    expect(message.from).toBe(from);
    expect(message.url).toBe(`https://www.google.com/maps?q=25,35`)
  })
})