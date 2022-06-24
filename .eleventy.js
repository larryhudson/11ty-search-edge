const { EleventyEdgePlugin } = require("@11ty/eleventy");
const fsPromises = require("fs/promises");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyEdgePlugin);

  eleventyConfig.on("eleventy.after", async () => {
    console.log("copying search data file to generated folder");
    await fsPromises.copyFile(
      "_site/search-data.json",
      "netlify/edge-functions/_generated/search-data.json"
    );
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
