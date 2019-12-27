import { home, search } from './list.url';

describe('#home', () => {
  test('Usage', () => {
    expect(home(2)).toBe('https://xlecx.com/page/3/');
  });
});

describe('#search', () => {
  test('Usage', () => {
    expect(search).toBeDefined();
  });
});
