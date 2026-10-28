// @ts-nocheck
/// <reference types="vite/client" />
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();

export const moon = await create.docs("moon", "content/moon", import.meta.glob(["./**/*.{json,yaml}"], {
  "base": "./../content/moon",
  "query": "?collection=moon",
  "import": "default",
  "eager": true
}), import.meta.glob(["./**/*.{mdx,md}"], {
  "base": "./../content/moon",
  "query": "?collection=moon",
  "eager": true
}));

export const proto = await create.docs("proto", "content/proto", import.meta.glob(["./**/*.{json,yaml}"], {
  "base": "./../content/proto",
  "query": "?collection=proto",
  "import": "default",
  "eager": true
}), import.meta.glob(["./**/*.{mdx,md}"], {
  "base": "./../content/proto",
  "query": "?collection=proto",
  "eager": true
}));

export const schematic = await create.docs("schematic", "content/schematic", import.meta.glob(["./**/*.{json,yaml}"], {
  "base": "./../content/schematic",
  "query": "?collection=schematic",
  "import": "default",
  "eager": true
}), import.meta.glob(["./**/*.{mdx,md}"], {
  "base": "./../content/schematic",
  "query": "?collection=schematic",
  "eager": true
}));

export const blog = await create.doc("blog", "content/blog", import.meta.glob(["./**/*.{mdx,md}"], {
  "base": "./../content/blog",
  "query": "?collection=blog",
  "eager": true
}));