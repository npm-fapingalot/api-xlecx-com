import cheerio from 'cheerio';
import fetch from 'node-fetch';

import * as SELECTOR from './list.selectors';
import * as URL from './list.url';
import { IPrevComic } from './list.schema';
import { sanitizeText } from '../utils.parse';
import { hrefToID } from '../comic/comic.url';


// Parsers
export const ID_REGEX = /\/(\d+(-\w+)+)\.html/i;
export const getID = ($: Cheerio): string | null =>
  hrefToID(sanitizeText($.find(SELECTOR.MANGA_LINK).attr('href')));

export const getTitle = ($: Cheerio): string | null => sanitizeText($.find(SELECTOR.MANGA_TITLE).text());
export const getThumbnail = ($: Cheerio): string | null => sanitizeText($.find(SELECTOR.MANGA_IMG).attr('src'));

// Main parsers
export const getComicsFromCheerio = ($: CheerioStatic): IPrevComic[] => {
  return $(SELECTOR.MANGA).map((ignore, elRaw) => {
    const el = $(elRaw);

    const id = getID(el);
    if (!id) { throw new Error('Invalid id: ' + id); }

    const thumbnail = getThumbnail(el);
    if (!thumbnail) { throw new Error('Thumbnail is empty'); }

    const title = getTitle(el);
    if (!title) { throw new Error('Title is empty'); }

    return {
      id,
      thumbnail,
      title,
    } as IPrevComic;
  }).get();
};

export const getHomeComicsHTML = (htmlSource: string): IPrevComic[] =>
  getComicsFromCheerio(cheerio.load(htmlSource));

// Different url generators
export const getHomeComics = async (page = 0): Promise<IPrevComic[]> =>
  getHomeComicsHTML(await (await fetch(URL.home(page))).text());


export const searchByText = async (query: string, page = 0): Promise<IPrevComic[]> =>
  getHomeComicsHTML(await (await fetch(URL.search, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `do=search&subaction=search&search_start=${page + 1}&full_search=0&result_from=${page * 15 + 1}&story=${query}`
  })).text());


export const searchByTag = async (tag: string, page = 0): Promise<IPrevComic[]> =>
  getHomeComicsHTML(await (await fetch(URL.tag(tag, page))).text());
export const searchByArtist = async (artist: string, page = 0): Promise<IPrevComic[]> =>
  getHomeComicsHTML(await (await fetch(URL.artist(artist, page))).text());
export const searchByParody = async (parody: string, page = 0): Promise<IPrevComic[]> =>
  getHomeComicsHTML(await (await fetch(URL.parody(parody, page))).text());
export const searchByGroup = async (group: string, page = 0): Promise<IPrevComic[]> =>
  getHomeComicsHTML(await (await fetch(URL.group(group, page))).text());
