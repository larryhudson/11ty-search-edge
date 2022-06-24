export default function filterArrayByQuery(array, query) {
  const lowercaseQuery = query.toLowerCase();

  return array.filter((arrayItem) => {
    const lowercaseTitle = arrayItem.title.toLowerCase();
    const titleIncludes = lowercaseTitle.indexOf(lowercaseQuery) !== -1;

    const lowercaseContent = arrayItem.content.toLowerCase();
    const contentIncludes = lowercaseContent.indexOf(lowercaseQuery) !== -1;

    return titleIncludes || contentIncludes;
  });
}
