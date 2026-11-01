// @ts-nocheck
/// <reference types="vite/client" />
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();

export const blog = await create.docLazy("blog", "content/blog", import.meta.glob(["./**/*.{mdx,md}"], {
  "base": "./../content/blog",
  "query": "?collection=blog&only=frontmatter",
  "import": "frontmatter",
  "eager": true
}), import.meta.glob(["./**/*.{mdx,md}"], {
  "base": "./../content/blog",
  "query": "?collection=blog",
  "eager": false
}));

export const moon = await create.docsLazy("moon", "content/moon", import.meta.glob(["./**/*.{json,yaml}"], {
  "base": "./../content/moon",
  "query": "?collection=moon",
  "import": "default",
  "eager": true
}), import.meta.glob(["./**/*.{mdx,md}"], {
  "base": "./../content/moon",
  "query": "?collection=moon&only=frontmatter",
  "import": "frontmatter",
  "eager": true
}), import.meta.glob(["./**/*.{mdx,md}"], {
  "base": "./../content/moon",
  "query": "?collection=moon",
  "eager": false
}));

export const proto = await create.docsLazy("proto", "content/proto", import.meta.glob(["./**/*.{json,yaml}"], {
  "base": "./../content/proto",
  "query": "?collection=proto",
  "import": "default",
  "eager": true
}), import.meta.glob(["./**/*.{mdx,md}"], {
  "base": "./../content/proto",
  "query": "?collection=proto&only=frontmatter",
  "import": "frontmatter",
  "eager": true
}), import.meta.glob(["./**/*.{mdx,md}"], {
  "base": "./../content/proto",
  "query": "?collection=proto",
  "eager": false
}));

export const schematic = await create.docsLazy("schematic", "content/schematic", import.meta.glob(["./**/*.{json,yaml}"], {
  "base": "./../content/schematic",
  "query": "?collection=schematic",
  "import": "default",
  "eager": true
}), import.meta.glob(["./**/*.{mdx,md}"], {
  "base": "./../content/schematic",
  "query": "?collection=schematic&only=frontmatter",
  "import": "frontmatter",
  "eager": true
}), import.meta.glob(["./**/*.{mdx,md}"], {
  "base": "./../content/schematic",
  "query": "?collection=schematic",
  "eager": false
}));

export const wasm = await create.docsLazy("wasm", "content/wasm", import.meta.glob(["./**/*.{json,yaml}"], {
  "base": "./../content/wasm",
  "query": "?collection=wasm",
  "import": "default",
  "eager": true
}), import.meta.glob(["./**/*.{mdx,md}"], {
  "base": "./../content/wasm",
  "query": "?collection=wasm&only=frontmatter",
  "import": "frontmatter",
  "eager": true
}), import.meta.glob(["./**/*.{mdx,md}"], {
  "base": "./../content/wasm",
  "query": "?collection=wasm",
  "eager": false
}));