import { getTags, getTitle, getPageCount } from './comic.parser';

describe('#getTitle', () => {
  test('Working', () => {
    const $ = ((selector: string) => ({ text: () => 'Title' })) as CheerioStatic;
    expect(getTitle($)).toBe('Title');
  });
});


describe('#getPageCount', () => {
  test('Working', () => {
    const $ = ((selector: string) => ({ text: () => '123 pages' })) as CheerioStatic;
    expect(getPageCount($)).toBe(123);
  });
});

describe('#getPages', () => {
  test('Working', () => { });
});

describe('#getTags', () => {
  test('Working', () => { });
});
