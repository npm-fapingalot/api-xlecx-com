import cheerio from 'cheerio';
import fetch from 'node-fetch';

import * as SELECTOR from './tag.selectors';
import * as URL from './tag.url';
import { ITag } from './tag.schema';
import { sanitizeText, getParentText } from '../utils.parse';

export const getTagsHTML = (html: string): ITag[] => getTagsCheerio(cheerio.load(html));
export const getTagsCheerio = ($: CheerioStatic): ITag[] => {
  return $(SELECTOR.TAG).map((i, elRaw) => {
    const el = $(elRaw);

    return {
      name: sanitizeText(getParentText(el)),
      href: sanitizeText(el.attr('href')),
    };
  }).get().filter(({ href }) => /\/tags\//i.test(href));
};

export const getTags = async (page = 0): Promise<ITag[]> =>
  getTagsHTML(await (await fetch(URL.tags)).text());
