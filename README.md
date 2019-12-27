# xlecx.com API
A API wrapper that reads the HTML of the site and extracts info

This library supports fetching:
- Comics,
- List of Comics, 
- Tags

# Install
``` npm install --save api-xlecx-com ```
# API

## Manga
### getComic(comic_id)

## Lists
``` WARNING: The string arguments are not escaped (Eg. query, tag, ...) ```  
  
### getHomeManga([page])
### searchByText(query [, page])
### searchByTag(tag [, page])
### searchByArtist(artist [, page])
### searchByParody(parody [, page])
### searchByGroup(group [, page])

## Tags
### getTags()

