const expect = require('expect');
const { generateMessage } = require('./message')


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