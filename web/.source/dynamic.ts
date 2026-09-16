// @ts-nocheck
/// <reference types="vite/client" />
import { dynamic } from 'fumadocs-mdx/runtime/dynamic';
import * as Config from '../source.config';

const create = await dynamic<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>(Config, {"configPath":"/Users/miles/Projects/moonrepo/website/web/source.config.ts","environment":"vite","outDir":"/Users/miles/Projects/moonrepo/website/web/.source"}, {"doc":{"passthroughs":["extractedReferences"]}});