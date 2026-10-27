// @ts-nocheck
/// <reference types="vite/client" />
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  blog: create.doc("blog", import.meta.glob(["./**/*.{mdx,md}"], {
    "base": "./../content/blog",
    "query": "?collection=blog",
    "eager": false
  })),
  moon: create.doc("moon", import.meta.glob(["./**/*.{mdx,md}"], {
    "base": "./../content/moon",
    "query": "?collection=moon",
    "eager": false
  })),
  proto: create.doc("proto", import.meta.glob(["./**/*.{mdx,md}"], {
    "base": "./../content/proto",
    "query": "?collection=proto",
    "eager": false
  })),
  schematic: create.doc("schematic", import.meta.glob(["./**/*.{mdx,md}"], {
    "base": "./../content/schematic",
    "query": "?collection=schematic",
    "eager": false
  })),
};
export default browserCollections;