import { comic } from './comic.url';

describe('#comic', () => {
  test('Usage', () => {
    expect(comic('7696-doing-1-more-at-night-persona-5')).toBe('https://xlecx.com/7696-doing-1-more-at-night-persona-5.html');
  });
});
