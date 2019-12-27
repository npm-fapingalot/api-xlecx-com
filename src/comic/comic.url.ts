export const comic = (id: string) => `https://xlecx.com/${id}.html`;


//
// Extract comic ID
//
import { regexExtract } from '../utils.parse';

export const URL_TO_ID_REGEX = /^(((https?)?\:\/\/)?xlecx\.com)?\/(\d+(-\w+)+)\.html?$/i;
export const hrefToID = (url: string | null | undefined): string | null => regexExtract(url, URL_TO_ID_REGEX, 4);
