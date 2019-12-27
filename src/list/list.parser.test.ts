import { getHomeComics, searchByText } from './list.parser';

describe('#getHomeManga', () => {
  test('Compatibility', async () => {
    const manga = await getHomeComics();

    expect(manga).toBeDefined();
    expect(manga).toHaveLength(15);
  }, 2000000);
});

describe('#getHomeManga', () => {
  test('Compatibility', async () => {
    const manga = await searchByText('ben+10');

    expect(manga).toBeDefined();
    expect(manga).toHaveLength(15);
  }, 2000000);
});
