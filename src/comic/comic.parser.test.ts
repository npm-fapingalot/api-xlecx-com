import { getComic } from './comic.parser';

describe('#getManga', () => {
  test('Compatibility', async () => {
    const manga = await getComic('7704-konan');

    expect(manga).toBeDefined();
    expect(manga).toHaveProperty('id', '7704-konan');
    expect(manga).toHaveProperty('title', 'konan');
    expect(manga).toHaveProperty('pageCount', 36);
  }, 20000000);
});
