const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message')


describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from="omer", text="testing";
    const message = generateMessage(from, text);
    expect(message).toInclude({
      from,
      text
    });
    expect(message.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = "omer", latitude=0, longitute=0;
    const message = generateLocationMessage(from, latitude, longitute);
    expect(message).toInclude({ from });
    expect(message.url).toBe('https://www.google.com/maps?q=0,0');
  });
});

