// note: using direct CDN URL here because the eleventy:edge import alias wasn't working for me
import { EleventyEdge } from "https://cdn.11ty.dev/edge@1.0.1/eleventy-edge.js";
import precompiledAppData from "./_generated/eleventy-edge-app-data.js";
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
      eleventyConfig.addFilter("filterArrayByQuery", filterArrayByQuery);
    });

    return await edge.handleResponse();
  } catch (e) {
    console.log("ERROR", { e });
    return context.next(e);
  }
};
