import Fuse from 'fuse.js'

const fuseOptions = {
  keys: ['label'],
  threshold: 0.3,
}

const getFilteredOptions = <Option>(options: Option[], searchInput: string) => {
  const fuse = new Fuse(options, fuseOptions);

  const filteredSearchResults = fuse.search(searchInput);

  return filteredSearchResults.length > 0 ? filteredSearchResults.map((result) => result.item) : options;
}

export default getFilteredOptions;