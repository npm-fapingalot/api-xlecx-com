import { getID, getTitle, getThumbnail } from './list.parser';

describe('#getID', () => {
  test('Working', () => {
    const $ = {
      find: ((selector: string) => ({
        attr: (attr: string) => 'https://xlecx.com/7741-youve-been-a-naughty-boy.html'
      }))
    } as Cheerio;

    expect(getID($)).toBe('7741-youve-been-a-naughty-boy');
  });
});

describe('#getTitle', () => {
  test('Working', () => {
    const $ = { find: ((selector: string) => ({ text: () => 'You\'ve Been a Naughty Boy' })) } as Cheerio;
    expect(getTitle($)).toBe('You\'ve Been a Naughty Boy');
  });
});


describe('#getThumbnail', () => {
  test('Working', () => {
    const $ = {
      find: ((selector: string) => ({
        attr: (attr: string) => 'https://xlecx.com/7741-youve-been-a-naughty-boy.html'
      }))
    } as Cheerio;

    expect(getThumbnail($)).toBe('https://xlecx.com/7741-youve-been-a-naughty-boy.html');
  });
});

