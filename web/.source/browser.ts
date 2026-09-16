// @ts-nocheck
/// <reference types="vite/client" />
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  api: create.doc("api", import.meta.glob(["./**/*.{mdx,md}"], {
    "base": "./../content/api",
    "query": "?collection=api",
    "eager": false
  })),
  blog: create.doc("blog", import.meta.glob(["./**/*.{mdx,md}"], {
    "base": "./../content/blog",
    "query": "?collection=blog",
    "eager": false
  })),
  docs: create.doc("docs", import.meta.glob(["./**/*.{mdx,md}"], {
    "base": "./../content/docs",
    "query": "?collection=docs",
    "eager": false
  })),
};
export default browserCollections;