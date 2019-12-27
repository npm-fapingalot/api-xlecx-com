import cheerio from 'cheerio';
import fetch from 'node-fetch';

import * as SELECTOR from './comic.selectors';
import * as URL from './comic.url';
import { IComic, IPage, ITagged } from './comic.schema';
import { sanitizeText, toInt, regexExtract, getParentText, emptyStringToNull, isEmpty, isEmptyString } from '../utils.parse';
import { ITag } from '../tag';

// SELECTOR
export const getTitle = ($: CheerioStatic): string | null =>
  sanitizeText($(SELECTOR.TITLE).text());

export const PAGE_COUNT_REGEX = /(\d+)\s+pages/i;
export const getPageCount = ($: CheerioStatic): number | null =>
  toInt(regexExtract(sanitizeText($(SELECTOR.PAGE_COUNT).text()), PAGE_COUNT_REGEX));

const injectIntoPageURL = (url: string) => {
  const spl = url.split('/');
  return spl.slice(0, 6).join('/') + '/thumbs/' + spl.slice(6).join('/');
}

const injectPrefix = (url: string | null | undefined): string | null => {
  if (isEmptyString(url)) { return null; }
  return 'https://xlecx.com' + url;
}

export const getPages = ($: CheerioStatic): IPage[] =>
  $(SELECTOR.THUMBNAIL_IMAGES)
    .map((i, el) => $(el).attr('href') || injectPrefix($(el).attr('data-src')))
    .get()
    .filter((val) => emptyStringToNull(val) !== null)
    .map((imgURL) => ({
      thumbnailURL: injectIntoPageURL(imgURL),
      imgURL: [imgURL,],
    }));

export const getTags = ($: CheerioStatic): ITagged => {
  const info: { [key: string]: ITag[] } = {};
  $(SELECTOR.TAGS_CONTAINER)
    .each((i, elRaw) => {
      const el = $(elRaw);

      const name = getParentText(el).trim().toLocaleLowerCase();
      const values = el.find(SELECTOR.CONTAINER_TAG)
        .map((i2, tag) => ({
          name: getParentText($(tag)).trim(),
          href: $(tag).attr('href'),
        } as ITag)).get();

      info[name.substring(0, name.length - 1)] = values;
    });

  return {
    parodies: info.parody || [],
    characters: info.character || [],
    tags: info.tags || [],
    artists: info.artist || [],
    groups: info.group || [],
    languages: info.language || [],
    categories: info.categorie || [],
  };
};

// Main parser
export const getComic = async (id: string): Promise<IComic> =>
  getComicFromHTML(await (await fetch(URL.comic(id))).text(), id);

export const getComicFromHTML = (htmlSource: string, id: string): IComic =>
  getComicFromCheerio(cheerio.load(htmlSource), id);

export const getComicFromCheerio = ($: CheerioStatic, id: string): IComic => {
  const title = getTitle($);
  if (!title) { throw new Error('Title is empty'); }


  const pageCount = getPageCount($);
  if (!pageCount) { throw new Error('PageCount is empty'); }

  const pages = getPages($);
  if (pages.length !== pageCount) { throw new Error('Page count doesn\'t match pages ' + pages.length + '/' + pageCount); }

  return {
    id,

    title,

    ...getTags($),

    pageCount,
    pages,
  };
};
