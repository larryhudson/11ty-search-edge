class SearchDataJson {
  data() {
    return {
      permalink: "/search-data.json",
    };
  }

  render(data) {
    const searchData = data.collections.books.map((book) => ({
      title: book.data.title,
      url: book.url,
      content: book.templateContent,
    }));

    return JSON.stringify(searchData);
  }
}

module.exports = SearchDataJson;
