export const search = 'https://xlecx.com/page/';

export const home = (page = 0) => `https://xlecx.com/page/${page + 1}/`;
export const tag = (tag: string, page = 0) => `https://xlecx.com/tags/${tag}/page/${page + 1}/`
export const parody = (parody: string, page = 0) => `https://xlecx.com/xfsearch/parody/${parody}/page/${page + 1}/`
export const artist = (artist: string, page = 0) => `https://xlecx.com/xfsearch/artist/${artist}/page/${page + 1}/`
export const group = (group: string, page = 0) => `https://xlecx.com/xfsearch/group/${group}/page/${page + 1}/`
