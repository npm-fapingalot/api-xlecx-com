/**
 * The object used to describe a tag
 */
export interface ITag {
  /**
   * The name
   */
  name: string;
  /**
   * The href of the link
   */
  href: string;
}

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
 * A object used to describe a manga data
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
 * A object used to describe a manga
 */
export interface IComic extends ITagged, IData, IExtra {
  /**
   * The id of the manga
   */
  id: string;

  /**
   * The title of the manga
   */
  title: string;
}
