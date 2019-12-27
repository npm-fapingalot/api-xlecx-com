import { comic, hrefToID } from './comic.url';

describe('#comic', () => {
  test('Usage', () => {
    expect(comic('7696-doing-1-more-at-night-persona-5')).toBe('https://xlecx.com/7696-doing-1-more-at-night-persona-5.html');
  });
});

describe('#urlToID', () => {
  test('Usage', () => {
    expect(hrefToID('https://xlecx.com/6251-supervision.html')).toBe('6251-supervision');
    expect(hrefToID('http://xlecx.com/6251-supervision.html')).toBe('6251-supervision');
    expect(hrefToID('xlecx.com/6251-supervision.html')).toBe('6251-supervision');
    expect(hrefToID('/6251-supervision.html')).toBe('6251-supervision');
  });
});
