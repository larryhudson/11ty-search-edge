// note: using direct CDN URL here because the eleventy:edge import alias wasn't working for me
import { EleventyEdge } from "https://cdn.11ty.dev/edge@1.0.1/eleventy-edge.js";
import precompiledAppData from "./_generated/eleventy-edge-app-data.js";
import searchData from "./_generated/search-data.json" assert { type: "json" };
import filterArrayByQuery from "./utils/filter-json.js";

export default async (request, context) => {
  try {
    let edge = new EleventyEdge("edge", {
      request,
      context,
      precompiled: precompiledAppData,

      // default is [], add more keys to opt-in e.g. ["appearance", "username"]
      cookies: [],
    });

    edge.config((eleventyConfig) => {
      eleventyConfig.addGlobalData("searchResults", async () => {
        const searchQuery = new URL(request.url).searchParams.get("query");
        const searchResults = filterArrayByQuery(searchData, searchQuery);

        return searchResults;
      });
    });

    return await edge.handleResponse();
  } catch (e) {
    console.log("ERROR", { e });
    return context.next(e);
  }
};
