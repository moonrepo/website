import { describe, expect, it } from 'vitest';
import { toPkl } from '../../src/utils/pkl';

// Alias for the indentation unit used by toPkl (2 spaces)
const I = '  ';
const I2 = I + I;
const I3 = I + I + I;

describe('toPkl', () => {
	describe('primitives', () => {
		it('formats string values with double quotes', () => {
			expect(toPkl({ name: 'hello' })).toBe('name = "hello"');
		});

		it('formats number values', () => {
			expect(toPkl({ count: 42 })).toBe('count = 42');
		});

		it('formats boolean values', () => {
			expect(toPkl({ enabled: true })).toBe('enabled = true');
			expect(toPkl({ enabled: false })).toBe('enabled = false');
		});

		it('formats null values', () => {
			expect(toPkl({ value: null })).toBe('value = null');
		});
	});

	describe('listings (arrays)', () => {
		it('formats empty arrays with List()', () => {
			expect(toPkl({ items: [] })).toBe('items = List()');
		});

		it('formats arrays of strings with new Listing', () => {
			const result = toPkl({ tags: ['a', 'b', 'c'] });

			expect(result).toBe(
				[
					'tags = new Listing {',
					`${I}"a"`,
					`${I}"b"`,
					`${I}"c"`,
					'}',
				].join('\n'),
			);
		});

		it('formats arrays of numbers with new Listing', () => {
			const result = toPkl({ ports: [80, 443] });

			expect(result).toBe(
				['ports = new Listing {', `${I}80`, `${I}443`, '}'].join('\n'),
			);
		});

		it('formats arrays of booleans with new Listing', () => {
			const result = toPkl({ flags: [true, false] });

			expect(result).toBe(
				['flags = new Listing {', `${I}true`, `${I}false`, '}'].join(
					'\n',
				),
			);
		});

		it('formats arrays of objects with new keyword', () => {
			const result = toPkl({
				items: [
					{ name: 'foo', version: 1 },
					{ name: 'bar', version: 2 },
				],
			});

			expect(result).toBe(
				[
					'items = new Listing {',
					`${I}new {`,
					`${I2}name = "foo"`,
					`${I2}version = 1`,
					`${I}}`,
					`${I}new {`,
					`${I2}name = "bar"`,
					`${I2}version = 2`,
					`${I}}`,
					'}',
				].join('\n'),
			);
		});

		it('formats mixed primitive arrays with new Listing', () => {
			const result = toPkl({ mixed: ['a', 1, true, null] });

			expect(result).toBe(
				[
					'mixed = new Listing {',
					`${I}"a"`,
					`${I}1`,
					`${I}true`,
					`${I}null`,
					'}',
				].join('\n'),
			);
		});
	});

	describe('objects', () => {
		it('formats empty objects as empty blocks', () => {
			expect(toPkl({ block: {} })).toBe('block {}');
		});

		it('formats nested objects as blocks without =', () => {
			const result = toPkl({
				server: {
					host: 'localhost',
					port: 8080,
				},
			});

			expect(result).toBe(
				[
					'server {',
					`${I}host = "localhost"`,
					`${I}port = 8080`,
					'}',
				].join('\n'),
			);
		});

		it('formats deeply nested objects', () => {
			const result = toPkl({
				a: {
					b: {
						c: 'deep',
					},
				},
			});

			expect(result).toBe(
				['a {', `${I}b {`, `${I2}c = "deep"`, `${I}}`, '}'].join('\n'),
			);
		});
	});

	describe('keys', () => {
		it('leaves valid identifiers bare', () => {
			expect(toPkl({ valid_key: 1 })).toBe('valid_key = 1');
			expect(toPkl({ key123: 1 })).toBe('key123 = 1');
			expect(toPkl({ _private: 1 })).toBe('_private = 1');
		});

		it('uses bracket syntax for keys with special characters', () => {
			expect(toPkl({ 'my.key': 'value' })).toBe('["my.key"] = "value"');
			expect(toPkl({ 'with spaces': true })).toBe(
				'["with spaces"] = true',
			);
			expect(toPkl({ '123start': 1 })).toBe('["123start"] = 1');
		});

		it('uses bracket syntax for keys with hyphens', () => {
			expect(toPkl({ 'with-dash': 1 })).toBe('["with-dash"] = 1');
		});
	});

	describe('top-level formatting', () => {
		it('returns empty string for empty object', () => {
			expect(toPkl({})).toBe('');
		});

		it('separates top-level entries with blank lines', () => {
			const result = toPkl({
				a: 1,
				b: 2,
				c: 3,
			});

			expect(result).toBe('a = 1\n\nb = 2\n\nc = 3');
		});
	});

	describe('mappings', () => {
		it('uses bracket syntax for a top-level mapping', () => {
			const result = toPkl(
				{
					tasks: {
						build: {
							command: 'build-project',
						},
						test: {
							command: 'run-tests',
						},
					},
				},
				{ mappings: ['tasks'] },
			);

			expect(result).toBe(
				[
					'tasks {',
					`${I}["build"] {`,
					`${I2}command = "build-project"`,
					`${I}}`,
					`${I}["test"] {`,
					`${I2}command = "run-tests"`,
					`${I}}`,
					'}',
				].join('\n'),
			);
		});

		it('uses bracket syntax for a nested mapping via dot path', () => {
			const result = toPkl(
				{
					workspace: {
						tasks: {
							build: {
								command: 'build-project',
								inputs: ['src/**'],
							},
						},
					},
				},
				{ mappings: ['workspace.tasks'] },
			);

			expect(result).toBe(
				[
					'workspace {',
					`${I}tasks {`,
					`${I2}["build"] {`,
					`${I3}command = "build-project"`,
					`${I3}inputs = new Listing {`,
					`${I3}${I}"src/**"`,
					`${I3}}`,
					`${I2}}`,
					`${I}}`,
					'}',
				].join('\n'),
			);
		});

		it('handles multiple entries in a mapping', () => {
			const result = toPkl(
				{
					tasks: {
						build: { command: 'build' },
						test: { command: 'test' },
						lint: { command: 'lint' },
					},
				},
				{ mappings: ['tasks'] },
			);

			expect(result).toBe(
				[
					'tasks {',
					`${I}["build"] {`,
					`${I2}command = "build"`,
					`${I}}`,
					`${I}["test"] {`,
					`${I2}command = "test"`,
					`${I}}`,
					`${I}["lint"] {`,
					`${I2}command = "lint"`,
					`${I}}`,
					'}',
				].join('\n'),
			);
		});

		it('handles mappings with deeply nested content', () => {
			const result = toPkl(
				{
					tasks: {
						build: {
							options: {
								retries: 3,
							},
						},
					},
				},
				{ mappings: ['tasks'] },
			);

			expect(result).toBe(
				[
					'tasks {',
					`${I}["build"] {`,
					`${I2}options {`,
					`${I3}retries = 3`,
					`${I2}}`,
					`${I}}`,
					'}',
				].join('\n'),
			);
		});

		it('does not affect keys not in mappings', () => {
			const result = toPkl(
				{
					tasks: {
						build: { command: 'build' },
					},
					runner: {
						logStyle: 'stream',
					},
				},
				{ mappings: ['tasks'] },
			);

			expect(result).toBe(
				[
					'tasks {',
					`${I}["build"] {`,
					`${I2}command = "build"`,
					`${I}}`,
					'}',
					'',
					'runner {',
					`${I}logStyle = "stream"`,
					'}',
				].join('\n'),
			);
		});

		it('formats empty mapping as empty block', () => {
			expect(toPkl({ tasks: {} }, { mappings: ['tasks'] })).toBe(
				'tasks {}',
			);
		});

		it('ignores mappings option for non-object values', () => {
			const result = toPkl(
				{ tasks: ['build', 'test'] },
				{ mappings: ['tasks'] },
			);

			expect(result).toBe(
				['tasks = new Listing {', `${I}"build"`, `${I}"test"`, '}'].join(
					'\n',
				),
			);
		});

		it('supports multiple mapping paths', () => {
			const result = toPkl(
				{
					tasks: {
						build: { command: 'build' },
					},
					targets: {
						web: { platform: 'browser' },
					},
				},
				{ mappings: ['tasks', 'targets'] },
			);

			expect(result).toBe(
				[
					'tasks {',
					`${I}["build"] {`,
					`${I2}command = "build"`,
					`${I}}`,
					'}',
					'',
					'targets {',
					`${I}["web"] {`,
					`${I2}platform = "browser"`,
					`${I}}`,
					'}',
				].join('\n'),
			);
		});

		it('handles mapping entries with primitive values', () => {
			const result = toPkl(
				{
					env: {
						NODE_ENV: 'production',
						DEBUG: true,
					},
				},
				{ mappings: ['env'] },
			);

			expect(result).toBe(
				[
					'env {',
					`${I}["NODE_ENV"] = "production"`,
					`${I}["DEBUG"] = true`,
					'}',
				].join('\n'),
			);
		});
	});

	describe('realistic configs', () => {
		it('formats a moon workspace config', () => {
			const result = toPkl({
				workspace: {
					projects: {
						globs: ['apps/*', 'packages/*'],
					},
					vcs: {
						manager: 'git',
						defaultBranch: 'main',
					},
				},
			});

			expect(result).toBe(
				[
					'workspace {',
					`${I}projects {`,
					`${I2}globs = new Listing {`,
					`${I3}"apps/*"`,
					`${I3}"packages/*"`,
					`${I2}}`,
					`${I}}`,
					`${I}vcs {`,
					`${I2}manager = "git"`,
					`${I2}defaultBranch = "main"`,
					`${I}}`,
					'}',
				].join('\n'),
			);
		});

		it('formats mixed top-level entries', () => {
			const result = toPkl({
				runner: {
					cacheLifetime: '24 hours',
					autoInstall: true,
				},
				tasks: ['build', 'test'],
				retries: 3,
			});

			expect(result).toBe(
				[
					'runner {',
					`${I}cacheLifetime = "24 hours"`,
					`${I}autoInstall = true`,
					'}',
					'',
					'tasks = new Listing {',
					`${I}"build"`,
					`${I}"test"`,
					'}',
					'',
					'retries = 3',
				].join('\n'),
			);
		});

		it('formats a config with mapping task blocks', () => {
			const result = toPkl(
				{
					workspace: {
						projects: {
							globs: ['apps/*'],
						},
					},
					tasks: {
						build: {
							command: 'build-project',
							inputs: ['src/**'],
						},
						test: {
							command: 'run-tests',
							options: {
								retries: 2,
							},
						},
					},
				},
				{ mappings: ['tasks'] },
			);

			expect(result).toBe(
				[
					'workspace {',
					`${I}projects {`,
					`${I2}globs = new Listing {`,
					`${I3}"apps/*"`,
					`${I2}}`,
					`${I}}`,
					'}',
					'',
					'tasks {',
					`${I}["build"] {`,
					`${I2}command = "build-project"`,
					`${I2}inputs = new Listing {`,
					`${I3}"src/**"`,
					`${I2}}`,
					`${I}}`,
					`${I}["test"] {`,
					`${I2}command = "run-tests"`,
					`${I2}options {`,
					`${I3}retries = 2`,
					`${I2}}`,
					`${I}}`,
					'}',
				].join('\n'),
			);
		});
	});
});
