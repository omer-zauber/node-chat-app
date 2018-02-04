const expect = require('expect');
const { isRealString } = require('./validation')


describe('testing isRealString', () => {
  it('should reject non-string valeus', () => {
    expect(isRealString(true)).toBeFalsy();
  });

  it('should reject strings with only spaces', () => {
    expect(isRealString('        ')).toBeFalsy();
  });

  it('should allow strings with non-space characters', () => {
    expect(isRealString("true")).toBeTruthy();
  });
});


