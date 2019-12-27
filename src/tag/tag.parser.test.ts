import { getTags } from './tag.parser';

describe('#getTags', () => {
  test('Compatibility', async () => {
    const tags = await getTags();

    expect(tags).toBeDefined();
    expect(tags.length).toBeGreaterThan(432);
  }, 2000000);
});
