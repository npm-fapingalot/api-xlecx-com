import { ITag } from '../tag';

/**
 * A object used to describe a page
 */
export interface IPage {
  /**
   * The thumbnail URL
   */
  thumbnailURL: string;

  /**
   * A list of possible image URLs
   */
  imgURL: string[];
}

/**
 * A object used to describe a tagged data
 */
export interface ITagged {
  parodies: ITag[];
  characters: ITag[];
  tags: ITag[];
  artists: ITag[];
  groups: ITag[];
  languages: ITag[];
  categories: ITag[];
}

/**
 * A object used to describe a comic data
 */
export interface IData {
  /**
   * The number of pages
   */
  pageCount: number;
  /**
   * The pages
   */
  pages: IPage[];
}

/**
 * A object used to describe a comic
 */
export interface IComic extends ITagged, IData {
  /**
   * The id of the comic
   */
  id: string;

  /**
   * The title of the comic
   */
  title: string;
}
