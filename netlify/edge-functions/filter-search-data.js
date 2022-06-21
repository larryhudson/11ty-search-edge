export default async (request, context) => {
  const searchQuery = new URL(request.url).searchParams.get("query");

  if (!searchQuery || searchQuery === "") return context.json([]);

  const allBooksResponse = await context.next();
  const allBooks = await allBooksResponse.json();

  const lowercaseQuery = searchQuery.toLowerCase();

  const searchResults = allBooks.filter((book) => {
    const lowercaseTitle = book.title.toLowerCase();
    const titleIncludes = lowercaseTitle.indexOf(lowercaseQuery) !== -1;

    const lowercaseContent = book.content.toLowerCase();
    const contentIncludes = lowercaseContent.indexOf(lowercaseQuery) !== -1;

    return titleIncludes || contentIncludes;
  });

  return context.json(searchResults);
};
