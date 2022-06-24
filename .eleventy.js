const { EleventyEdgePlugin } = require("@11ty/eleventy");
const fsPromises = require("fs/promises");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyEdgePlugin);

  eleventyConfig.addFilter("arrayToSearchData", (collection) => {
    return collection.map((book) => ({
      title: book.data.title,
      content: book.templateContent,
      url: book.url,
    }));
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
